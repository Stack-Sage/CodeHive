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
    <div
      className="w-full h-screen flex flex-col md:flex-row"
      style={{
        background: "transparent",
        minHeight: "100vh",
        paddingTop: "64px", // NAV bar height
        boxSizing: "border-box"
      }}
    >
      {/* Desktop: 3 columns */}
      <div className="hidden md:flex w-full h-full">
        {/* Sidebar - fixed, glassy gradient */}
        <aside
          className="w-[320px] flex-shrink-0 flex flex-col border-r border-gray-200"
          style={{
            height: "calc(100vh - 64px)",
            position: "sticky",
            top: "64px",
           
            backdropFilter: "blur(16px)",
            boxShadow: "0 2px 24px 0 rgba(80,80,180,0.08)",
            borderRadius: "24px 0 0 24px"
          }}
        >
          <ConversationSidebar
            conversations={conversations}
            activePeerId={activePeerId}
            onSelectConversation={setActivePeerId}
            currentUser={user}
            peerId={currentPeerId}
          />
        </aside>
        {/* Chat Thread - only this scrolls, glassy gradient */}
        <main
          className="flex-1 flex flex-col border-r min-h-0"
          style={{
            height: "calc(100vh - 64px)",
          
            backdropFilter: "blur(24px)",
            boxShadow: "0 2px 24px 0 rgba(120,80,180,0.08)",
            borderRadius: "0"
          }}
        >
          <ChatWindow
            activePeer={peer}
            messages={messages}
            currentUser={user}
            isLoading={threadLoading}
          />
        </main>
        {/* Profile Card - fixed, glassy gradient */}
        <aside
          className="w-[340px] flex-shrink-0 flex flex-col items-center justify-center border-l"
          style={{
            height: "calc(100vh - 64px)",
            position: "sticky",
            top: "64px",
            background: "linear-gradient(135deg, #d6ebff 0%, #e7ecff 100%)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 2px 24px 0 rgba(180,80,180,0.08)",
            borderRadius: "0 24px 24px 0"
          }}
        >
          {peer ? <PeerProfileCard user={peer} /> : (
            <div className="flex items-center justify-center h-full  text-gray-700">
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
