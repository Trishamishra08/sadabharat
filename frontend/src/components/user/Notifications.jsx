import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import { FiBell } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';

const Notifications = () => {
  const { user } = useShop();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-4 md:pt-6 pb-12 font-sans selection:bg-[#054425] selection:text-white">
      <div className="w-full px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        
        <ProfileSidebar activeTab="notifications" />
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#054425] mb-1">Notifications</h1>
              <p className="text-xs text-gray-500 font-medium">Updates, offers, and account alerts</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm min-h-[400px]">
            <div className="py-20 text-center flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                <FiBell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No notifications</h3>
              <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
                You're all caught up! We will let you know when there's something new.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Notifications;
