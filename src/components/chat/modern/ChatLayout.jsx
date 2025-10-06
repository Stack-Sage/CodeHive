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
  const [activeTab, setActiveTab] = useState(1); // 1: Chats, 2: Thread, 3: Profile

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

  // Set active peer when currentPeerId changes
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

  // Responsive: show tabs on mobile, columns on desktop
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white">
      {/* Desktop: 3 columns */}
      <div className="hidden md:flex w-full h-full">
        {/* Sidebar */}
        <aside className="w-[320px] border-r bg-white flex-shrink-0 flex flex-col">
          {/* Logo/Header */}
          
          {/* Search and Conversation List */}
          <ConversationSidebar
            conversations={conversations}
            activePeerId={activePeerId}
            onSelectConversation={setActivePeerId}
            currentUser={user}
            peerId={currentPeerId}
          />
        </aside>
        {/* Chat Thread */}
        <main className="flex-1 flex flex-col border-r min-h-0">
          {/* REMOVE chat header and thread rendering here */}
          {/* Only render ChatWindow */}
          <ChatWindow
            activePeer={peer}
            messages={messages}
            currentUser={user}
            isLoading={threadLoading}
          />
        </main>
        {/* Profile Card */}
        <aside className="w-[340px] bg-white flex-shrink-0 flex flex-col items-center justify-center border-l">
          {peer ? <PeerProfileCard user={peer} /> : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No profile info available.
            </div>
          )}
        </aside>
      </div>
      {/* Mobile: Tabs */}
      <div className="md:hidden w-full h-full flex flex-col">
        <div className="flex w-full border-b bg-white">
          <button
            className={`flex-1 py-3 font-bold ${activeTab === 1 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(1)}
          >
            Chats
          </button>
          <button
            className={`flex-1 py-3 font-bold ${activeTab === 2 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(2)}
          >
            Thread
          </button>
          <button
            className={`flex-1 py-3 font-bold ${activeTab === 3 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(3)}
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
              peerId={currentPeerId}
              isMobile
            />
          )}
          {activeTab === 2 && (
            <ChatWindow
              activePeer={peer}
              messages={messages}
              currentUser={user}
              isLoading={threadLoading}
              showToggle
            />
          )}
          {activeTab === 3 && (
            peer ? <PeerProfileCard user={peer} /> : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No profile info available.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
