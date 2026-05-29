import React from 'react';
import { FiArrowLeft, FiCheck, FiMapPin, FiPackage, FiTruck, FiNavigation } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TrackOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || 'SB12345678';

  // Mock timeline data
  const timeline = [
    { title: 'Order Placed', date: '12 May 2024, 10:30 AM', completed: true, icon: <FiPackage size={12} /> },
    { title: 'Processing', date: '12 May 2024, 02:15 PM', completed: true, icon: <FiCheck size={12} /> },
    { title: 'Packed', date: '13 May 2024, 09:00 AM', completed: true, icon: <FiPackage size={12} /> },
    { title: 'Shipped', date: '14 May 2024, 11:45 AM', completed: true, icon: <FiTruck size={12} /> },
    { title: 'Out for Delivery', date: '15 May 2024, 08:30 AM', completed: false, isNext: true, icon: <FiMapPin size={12} /> },
    { title: 'Delivered', date: 'Expected by 16 May 2024', completed: false, icon: <FiCheck size={12} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins'] py-4 px-2 md:px-6">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center mb-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-1 text-gray-500 hover:text-[#054425] transition-colors text-[11px] md:text-xs font-medium font-['Poppins']">
            <FiArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Left Column: Tracking Timeline */}
            <div className="md:col-span-8">
                <div className="bg-[#F4F8F5] border border-[#054425]/10 rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4 border-b border-[#054425]/10 pb-3">
                        <div>
                            <h1 className="text-lg md:text-xl font-bold font-['Poppins'] text-[#054425] mb-0.5 tracking-normal">Order Tracking</h1>
                            <p className="text-[11px] md:text-xs font-['Poppins'] text-gray-500">Tracking ID: <span className="font-semibold text-gray-900">#{orderId}</span></p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <span className="inline-block bg-[#054425]/10 text-[#054425] font-['Poppins'] px-2.5 py-1 rounded text-[10px] font-semibold">
                                In Transit
                            </span>
                        </div>
                    </div>

                    {/* Vertical Stepper Timeline - Super Compact */}
                    <div className="relative pl-3 md:pl-4 py-1">
                        {/* Connecting Line behind the icons */}
                        <div className="absolute top-3 bottom-6 left-[23px] md:left-[27px] w-[2px] bg-gray-200 z-0"></div>
                        
                        <div className="space-y-4">
                            {timeline.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex gap-4">
                                
                                {/* Icon Container */}
                                <div className="relative flex flex-col items-center">
                                    <div 
                                        className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-sm transition-colors duration-300
                                        ${step.completed 
                                            ? 'bg-[#054425] border-[#054425] text-white' 
                                            : step.isNext 
                                            ? 'bg-white border-[#054425] text-[#054425] animate-pulse' 
                                            : 'bg-white border-gray-200 text-gray-300'
                                        }
                                        `}
                                    >
                                        {step.completed ? (
                                        <FiCheck size={12} strokeWidth={3} />
                                        ) : (
                                        <div className={`w-1.5 h-1.5 rounded-full ${step.isNext ? 'bg-[#054425]' : 'bg-gray-200'}`}></div>
                                        )}
                                    </div>
                                    
                                    {/* Fill the line for completed steps dynamically */}
                                    {step.completed && idx < timeline.length - 1 && (
                                        <div className="absolute top-6 w-[2px] h-5 bg-[#054425] z-20"></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className={`text-xs md:text-sm font-semibold font-['Poppins'] tracking-normal ${step.completed ? 'text-[#054425]' : step.isNext ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`text-[10px] md:text-xs font-['Poppins'] mt-0.5 ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {step.date}
                                    </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Inline Button */}
                    <div className="mt-5 pt-4 border-t border-[#054425]/10">
                        <button className="w-full sm:w-auto px-5 py-2 bg-[#054425] text-white rounded shadow-sm hover:bg-[#1E4D2B] transition-all text-[11px] md:text-xs font-medium font-['Poppins'] flex items-center justify-center gap-2">
                            <FiNavigation size={12} /> Track on Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Order Details Summary */}
            <div className="md:col-span-4 space-y-4 md:space-y-6">
                <div className="bg-[#F4F8F5] border border-[#054425]/10 rounded-lg shadow-sm p-4 md:p-5">
                    <h3 className="text-xs md:text-sm font-bold font-['Poppins'] text-gray-900 mb-3 border-b border-[#054425]/10 pb-2 tracking-normal">Delivery Details</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-[10px] md:text-xs font-['Poppins'] text-gray-500 mb-0.5">Expected Delivery</p>
                            <p className="text-xs md:text-sm font-semibold font-['Poppins'] text-[#054425]">16 May 2024</p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs font-['Poppins'] text-gray-500 mb-0.5">Shipping Address</p>
                            <p className="text-[11px] md:text-xs font-['Poppins'] text-gray-700 leading-relaxed">
                                Trisha Mishra<br/>
                                Sec.no.71, Indore<br/>
                                Madhya Pradesh, 452009
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs font-['Poppins'] text-gray-500 mb-0.5">Courier Partner</p>
                            <p className="text-[11px] md:text-xs font-['Poppins'] text-gray-700 flex items-center gap-1.5">
                                <FiTruck size={12} className="text-gray-400" /> Express Logistics
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F4F8F5] border border-[#054425]/10 rounded-lg shadow-sm p-4 md:p-5 text-center">
                    <h4 className="text-xs md:text-sm font-bold font-['Poppins'] text-[#054425] mb-1.5 tracking-normal">Need Help?</h4>
                    <p className="text-[10px] md:text-[11px] font-['Poppins'] text-gray-600 mb-3 leading-relaxed">If you have any questions regarding your order, our support team is here for you.</p>
                    <button className="px-4 py-1.5 bg-white text-[#054425] border border-[#054425]/20 rounded text-[10px] md:text-xs font-semibold font-['Poppins'] hover:bg-gray-50 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
