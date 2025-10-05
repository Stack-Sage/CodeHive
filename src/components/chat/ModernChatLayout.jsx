import React, { useEffect, useState } from "react";
import { useChat } from "@/context/chat.context";
import { useGlobalContext } from "@/context/global.context";
import ConversationSidebar from "./modern/ConversationSidebar";
import ChatWindow from "./modern/ChatWindow";
import PeerProfileCard from "./modern/PeerProfileCard";

export default function ModernChatLayout({ peerId, role }) {
  const { user, isLogin, visitedUser, setVisitedUser } = useGlobalContext();
  const {
    conversations,
    activePeerId,
    setActivePeerId,
    messages,
    threadLoading,
  } = useChat();

  // Responsive tab state for mobile
  const [activeTab, setActiveTab] = useState(1); // 1: sidebar, 2: chat, 3: profile

  // Ensure activePeerId is set when peerId changes (e.g., when clicking "Message")
  useEffect(() => {
    if (peerId && setActivePeerId) {
      setActivePeerId(peerId);
    }
  }, [peerId, setActivePeerId]);

  // Poll for new messages every 1.5s when chat is open
  useEffect(() => {
    if (!activePeerId || !isLogin || !user?._id) return;
    const interval = setInterval(() => {
      setActivePeerId(activePeerId);
    }, 1500);
    return () => clearInterval(interval);
  }, [activePeerId, isLogin, user, setActivePeerId]);

  // Get peer info (visitedUser if set, otherwise from conversations)
  const peer =
    visitedUser && visitedUser._id === activePeerId
      ? visitedUser
      : conversations.find((c) => String(c.partner?._id) === String(activePeerId))?.partner;

  // If peer is found in conversations but not in visitedUser, update visitedUser
  useEffect(() => {
    if (peer && (!visitedUser || visitedUser._id !== peer._id)) {
      setVisitedUser(peer);
    }
  }, [peer, visitedUser, setVisitedUser]);

  // Handle tab change for mobile
  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Desktop: 3 columns */}
      <div className="hidden md:flex w-full h-full">
        {/* Left: Conversation list */}
        <div className="w-[320px] border-r bg-white h-full">
          <ConversationSidebar
            conversations={conversations}
            activePeerId={activePeerId}
            onSelectConversation={setActivePeerId}
            currentUser={user}
            role={role}
          />
        </div>
        {/* Center: Chat thread */}
        <div className="flex-1 border-r h-full flex flex-col">
          <ChatWindow
            activePeer={peer}
            messages={messages}
            currentUser={user}
            role={role}
            isLoading={threadLoading}
            // ...existing code...
          />
        </div>
        {/* Right: Peer profile */}
        <div className="w-[340px] bg-white h-full">
          {/* Always show peer profile if peer exists */}
          {peer ? <PeerProfileCard user={peer} /> : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No profile info available.
            </div>
          )}
        </div>
      </div>
      {/* Mobile: Tabs/sliding */}
      <div className="md:hidden w-full h-full flex flex-col">
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
              role={role}
              isMobile
            />
          )}
          {activeTab === 2 && (
            <ChatWindow
              activePeer={peer}
              messages={messages}
              currentUser={user}
              role={role}
              isLoading={threadLoading}
              showToggle
              // ...existing code...
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
