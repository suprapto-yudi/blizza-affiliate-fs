// src/app/settings/page.tsx
'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { AuthService, User } from '@/lib/Auth'; // <<< Ambil AuthService dan Tipe User

const SettingsContent = () => {
    // State untuk menyimpan data profil yang dimuat
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ambil data user dari AuthService (Local Storage)
        const user = AuthService.getUser();
        if (user) {
            setProfile(user);
        }
        setIsLoading(false);
    }, []);

    // Placeholder untuk state form (untuk diimplementasi fitur edit nanti)
    const [formData, setFormData] = useState({
        fullName: profile?.fullName || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        // tambahkan field lain jika ada
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.fullName || '',
                email: profile.email || '',
                phone: profile.phone || '',
            });
        }
    }, [profile]);
    
    // Handler untuk simulasi Update (nantinya memanggil API PUT /api/profile)
    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fitur Update Profil belum terhubung ke API backend! Data saat ini dari Local Storage.');
    };
    
    // Handler untuk Change Password (nantinya memanggil API POST /api/change-password)
    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fitur Ganti Password belum terhubung ke API backend!');
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading Profile...</div>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-pink-600">Account Settings ⚙️</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bagian Kiri: Profile Information & Password */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* --- Profile Information --- */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Profile Information</h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName} // Tampil dari state profil
                                    disabled // Saat ini hanya display, tidak bisa diubah
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email} // Tampil dari state profil
                                    disabled
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    value={formData.phone || ''} // Tampil dari state profil
                                    disabled
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled // Tombol dinonaktifkan karena belum ada logic API update
                                className="bg-soft-pink text-white font-bold py-2 px-4 rounded-lg transition-colors hover:bg-rose-gold disabled:bg-gray-400"
                            >
                                Save Profile
                            </button>
                        </form>
                    </div>

                    {/* --- Change Password --- */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Change Password</h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input type="password" className="mt-1 block w-full p-3 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input type="password" className="mt-1 block w-full p-3 border border-gray-300 rounded-md"/>
                            </div>
                            <button
                                type="submit"
                                className="bg-rose-gold text-white font-bold py-2 px-4 rounded-lg transition-colors hover:opacity-90"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Bagian Kanan: Notifications (Mockup Statis) */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Get emails about your performance.</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-sm bg-rose-gold" defaultChecked />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Weekly Reports</p>
                                    <p className="text-sm text-gray-500">Receive a weekly summary.</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-sm bg-rose-gold" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <SettingsContent />
        </DashboardLayout>
    );
}