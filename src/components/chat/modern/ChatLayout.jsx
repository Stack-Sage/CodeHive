'use client'
import React, { useState, useEffect } from 'react';
import { useChat } from '@/context/chat.context';
import { useGlobalContext } from '@/context/global.context';
import ConversationSidebar from './ConversationSidebar';
import ChatWindow from './ChatWindow';
import PeerProfileCard from './PeerProfileCard';

export default function ChatLayout({ currentPeerId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(2); // 1: sidebar, 2: chat, 3: profile

  const {
    conversations,
    activePeerId,
    setActivePeerId,
    messages,
    threadLoading,
  } = useChat();

  const { user, visitedUser, setVisitedUser } = useGlobalContext();

  // Responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set active peer when currentPeerId changes (e.g., after clicking "Message")
  useEffect(() => {
    if (currentPeerId && setActivePeerId) {
      setActivePeerId(currentPeerId);
    }
  }, [currentPeerId, setActivePeerId]);

  // Ensure visitedUser is set for profile display
  useEffect(() => {
    if (activePeerId) {
      const peer =
        conversations.find((c) => String(c.partner?._id) === String(activePeerId))?.partner;
      if (peer && (!visitedUser || visitedUser._id !== peer._id)) {
        setVisitedUser(peer);
      }
    }
  }, [activePeerId, conversations, visitedUser, setVisitedUser]);

  // Get peer info for profile and chat
  const peer =
    visitedUser && visitedUser._id === activePeerId
      ? visitedUser
      : conversations.find((c) => String(c.partner?._id) === String(activePeerId))?.partner;

  // Tab change for mobile
  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Desktop: 3 columns */}
      <div className="hidden lg:flex w-full h-full">
        {/* Left: Conversation list */}
        <div className="w-[320px] border-r bg-white h-full flex-shrink-0 overflow-y-auto">
          <ConversationSidebar
            conversations={conversations}
            activePeerId={activePeerId}
            onSelectConversation={setActivePeerId}
            currentUser={user}
          />
        </div>
        {/* Center: Chat thread */}
        <div className="flex-1 border-r h-full flex flex-col min-h-screen overflow-hidden">
          <div className="flex flex-col h-full">
            <ChatWindow
              activePeer={peer}
              messages={messages}
              currentUser={user}
              isLoading={threadLoading}
            />
          </div>
        </div>
        {/* Right: Peer profile */}
        <div className="w-[340px] bg-white h-full flex-shrink-0 overflow-y-auto">
          {peer ? <PeerProfileCard user={peer} /> : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No profile info available.
            </div>
          )}
        </div>
      </div>
      {/* Mobile: Tabs/sliding */}
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
          {activeTab === 1 && (
            <ConversationSidebar
              conversations={conversations}
              activePeerId={activePeerId}
              onSelectConversation={setActivePeerId}
              currentUser={user}
              isMobile
            />
          )}
          {activeTab === 2 && (
            <div className="flex flex-col h-full min-h-screen">
              <ChatWindow
                activePeer={peer}
                messages={messages}
                currentUser={user}
                isLoading={threadLoading}
                showToggle
              />
            </div>
          )}
          {activeTab === 3 && (
            <div className="h-full overflow-y-auto">
              {peer ? <PeerProfileCard user={peer} /> : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No profile info available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
