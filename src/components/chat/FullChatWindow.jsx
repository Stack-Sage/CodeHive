'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/context/chat.context';
import { useGlobalContext } from '@/context/global.context';
import ConversationSidebar from './modern/ConversationSidebar';
import ChatWindow from './modern/ChatWindow';
import PeerProfileCard from './modern/PeerProfileCard';
import ChatErrorBoundary from './modern/ChatErrorBoundary';

export default function FullChatWindow({ role }) {
  const [activeTab, setActiveTab] = useState(2); // 1: sidebar, 2: chat, 3: profile
  const { conversations, activePeerId, setActivePeerId, messages, threadLoading } = useChat();
  const { user, visitedUser } = useGlobalContext();

  // Get peer info
  const peer =
    visitedUser && visitedUser._id === activePeerId
      ? visitedUser
      : conversations.find((c) => String(c.partner?._id) === String(activePeerId))?.partner;

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <ChatErrorBoundary>
      <div className="w-full h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Desktop: Sidebar, Chat, Profile */}
        <div className="hidden lg:flex w-full h-full">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-[320px] border-r bg-white h-full flex-shrink-0 overflow-y-auto"
          >
            <ConversationSidebar
              conversations={conversations}
              activePeerId={activePeerId}
              onSelectConversation={setActivePeerId}
              currentUser={user}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 border-r h-full flex flex-col min-h-screen overflow-hidden"
          >
            <ChatWindow
              activePeer={peer}
              messages={messages}
              currentUser={user}
              isLoading={threadLoading}
              role={role}
            />
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-[340px] bg-white h-full flex-shrink-0 overflow-y-auto"
          >
            {peer ? <PeerProfileCard user={peer} /> : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No profile info available.
              </div>
            )}
          </motion.div>
        </div>
        {/* Mobile: Tabs */}
        <div className="lg:hidden w-full h-full flex flex-col">
          <div className="flex w-full border-b bg-white">
            <button
              className={`flex-1 py-3 font-bold ${activeTab === 1 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => handleTabChange(1)}
            >
              Chats
            </button>
            <button
              className={`flex-1 py-3 font-bold ${activeTab === 2 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => handleTabChange(2)}
            >
              Thread
            </button>
            <button
              className={`flex-1 py-3 font-bold ${activeTab === 3 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => handleTabChange(3)}
            >
              Profile
            </button>
          </div>
          <div className="flex-1 w-full h-full overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 1 && (
                <motion.div
                  key="sidebar"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <ConversationSidebar
                    conversations={conversations}
                    activePeerId={activePeerId}
                    onSelectConversation={setActivePeerId}
                    currentUser={user}
                    isMobile
                  />
                </motion.div>
              )}
              {activeTab === 2 && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full min-h-screen"
                >
                  <ChatWindow
                    activePeer={peer}
                    messages={messages}
                    currentUser={user}
                    isLoading={threadLoading}
                    showToggle
                  />
                </motion.div>
              )}
              {activeTab === 3 && (
                <motion.div
                  key="profile"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="h-full overflow-y-auto"
                >
                  {peer ? <PeerProfileCard user={peer} /> : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No profile info available.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ChatErrorBoundary>
  );
}
