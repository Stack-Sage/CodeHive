import { useMemo, useCallback } from 'react';
import { previewFromConversation } from '@/utils/chatMessage';

export const useConversations = (conversations, activePeerId, setActivePeerId, openThread) => {
  // Sidebar-friendly list of conversations (partner meta + last message)
  const conversationList = useMemo(() => {
    return (conversations || []).map((c) => {
      const partnerId = c?.partner?._id || c?._id || "";
      return {
        id: String(partnerId),
        partnerId: String(partnerId),
        name: c?.partner?.fullname || c?.partner?.username || "User",
        avatar: c?.partner?.avatar || "/avatar.png",
        lastMessage: previewFromConversation(c),
        lastMessageAt: c?.lastMessageAt || null,
        unreadCount: c?.unreadCount || 0,
        isActive: String(activePeerId || "") === String(partnerId || ""),
      };
    });
  }, [conversations, activePeerId]);

  // For sidebar item click: set active and open thread
  const selectPeer = useCallback((peerId) => {
    if (!peerId) return;
    setActivePeerId(String(peerId));
    openThread(String(peerId));
  }, [setActivePeerId, openThread]);

  const unreadTotal = useMemo(
    () => (conversations || []).reduce((sum, c) => sum + (c?.unreadCount || 0), 0),
    [conversations]
  );

  return {
    conversationList,
    selectPeer,
    unreadTotal,
  };
};
