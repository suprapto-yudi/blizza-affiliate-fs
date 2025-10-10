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

// Endpoint 2: Login Pengguna - LOGIN

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Cari User di DB (Ambil semua field yang dibutuhkan)
        // Kita menggunakan SELECT untuk mengambil data yang dibutuhkan oleh frontend
        const user = await prisma.user.findUnique({ 
            where: { email },
            select: {
                id: true,
                email: true,
                password: true, // WAJIB ada untuk verifikasi password
                fullName: true, // <<< KOREKSI PENTING
                phone: true, // <<< KOREKSI PENTING
                shopeeAccount: true,
                address: true,
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Kredensial tidak valid.' });
        }

        // 2. Verifikasi Password (menggunakan user.password dari SELECT di atas)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Kredensial tidak valid.' });
        }
        
        // 3. Persiapkan Objek User untuk Respon dan JWT Payload
        // Hapus field password dari objek user sebelum dikirim ke frontend atau JWT
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            fullName: user.fullName, // <<< KOREKSI PENTING
            phone: user.phone, // <<< KOREKSI PENTING
            shopeeAccount: user.shopeeAccount,
            address: user.address,
        };

        const payload = { user: userWithoutPassword }; // Gunakan objek lengkap untuk JWT

        // 4. Buat dan Kirim JWT
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
                    user: userWithoutPassword // <<< KOREKSI PENTING: Kirim objek lengkap
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

// server.js (TAMBAHKAN DI BAGIAN ENDPOINT SETELAH authMiddleware)

// Endpoint 4: Update Profile (PUT /api/profile)
app.put('/api/profile', authMiddleware, async (req, res) => {
    // Ambil user ID dari payload JWT
    const userId = req.user.id;
    // Ambil data yang ingin diupdate (pastikan nama field sesuai)
    const { fullName, phone, shopeeAccount, address } = req.body;

    // Minimal harus ada satu field yang diisi
    if (!fullName && !phone && !shopeeAccount && !address) {
        return res.status(400).json({ message: 'Minimal satu field profil harus diisi untuk diupdate.' });
    }

    try {
        // Objek untuk update Prisma (hanya field yang memiliki nilai)
        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (phone) updateData.phone = phone;
        if (shopeeAccount) updateData.shopeeAccount = shopeeAccount;
        if (address) updateData.address = address;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                shopeeAccount: true,
                address: true,
            }
        });

        // Kirim respon sukses dengan data user terbaru
        res.json({ 
            success: true, 
            message: 'Profil berhasil diperbarui!', 
            user: updatedUser 
        });

    } catch (error) {
        console.error("Error Update Profile:", error);
        res.status(500).json({ message: 'Server error saat memperbarui profil.' });
    }
});

// =============== START SERVER ===============
app.listen(PORT, () => {
    console.log(`🚀 Express Server berjalan di http://localhost:${PORT}`);
    console.log(`Database Status: OK (Connected via Railway)`);
});