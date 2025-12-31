
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'info' | 'success';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-2 border-black bg-[#f5f5dc] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-slide-in pointer-events-auto min-w-[280px]">
      <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-black' : 'bg-gray-400'}`}></div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-black">{message}</span>
    </div>
  );
};

export default Notification;
