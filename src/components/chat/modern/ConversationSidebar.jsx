'use client'
import React, { useState } from 'react';
import { FaTimes, FaSearch, FaPlus } from 'react-icons/fa';
import ConversationItem from './ConversationItem';

export default function ConversationSidebar({ 
  conversations = [], 
  activePeerId, 
  onSelectConversation,
  currentUser,
  onClose,
  isMobile 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversation) => {
    onSelectConversation(conversation.partnerId);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar || '/avatar.png'}
              alt={currentUser?.fullname || 'User'}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                Chats
              </h2>
              <p className="text-xs text-gray-500">
                {filteredConversations.length} conversations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaPlus className="w-4 h-4 text-gray-600" />
            </button>
            {isMobile && (
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm border-none outline-none focus:bg-gray-200 transition-colors"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-center">
              {searchQuery ? `No conversations found for "${searchQuery}"` : 
               'No conversations yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.partnerId}
                conversation={conversation}
                isActive={String(activePeerId) === String(conversation.partnerId)}
                onClick={() => handleConversationClick(conversation)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Ensure onSelectConversation sets activePeerId in context
