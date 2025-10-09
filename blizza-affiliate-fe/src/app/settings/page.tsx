import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';

const SettingsContent = () => {
    // Ambil kode Settings Page Content dari HTML aslimu
    return (
        <>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Account Settings ⚙️</h1>
                <p className="text-gray-500 mt-1">Manage your profile, password, and payment details.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column for forms */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 border-b pb-4">Profile Information</h2>
                        <form className="space-y-4">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" id="name" defaultValue="Suryani Putri" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-pink"/></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" id="email" defaultValue="suryaniputri007@example.com" className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm" disabled/></div>
                            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" id="phone" defaultValue="081234567890" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-pink"/></div>
                            <div className="text-right pt-4"><button type="submit" className="bg-soft-pink text-white font-bold py-2 px-6 rounded-lg hover-gradient transition-all">Save Profile</button></div>
                        </form>
                    </div>
                    {/* Change Password */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4 border-b pb-4">Change Password</h2>
                        <form className="space-y-4">
                            <div><label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Current Password</label><input type="password" id="current_password" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-pink"/></div>
                            <div><label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label><input type="password" id="new_password" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-pink"/></div>
                            <div className="text-right pt-4"><button type="submit" className="bg-soft-pink text-white font-bold py-2 px-6 rounded-lg hover-gradient transition-all">Update Password</button></div>
                        </form>
                    </div>
                </div>
                {/* Right column for notifications */}
                <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
                    <h2 className="text-xl font-bold mb-4 border-b pb-4">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">Get emails about your performance.</p>
                            </div>
                            {/* Toggle Switch */}
                            <label className="inline-flex items-center cursor-pointer"><input type="checkbox" value="" className="sr-only peer" defaultChecked={true}/><div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-pink-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-gold"></div></label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Weekly Reports</p>
                                <p className="text-sm text-gray-500">Receive a weekly summary.</p>
                            </div>
                            {/* Toggle Switch */}
                            <label className="inline-flex items-center cursor-pointer"><input type="checkbox" value="" className="sr-only peer"/><div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-pink-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-gold"></div></label>
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