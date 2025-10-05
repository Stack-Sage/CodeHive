'use client'
import React from 'react';

export default function ChatHeader({ partner }) {
  return (
    <div className="border-b px-4 py-3 bg-white sticky top-0 z-10 flex items-center gap-3">
      <img
        src={partner?.avatar || '/avatar.png'}
        alt={partner?.fullname || partner?.username || 'User'}
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">Chat with</div>
        <div className="text-lg font-semibold">
          {partner?.fullname || partner?.username || 'User'}
        </div>
      </div>
    </div>
  );
}
