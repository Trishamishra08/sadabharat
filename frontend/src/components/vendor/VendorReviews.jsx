import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const VendorReviews = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Reviews</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">See what customers are saying about your products.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Review</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-gray-800">
              {[
                { product: 'NEEM TULSI Face Wash', customer: 'Ankita S.', rating: 5, review: 'Absolutely love this! Cleared my skin.', date: 'May 30, 2024' },
                { product: 'BHRINGRAJ Hair Oil', customer: 'Rahul K.', rating: 4, review: 'Good smell, works fine.', date: 'May 28, 2024' },
                { product: 'AMLA Powder', customer: 'Priya M.', rating: 5, review: 'Very authentic and pure.', date: 'May 25, 2024' },
              ].map((rev, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{rev.product}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{rev.customer}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5 text-orange-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} fill={idx < rev.rating ? "currentColor" : "none"} strokeWidth={idx < rev.rating ? 0 : 2} className={idx >= rev.rating ? "text-gray-300" : ""} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium max-w-[200px] truncate">{rev.review}</td>
                  <td className="px-4 py-3 text-gray-500 font-medium">{rev.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorReviews;
