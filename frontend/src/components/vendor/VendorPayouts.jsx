import React from 'react';
import { CreditCard, History, ArrowRightCircle } from 'lucide-react';

const VendorPayouts = () => {
  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Payouts</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Manage your withdrawable balance and payout history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#054425] text-white p-8 rounded-[20px] shadow-lg relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
           <div>
             <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Available Balance</p>
             <h2 className="text-4xl font-black font-serif tracking-tight">₹19,680</h2>
           </div>
           <button className="mt-8 w-full bg-white text-[#054425] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
             Request Payout <ArrowRightCircle size={18} />
           </button>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><History size={18} className="text-gray-400" /> Payout History</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Transaction ID</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-800">
                {[
                  { date: 'May 15, 2024', id: 'TXN-987654321', amount: '₹45,000', status: 'Paid' },
                  { date: 'Apr 30, 2024', id: 'TXN-987654320', amount: '₹61,000', status: 'Paid' },
                  { date: 'May 28, 2024', id: 'TXN-987654322', amount: '₹19,680', status: 'Pending' },
                ].sort((a, b) => b.status === 'Pending' ? 1 : -1).map((tx, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{tx.id}</td>
                    <td className="px-6 py-4 font-black">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPayouts;
