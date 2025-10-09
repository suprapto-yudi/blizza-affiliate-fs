import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';

const RewardsContent = () => {
    // Ambil kode Rewards Page Content dari HTML aslimu
    return (
        <>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Rewards Catalog 🎁</h1>
                <p className="text-gray-500 mt-1">Use your points to redeem exclusive rewards.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Reward Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    <img src="https://placehold.co/400x300/FCE7F3/B76E79?text=Blizza+T-Shirt" alt="Branded T-Shirt" className="w-full h-48 object-cover"/>
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg">Branded T-Shirt</h3>
                        <p className="text-rose-gold font-semibold mb-4">1,100 Points</p>
                        <p className="text-sm text-gray-500 mb-4 flex-grow">High-quality cotton t-shirt with our company logo.</p>
                        <button className="w-full mt-auto bg-soft-pink text-white font-bold py-2 px-4 rounded-lg hover-gradient transition-all">Redeem Now</button>
                    </div>
                </div>
                {/* Reward Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    <img src="https://placehold.co/400x300/FCE7F3/B76E79?text=Gift+Card" alt="$25 Gift Card" className="w-full h-48 object-cover"/>
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg">$25 Gift Card</h3>
                        <p className="text-rose-gold font-semibold mb-4">2,100 Points</p>
                        <p className="text-sm text-gray-500 mb-4 flex-grow">A gift card for your favorite online store.</p>
                        <button className="w-full mt-auto bg-soft-pink text-white font-bold py-2 px-4 rounded-lg hover-gradient transition-all">Redeem Now</button>
                    </div>
                </div>
                {/* Reward Card (Locked) */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative">
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-10">
                        <span className="text-gray-600 font-bold text-lg">6,750 more points needed</span>
                    </div>
                    <img src="https://placehold.co/400x300/FCE7F3/B76E79?text=Trip+to+Bali" alt="Trip to Bali" className="w-full h-48 object-cover"/>
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg">Trip to Bali</h3>
                        <p className="text-gray-500 font-semibold mb-4">15,000 Points</p>
                        <p className="text-sm text-gray-500 mb-4 flex-grow">An all-expenses-paid dream vacation for two.</p>
                        <button className="w-full mt-auto bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg cursor-not-allowed">Locked</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default function RewardsPage() {
    return (
        <DashboardLayout>
            <RewardsContent />
        </DashboardLayout>
    );
}