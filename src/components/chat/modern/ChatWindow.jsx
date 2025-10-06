'use client'
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { FaBars, FaPhone, FaVideo, FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import { sendMessageApi, uploadMessageFileApi } from "@/services/chat.service";
import { showSuccess, showError } from "@/ui/toast";
import { useChat } from '@/context/chat.context';
import { useGlobalContext } from '@/context/global.context';
import ThreadMessages from '../ThreadMessages';
import ChatThread from '../ChatThread';
import MessageList from '../MessageList';
import PeerProfileCard from './PeerProfileCard';
import ChatErrorBoundary from './ChatErrorBoundary';

export default function ChatWindow({
  activePeer,
  messages,
  currentUser,
  isLoading,
  showToggle,
  onLoadMore,
  hasMore,
  isSending,
  role,
  onToggleSidebar,
  renderMode = "thread", // "thread" | "bubble" | "list"
}) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [fileWarning, setFileWarning] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const { reloadThread, threadLoading, deleteMessageApi } = useChat();

  // Auto scroll to bottom when messages change (force scroll for receiver/sender)
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    scrollToBottom();
  }, [messages?.length]);

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

  // Send message with optional file
  const handleSendMessage = async () => {
    if (!activePeer || !currentUser?._id) return;
    // If file is present but message is empty, show warning and prevent send
    if (file && !message.trim()) {
      setFileWarning("Please add a short message along with your file.");
      return;
    }
    if (!message.trim() && !file) return;
    setFileWarning('');
    setSending(true);
    setShowLoader(true);
    let fileUrl = "";
    let fileType = "";
    try {
      if (file) {
        const res = await uploadMessageFileApi(file);
        fileUrl = res?.secure_url || res?.url || "";
        fileType = file.type || "";
      }
      await sendMessageApi({
        senderId: currentUser._id,
        receiverId: activePeer._id,
        message: message.trim(),
        fileUrl,
        fileType,
      });
      showSuccess("Message sent");
      setMessage('');
      setFile(null);
      if (reloadThread) await reloadThread();
      scrollToBottom();
    } catch (error) {
      showError("Failed to send message");
    } finally {
      setSending(false);
      setShowLoader(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessageApi(id);
      showSuccess('Message deleted');
      if (reloadThread) await reloadThread();
    } catch (err) {
      showError('Failed to delete message');
    }
  };

  // Debug: Show props in development
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("ChatWindow props:", { activePeer, currentUser, messages });
  }

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

  // Fallback if messages is empty
  const isEmpty = !messages || messages.length === 0;

  // Remove all backgrounds from main container and thread area
  return (
    <div className="flex flex-col h-full min-h-0 bg-gradient-to-br from-sky-200/20 via-gray-50 to-blue-100/30">
      {/* Chat Header - sticky/fixed */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/20  backdrop-blur-lg shadow-lg ">
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
            loading="lazy"
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

      {/* Chat Bubbles Area (scrollable) */}
      <Suspense fallback={<div className="p-6 text-center text-gray-400">Loading messages...</div>}>
        <ChatErrorBoundary>
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-indigo-200"
            style={{
              minHeight: 0,
              maxHeight: "calc(100vh - 64px - 56px - 56px)", // NAV + header + input
              background: "transparent",
              borderRadius: "18px"
            }}
          >
            {hasMore && (
              <div className="text-center py-4">
                <button
                  onClick={onLoadMore}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm text-blue-600  hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Load older messages'}
                </button>
              </div>
            )}

            {/* Only render ONE thread/messages component */}
            {(() => {
              if (!messages || messages.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="text-2xl mb-2">No messages yet</div>
                    <div className="text-sm">Start the conversation!</div>
                  </div>
                );
              }
              if (renderMode === "thread") {
                return (
                  <ThreadMessages
                    activePeer={activePeer}
                    currentUser={currentUser}
                    messages={messages}
                    onDelete={handleDelete}
                  />
                );
              }
              if (renderMode === "bubble") {
                return (
                  <MessageList
                    messages={messages}
                    currentUserId={currentUser?._id}
                  />
                );
              }
              if (renderMode === "list") {
                return (
                  <ChatThread
                    messages={messages}
                    currentUserId={currentUser?._id}
                  />
                );
              }
              return null;
            })()}

            <div ref={messagesEndRef} />
          </div>
        </ChatErrorBoundary>
      </Suspense>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        >
          ↓
        </button>
      )}

      {/* Chat Input - sticky/fixed at bottom */}
      <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white bg-opacity-80 backdrop-blur-lg px-4 py-3 flex gap-2 items-center">
        {/* File upload */}
        <label className="flex items-center cursor-pointer">
          <FaPaperclip className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
        </label>
        {file && (
          <span className="text-xs text-gray-600 mr-2">{file.name}</span>
        )}
        {/* Message input */}
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 h-10 px-3 rounded-md ring-1 ring-blue-800/40 focus:ring-blue-800/90 hover:ring-blue-70 outline-none"
          disabled={sending}
        />
        <button
          onClick={handleSendMessage}
          className="h-10 px-4 rounded-md bg-blue-900 text-white ring-1 ring-black/20 disabled:cursor-not-allowed cursor-pointer font-semibold disabled:bg-white disabled:text-blue-800 shadow-md hover:brightness-125 transition-all duration-200 ease-in "
          disabled={sending || (!message.trim() && !file)}
        >
          {sending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Sending...
            </span>
          ) : "Send"}
        </button>
        {/* File warning */}
        {fileWarning && (
          <span className="ml-4 text-xs text-red-500 animate-fadein">{fileWarning}</span>
        )}
      </div>
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}