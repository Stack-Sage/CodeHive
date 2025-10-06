'use client'
import React from 'react';

const ConversationItem = React.memo(function ConversationItem({ conversation, isActive, onClick }) {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return 'No messages yet';
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 cursor-pointer transition-all duration-200
        hover:bg-gray-50 active:bg-gray-100
        ${isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''}
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={conversation.partner.avatar || '/avatar.png'}
          alt={conversation.partner.fullname || conversation.partner.username || 'User'}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
          onError={(e) => { e.target.src = '/avatar.png'; }}
        />
        {/* Online indicator - you can add online status logic here */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`
            font-medium truncate text-sm
            ${isActive ? 'text-blue-700' : 'text-gray-900'}
          `}>
            {conversation.partner.fullname || conversation.partner.username || 'Unknown User'}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatTime(conversation.lastMessageAt)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`
            text-sm truncate
            ${isActive ? 'text-blue-600' : 'text-gray-600'}
          `}>
            {truncateMessage(conversation.lastMessage)}
          </p>
          
          {/* Unread count */}
          {conversation.unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0">
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default ConversationItem;
