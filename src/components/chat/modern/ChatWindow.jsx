'use client'
import React, { useRef, useEffect, useState } from 'react';
import { FaBars, FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa';
import ChatInput from './ChatInput';
import { sendMessageApi } from "@/services/chat.service";
import { showSuccess, showError, showInfo } from "@/ui/toast";
import { useChat } from '@/context/chat.context'; // use reloadThread from context
import ThreadMessages from '../ThreadMessages'; // added import

export default function ChatWindow({
  activePeer,
  currentUser,
  isLoading,
  showToggle,
  onLoadMore,
  hasMore,
  isSending,
  role,
  onToggleSidebar,
}) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { reloadThread } = useChat();

  // Auto scroll to bottom when messages prop changes
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Prevent sending message to self; send and then reload canonical thread
  const handleSendMessage = async (messageData) => {
    if (!activePeer || !currentUser?._id) return;
    if (String(currentUser._id) === String(activePeer._id)) {
      showInfo("You can't message yourself.");
      return;
    }
    try {
      await sendMessageApi({
        senderId: currentUser._id,
        receiverId: activePeer._id,
        message: messageData.text,
      });
      showSuccess("Message sent");
      if (reloadThread) await reloadThread();
      scrollToBottom();
    } catch (error) {
      showError("Failed to send message");
      console.error(error);
    }
  };

  if (!activePeer) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <FaBars className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            {role === 'Student' ? 'Select a teacher to start chatting' : 'Select a student to start chatting'}
          </h3>
          <p className="text-gray-400">
            Choose a conversation from the sidebar to begin messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {showToggle && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
            >
              <FaBars className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <img
            src={activePeer.avatar || '/avatar.png'}
            alt={activePeer.fullname || activePeer.username}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
            onError={(e) => { e.target.src = '/avatar.png'; }}
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {activePeer.fullname || activePeer.username || 'Unknown User'}
            </h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaPhone className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaVideo className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaEllipsisV className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        // ensure this area is scrollable and limited to ~90vh so header/input stay visible
        className="flex-1 overflow-y-auto p-4 space-y-1 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          // limit the thread viewport height (90vh) so the chat input and header remain visible
          maxHeight: "90vh",
          // ensure the container can shrink properly
          minHeight: 0,
        }}
      >
        {/* Load More Button */}
        {hasMore && (
          <div className="text-center py-4">
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Load older messages'}
            </button>
          </div>
        )}

        {/* ThreadMessages will render the messages list */}
        <div>
          <ThreadMessages activePeer={activePeer} currentUser={currentUser} />
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        >
          ↓
        </button>
      )}

      {/* Chat Input */}
      <div className="border-t border-gray-200 bg-white">
        <ChatInput
          onSendMessage={handleSendMessage}
          isSending={isSending}
          disabled={!activePeer}
        />
      </div>
    </div>
  );
}