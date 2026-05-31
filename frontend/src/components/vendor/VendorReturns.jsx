import React from 'react';

const VendorReturns = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Returns</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Manage your product returns and refunds.</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center justify-center min-h-[200px]">
        <p className="text-[12px] text-gray-400 font-medium">No returns to process right now.</p>
      </div>
    </div>
  );
};

export default VendorReturns;
