'use client'
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { FaTimes, FaSearch, FaUsers, FaComments } from 'react-icons/fa';
import ConversationItem from './ConversationItem';
import useUserHook from '@/hooks/useUserHook';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/global.context';

const PAGE_SIZE = 20;

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default React.memo(function ConversationSidebar({ 
  conversations = [], 
  activePeerId, 
  onSelectConversation,
  currentUser,
  onClose,
  isMobile,
  peerId,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [peerUser, setPeerUser] = useState(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [page, setPage] = useState(1);
  const { getUserById, getAllUser } = useUserHook();
  const router = useRouter();
  const { allUser } = useGlobalContext();
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  useEffect(() => {
    if (showAllUsers && (!allUser || allUser.length === 0)) {
      getAllUser();
    }
  }, [showAllUsers, getAllUser, allUser]);

  useEffect(() => {
    // Only fetch if peerId is defined and not already in conversations
    if (peerId && typeof peerId === "string" && !conversations.some(c => String(c.partner?._id) === String(peerId))) {
      getUserById(peerId).then(setPeerUser).catch(() => setPeerUser(null));
    }
  }, [peerId, conversations, getUserById]);

  let sidebarConversations = [...conversations];
  if (peerId && peerUser && !sidebarConversations.some(c => String(c.partner?._id) === String(peerId))) {
    sidebarConversations = [
      {
        partner: peerUser,
        lastMessage: "",
        lastMessageAt: "",
        unreadCount: 0,
        partnerId: peerUser._id,
      },
      ...sidebarConversations,
    ];
  }

  // Memoized filtered lists
  const filteredConversations = useMemo(() => {
    // Exclude self from conversations
    return sidebarConversations
      .filter(conv => String(conv.partner?._id) !== String(currentUser?._id))
      .filter(conv => 
        (conv.partner?.fullname || conv.partner?.username || "")
          .toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (conv.lastMessage || "").toLowerCase().includes(debouncedSearch.toLowerCase())
      );
  }, [sidebarConversations, debouncedSearch, currentUser]);

  const filteredUsers = useMemo(() => {
    return (allUser || []).filter(u =>
      (u.fullname || u.username || "").toLowerCase().includes(debouncedSearch.toLowerCase())
      && String(u._id) !== String(currentUser?._id)
    );
  }, [allUser, debouncedSearch, currentUser]);

  // Pagination
  const paginatedConversations = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredConversations.slice(start, start + PAGE_SIZE);
  }, [filteredConversations, page]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  const handleConversationClick = (conversation) => {
    // Always use partner._id from the mapped conversation
    const userId = conversation.partner?._id || conversation.partnerId;
    if (!userId) return;
    onSelectConversation(userId);
    router.push(`/chat/${userId}`);
  };

  const handleUserClick = (user) => {
    // Always use user._id from the mapped user
    if (!user?._id) return;
    onSelectConversation(user._id);
    router.push(`/chat/${user._id}`);
  };

  return (
    <Suspense fallback={<div className="p-6 text-center  text-gray-400">Loading contacts...</div>}>
      <div className="flex flex-col h-full bg-gradient-to-tr from-sky-200/40 via-gray-100 to-blue-100/40 shadow-lg">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white/20 shadow-lg ">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatar || '/avatar.png'}
                alt={currentUser?.fullname || 'User'}
                loading="lazy"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h2 className="font-semibold text-gray-900 text-lg">
                  {currentUser?.fullname || currentUser?.username || 'Unknown User'}
                </h2>
                <p className="text-xs text-gray-500">
                  {showAllUsers ? `${filteredUsers.length} contacts` : `${filteredConversations.length} conversations`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-full transition-colors ${showAllUsers ? "bg-blue-100" : ""}`}
                title="Show contacts"
                onClick={() => { setShowAllUsers(true); setPage(1); }}
              >
                <FaUsers className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className={`p-2 rounded-full transition-colors ${!showAllUsers ? "bg-blue-100" : ""}`}
                title="Show chats"
                onClick={() => { setShowAllUsers(false); setPage(1); }}
              >
                <FaComments className="w-4 h-4 text-gray-600" />
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
              placeholder={showAllUsers ? "Search contacts..." : "Search conversations..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm border-none outline-none focus:bg-gray-200 transition-colors"
            />
          </div>
        </div>
        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {showAllUsers ? (
            paginatedUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaSearch className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-center">
                  {debouncedSearch ? `No contacts found for "${debouncedSearch}"` : 'No contacts yet'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginatedUsers.map((user) => (
                  <ConversationItem
                    key={user._id}
                    conversation={{
                      partner: user,
                      lastMessage: "",
                      lastMessageAt: "",
                      unreadCount: 0,
                      partnerId: user._id,
                    }}
                    isActive={String(activePeerId) === String(user._id)}
                    onClick={() => handleUserClick(user)}
                  />
                ))}
                {filteredUsers.length > PAGE_SIZE && (
                  <div className="flex justify-center py-2">
                    <button
                      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page * PAGE_SIZE >= filteredUsers.length}
                    >
                      Load more
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            paginatedConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaSearch className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-center">
                  {debouncedSearch ? `No conversations found for "${debouncedSearch}"` : 'No conversations yet'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginatedConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.partner?._id}
                    conversation={{
                      partner: conversation.partner,
                      lastMessage: conversation.lastMessage,
                      lastMessageAt: conversation.lastMessageAt,
                      unreadCount: conversation.unreadCount,
                      partnerId: conversation.partner?._id,
                    }}
                    isActive={String(activePeerId) === String(conversation.partner?._id)}
                    onClick={() => handleConversationClick(conversation)}
                  />
                ))}
                {filteredConversations.length > PAGE_SIZE && (
                  <div className="flex justify-center py-2">
                    <button
                      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page * PAGE_SIZE >= filteredConversations.length}
                    >
                      Load more
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </Suspense>
  );
});
