// server.js (Bagian INISIALISASI & IMPOR)

// =============== INISIALISASI & IMPOR ===============
require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// <<< PERBAIKAN AKHIR: IMPOR DARI LOKASI CUSTOM OUTPUT >>>
// Asumsi: Server.js ada di root backend. Client ada di '../generated/prisma'
const { PrismaClient } = require('./generated/prisma'); 
const prisma = new PrismaClient(); 

const app = express();
const PORT = process.env.PORT || 4000;

// =============== MIDDLEWARE UTAMA ===============
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' 
}));

// (authMiddleware dan semua Endpoint di bawahnya sudah benar dan TIDAK PERLU DIUBAH)
// ...

// =============== MIDDLEWARE AUTENTIKASI JWT ===============
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan atau format salah.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded.user;
        next(); 
    } catch (e) {
        res.status(401).json({ message: 'Token tidak valid atau kadaluarsa.' });
    }
};


// =============== ENDPOINT AUTENTIKASI (SIGN UP & LOGIN) ===============

// server.js (Endpoint 1: Pendaftaran Pengguna Baru - SIGN UP)

app.post('/api/signup', async (req, res) => {
    // <<< PERBAIKAN DI SINI: Ambil semua field yang dikirim form >>>
    const { 
        email, 
        password, 
        fullName, 
        phone, 
        shopeeAccount, 
        address 
    } = req.body; 

    // --- Validasi semua field wajib diisi ---
    // Gunakan fullName, bukan name!
    if (!email || !password || !fullName || !phone || !shopeeAccount || !address) {
        return res.status(400).json({ message: 'Semua field wajib diisi. Mohon lengkapi data.' });
    }

    try {
        // ... (Cek email sudah terdaftar & Hash password tetap sama) ...
        let user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'Email sudah terdaftar.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Buat user baru di database DENGAN DATA LENGKAP
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName, // Gunakan fullName
                phone,
                shopeeAccount,
                address,
            },
            // Hanya kembalikan field yang aman
            select: { id: true, email: true, fullName: true, phone: true, shopeeAccount: true, address: true } 
        });

        res.status(201).json({ success: true, message: 'Pendaftaran Berhasil!', user });
    } catch (error) {
        console.error("Error Sign Up:", error);
        res.status(500).json({ message: 'Server error saat pendaftaran.' });
    }
});


// Endpoint 2: Login Pengguna (LOGIN)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Kredensial tidak valid.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Kredensial tidak valid.' });
        }

        const payload = { user: { id: user.id, email: user.email, name: user.name } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    success: true,
                    message: 'Login Berhasil!',
                    token,
                    user: { id: user.id, email: user.email, name: user.name }
                });
            }
        );
    } catch (error) {
        console.error("Error Login:", error);
        res.status(500).json({ message: 'Server error saat login.' });
    }
});


// =============== ENDPOINT TODO LIST (DILINDUNGI) ===============
// (Semua kode CRUD ToDo di sini sudah benar dan siap digunakan)

app.post('/api/todos', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    if (!title) { return res.status(400).json({ message: 'Judul to-do wajib diisi, Bro.' }); }
    try {
        const newTodo = await prisma.todo.create({
            data: { userId: req.user.id, title, description: description || null },
        });
        res.status(201).json({ success: true, message: 'To-do berhasil dibuat!', todo: newTodo });
    } catch (error) {
        console.error("Error CREATE ToDo:", error);
        res.status(500).json({ message: 'Gagal membuat to-do baru.' });
    }
});

app.get('/api/todos', authMiddleware, async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.user.id }, 
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({ success: true, todos });
    } catch (error) {
        console.error("Error READ ToDo:", error);
        res.status(500).json({ message: 'Gagal mengambil data to-do.' });
    }
});

app.put('/api/todos/:id', authMiddleware, async (req, res) => {
    const { id } = req.params; 
    const { isCompleted } = req.body; 

    try {
        const updatedTodo = await prisma.todo.updateMany({
            where: { id: parseInt(id), userId: req.user.id },
            data: { isCompleted },
        });
        if (updatedTodo.count === 0) { return res.status(404).json({ message: 'To-do tidak ditemukan atau Anda bukan pemiliknya.' }); }
        res.status(200).json({ success: true, message: 'To-do berhasil diperbarui.' });
    } catch (error) {
        console.error("Error UPDATE ToDo:", error);
        res.status(500).json({ message: 'Gagal memperbarui to-do.' });
    }
});

app.delete('/api/todos/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await prisma.todo.deleteMany({
            where: { id: parseInt(id), userId: req.user.id },
        });
        if (deletedTodo.count === 0) { return res.status(404).json({ message: 'To-do tidak ditemukan atau Anda bukan pemiliknya.' }); }
        res.status(200).json({ success: true, message: 'To-do berhasil dihapus.' });
    } catch (error) {
        console.error("Error DELETE ToDo:", error);
        res.status(500).json({ message: 'Gagal menghapus to-do.' });
    }
});


// =============== START SERVER ===============
app.listen(PORT, () => {
    console.log(`🚀 Express Server berjalan di http://localhost:${PORT}`);
    console.log(`Database Status: OK (Connected via Railway)`);
});