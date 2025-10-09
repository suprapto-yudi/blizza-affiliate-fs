import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';

// Ambil kode Dashboard Page Content dari HTML aslimu (setelah konversi)
const DashboardContent = () => {
    // Menggunakan kode Dashboard Page Content dari HTML aslimu
    return (
        <>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                {/* Asumsi nama user diambil dari state/props di masa depan */}
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, Suryani! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's your affiliate performance overview.</p>
                </div>
            </header>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glassmorphism p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                    <div className="bg-soft-pink p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg></div>
                    <div><p className="text-sm text-gray-500">Total Points</p><p className="text-2xl font-bold">8,250</p></div>
                </div>
                {/* ... Tambahkan Stats Card lainnya dari HTML asli ... */}
                <div className="glassmorphism p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                    <div className="bg-soft-pink p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg></div>
                    <div><p className="text-sm text-gray-500">Affiliate Level</p><p className="text-2xl font-bold">Gold</p></div>
                </div>
                <div className="glassmorphism p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                    <div className="bg-soft-pink p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
                    <div><p className="text-sm text-gray-500">Current Rank</p><p className="text-2xl font-bold">#5</p></div>
                </div>
                <div className="glassmorphism p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                    <div className="bg-soft-pink p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg></div>
                    <div><p className="text-sm text-gray-500">Total Sales</p><p className="text-2xl font-bold">Rp 3.083.431</p></div>
                </div>
            </div>

            {/* Peringkat & Redeem Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Peringkat Poin Blizza */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Peringkat Poin Blizza</h2>
                    {/* ... Tambahkan Tabel Peringkat dari HTML asli ... */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead><tr className="text-sm text-gray-500 border-b"><th className="py-3 px-2">Rank</th><th className="py-3 px-2">Nama ID</th><th className="py-3 px-2">Total Sales</th><th className="py-3 px-2 text-right">Poin</th></tr></thead>
                            <tbody>
                                <tr className="border-b hover:bg-pale-pink transition-colors"><td className="py-4 px-2 font-bold text-rose-gold">1</td><td className="py-4 px-2 font-semibold">suryaniputri007</td><td className="py-4 px-2">Rp 3.083.431</td><td className="py-4 px-2 font-bold text-right">32</td></tr>
                                <tr className="border-b hover:bg-pale-pink transition-colors"><td className="py-4 px-2 font-bold text-rose-gold">2</td><td className="py-4 px-2 font-semibold">Nuralaithifaq</td><td className="py-4 px-2">Rp 3.221.084</td><td className="py-4 px-2 font-bold text-right">32</td></tr>
                                <tr className="border-b hover:bg-pale-pink transition-colors"><td className="py-4 px-2 font-bold text-rose-gold">3</td><td className="py-4 px-2 font-semibold">Mbakranah001</td><td className="py-4 px-2">Rp 2.876.500</td><td className="py-4 px-2 font-bold text-right">31</td></tr>
                                <tr className="hover:bg-pale-pink transition-colors"><td className="py-4 px-2 font-bold text-rose-gold">4</td><td className="py-4 px-2 font-semibold">blizzababy.id</td><td className="py-4 px-2">Rp 2.543.120</td><td className="py-4 px-2 font-bold text-right">29</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Redeem Your Points */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Redeem Your Points</h2>
                    {/* ... Tambahkan Reward Cards dari HTML asli ... */}
                    <div className="space-y-4">
                        <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"><div><p className="font-bold">Branded T-Shirt</p><p className="text-sm text-rose-gold font-semibold">1,100 Poin</p></div><button className="bg-soft-pink text-white text-sm font-bold py-2 px-4 rounded-lg hover-gradient transition-all">Redeem</button></div>
                        <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"><div><p className="font-bold">$25 Gift Card</p><p className="text-sm text-rose-gold font-semibold">2,100 Poin</p></div><button className="bg-soft-pink text-white text-sm font-bold py-2 px-4 rounded-lg hover-gradient transition-all">Redeem</button></div>
                        <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"><div><p className="font-bold">Wireless Earbuds</p><p className="text-sm text-rose-gold font-semibold">7,100 Poin</p></div><button className="bg-soft-pink text-white text-sm font-bold py-2 px-4 rounded-lg hover-gradient transition-all">Redeem</button></div>
                        <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow bg-gray-100 opacity-60"><div><p className="font-bold">Trip to Bali</p><p className="text-sm text-gray-500 font-semibold">15,000 Poin</p></div><button className="bg-gray-300 text-gray-500 text-sm font-bold py-2 px-4 rounded-lg cursor-not-allowed">Not Enough</button></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <DashboardContent />
        </DashboardLayout>
    );
}