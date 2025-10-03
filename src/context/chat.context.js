'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  sendMessageApi,
  getThreadApi,
  getConversationsApi,
  markThreadAsReadApi,
  editMessageApi,
  deleteMessageApi,
  searchMessagesApi,
} from "../services/chat.service";
import { useGlobalContext } from "./global.context";
import { showSuccess, showInfo } from "@/ui/toast";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { isStuLogin, studentUser, user } = useGlobalContext();

  const role = useMemo(
    () => ((isStuLogin === true || isStuLogin === "true") ? "Student" : "Teacher"),
    [isStuLogin]
  );
  const currentUserId = useMemo(
    () => (role === "Student" ? studentUser?._id : user?._id),
    [role, studentUser, user]
  );

  const [conversations, setConversations] = useState([]);
  const [convLoading, setConvLoading] = useState(false);

  const [activePeerId, setActivePeerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchTokenRef = useRef(0); // guard stale responses

  const refreshConversations = useCallback(async () => {
    if (!currentUserId) return;
    setConvLoading(true);
    try {
      const res = await getConversationsApi(currentUserId, role);
      setConversations(res?.data?.data || []); // unwrap ApiResponse
    } finally {
      setConvLoading(false);
    }
  }, [currentUserId, role]);

  const openThread = useCallback(async (peerId) => {
    if (!peerId || !currentUserId) return;
    setActivePeerId(peerId);
    setThreadLoading(true);
    setPage(1);
    setMessages([]); // clear current thread messages before loading new one
    // ensure conversations are fresh so activePeer is available for UI fallbacks
    refreshConversations();

    const myToken = ++fetchTokenRef.current;
    try {
      const res = await getThreadApi(currentUserId, peerId, { page: 1, limit: 50 });
      if (myToken !== fetchTokenRef.current) return; // ignore stale
      const list = res?.data?.data || []; // unwrap
      setMessages(list);
      setHasMore(list.length === 50);
    } finally {
      if (myToken === fetchTokenRef.current) setThreadLoading(false);
    }
  }, [currentUserId, refreshConversations]);

  const loadMore = useCallback(async () => {
    if (!activePeerId || !currentUserId || !hasMore) return;
    const nextPage = page + 1;
    setThreadLoading(true);
    const myToken = ++fetchTokenRef.current;
    try {
      const res = await getThreadApi(currentUserId, activePeerId, { page: nextPage, limit: 50 });
      if (myToken !== fetchTokenRef.current) return; // ignore stale
      const list = res?.data?.data || []; // unwrap
      // Prepend older messages to keep ascending order (older first)
      setMessages(prev => [...list, ...prev]);
      setPage(nextPage);
      setHasMore(list.length === 50);
    } finally {
      if (myToken === fetchTokenRef.current) setThreadLoading(false);
    }
  }, [activePeerId, currentUserId, page, hasMore]);

  // Unified per-thread prefs (mute, draft, lastReadAt, lastScrollTop, pinnedMessageId, blocked)
  const prefKey = (peerId) => `chatPrefs:${currentUserId}:${peerId}`;
  const readPrefs = useCallback((peerId = activePeerId) => {
    if (!currentUserId || !peerId) return {};
    try {
      const raw = localStorage.getItem(prefKey(peerId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, [currentUserId, activePeerId]);

  const writePrefs = useCallback((updates, peerId = activePeerId) => {
    if (!currentUserId || !peerId) return {};
    const current = readPrefs(peerId);
    const next = { ...current, ...updates };
    try { localStorage.setItem(prefKey(peerId), JSON.stringify(next)); } catch {}
    return next;
  }, [currentUserId, activePeerId, readPrefs]);

  const isThreadMuted = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    return !!p.muted;
  }, [readPrefs, activePeerId]);

  const toggleMute = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    const next = !p.muted;
    writePrefs({ muted: next }, peerId);
    return next;
  }, [readPrefs, writePrefs, activePeerId]);

  // Expose draft getters/setters for pages
  const getDraftForThread = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    return p.draft || "";
  }, [readPrefs, activePeerId]);

  const setDraftForThread = useCallback((value, peerId = activePeerId) => {
    writePrefs({ draft: value || "" }, peerId);
  }, [writePrefs, activePeerId]);

  // Expose last read/scroll setters
  const setLastReadForThread = useCallback((opts = {}, peerId = activePeerId) => {
    writePrefs({ lastReadAt: opts.lastReadAt || new Date().toISOString(), lastScrollTop: opts.lastScrollTop ?? 0 }, peerId);
  }, [writePrefs, activePeerId]);

  // Pin helpers
  const getPinnedMessageForThread = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    return p.pinnedMessageId || null;
  }, [readPrefs, activePeerId]);

  const setPinnedMessageForThread = useCallback((messageId = null, peerId = activePeerId) => {
    writePrefs({ pinnedMessageId: messageId }, peerId);
  }, [writePrefs, activePeerId]);

  // Block helpers
  const isThreadBlocked = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    return !!p.blocked;
  }, [readPrefs, activePeerId]);

  const toggleBlockThread = useCallback((peerId = activePeerId) => {
    const p = readPrefs(peerId);
    const next = !p.blocked;
    writePrefs({ blocked: next }, peerId);
    return next;
  }, [readPrefs, writePrefs, activePeerId]);

  // Define activePeer before any hook that depends on it (send/getMessageMeta)
  const activePeer = useMemo(() => {
    if (!activePeerId) return null;
    const c =
      (conversations || []).find(x => {
        const partnerId = x?.partner?._id || x?.partner?.id || x?.partner?.userId;
        return String(partnerId || "") === String(activePeerId);
      }) ||
      (conversations || []).find(x => String(x._id) === String(activePeerId)); // fallback
    if (!c?.partner) return null;
    return { ...c.partner, conversationId: c._id };
  }, [conversations, activePeerId]);

  // Optimistic send with retry on failure
  const send = useCallback(async ({ text, fileUrl, fileType } = {}) => {
    if (!activePeerId || !currentUserId) return;
    setIsSending(true);

    // Use peer user id as receiverId, not conversation id
    const receiverId = String(activePeer?._id || activePeerId);

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const base = {
      _id: tempId,
      message: text || "",
      fileUrl,
      fileType,
      read: false,
      createdAt: new Date().toISOString(),
      __optimistic: true,
      __failed: false,
      senderId: currentUserId,
      receiverId,
      senderRole: role,
    };
    const temp =
      role === "Teacher"
        ? { ...base, fromTeacher: currentUserId, toStudent: receiverId }
        : { ...base, fromStudent: currentUserId, toTeacher: receiverId };

    setMessages((prev) => [...prev, temp]);

    // Attempt actual send
    try {
      const res = await sendMessageApi({
        senderId: currentUserId,
        receiverId,
        senderRole: role,
        message: text || "",
        fileUrl,
        fileType,
      });
      const saved = res?.data?.data; // unwrap to actual message
      if (saved && saved._id) {
        setMessages((prev) => prev.map((m) => (m._id === tempId ? saved : m)));
      }
    } catch {
      // Mark as failed for retry UI
      setMessages((prev) => prev.map((m) => (m._id === tempId ? { ...m, __failed: true } : m)));
    } finally {
      setIsSending(false);
      refreshConversations();
    }
  }, [activePeerId, currentUserId, role, refreshConversations, activePeer]);

  const retrySend = useCallback(async (tempId) => {
    const msg = messages.find((m) => m._id === tempId && m.__optimistic);
    if (!msg) return;
    setMessages((prev) => prev.map((m) => (m._id === tempId ? { ...m, __failed: false } : m)));
    await send({ text: msg.message, fileUrl: msg.fileUrl, fileType: msg.fileType });
  }, [messages, send]);

  const markActiveThreadAsRead = useCallback(async () => {
    if (!activePeerId || !currentUserId) return;
    await markThreadAsReadApi(currentUserId, activePeerId);
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    refreshConversations();
  }, [activePeerId, currentUserId, refreshConversations]);

  const edit = useCallback(async (messageId, newText) => {
    try {
      const res = await editMessageApi(messageId, newText);
      const updated = res?.data?.data; // unwrap
      if (!updated) return;
      setMessages(prev => prev.map(m => (m._id === messageId ? updated : m)));
      showSuccess("Message edited");
    } catch (err) {
      if (err?.response?.status === 403) {
        showInfo("You cannot edit this message.");
      } else {
        showInfo("Failed to edit message.");
      }
    }
  }, []);

  const remove = useCallback(async (messageId) => {
    try {
      await deleteMessageApi(messageId);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      showSuccess("Message deleted");
    } catch (err) {
      if (err?.response?.status === 403) {
        showInfo("You cannot delete this message.");
      } else {
        showInfo("Failed to delete message.");
      }
    }
  }, []);

  const search = useCallback(async (keyword) => {
    if (!activePeerId || !currentUserId || !keyword?.trim()) return [];
    const res = await searchMessagesApi(currentUserId, activePeerId, keyword.trim());
    return res?.data?.data || []; // unwrap
  }, [activePeerId, currentUserId]);

  // Initial conversations fetch
  useEffect(() => { refreshConversations(); }, [refreshConversations]);

  // Poll conversations so teacher sees new messages in list
  useEffect(() => {
    if (!currentUserId) return;
    const id = setInterval(() => {
      refreshConversations();
    }, 5000);
    return () => clearInterval(id);
  }, [currentUserId, refreshConversations]);

  // Poll active thread and MERGE optimistic messages
  useEffect(() => {
    if (!currentUserId || !activePeerId) return;
    let stopped = false;
    const poll = async () => {
      if (stopped) return;
      try {
        const res = await getThreadApi(currentUserId, activePeerId, { page: 1, limit: 50 });
        const latest = res?.data?.data || []; // unwrap
        setMessages(prev => {
          // Union by id and prefer server versions
          const map = new Map((prev || []).map(m => [String(m._id), m]));
          for (const srv of (latest || [])) map.set(String(srv._id), srv);
          const merged = Array.from(map.values()).sort((a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0));
          // Avoid unnecessary state churn
          if (merged.length === (prev || []).length) {
            let same = true;
            for (let i = 0; i < merged.length; i++) {
              if (JSON.stringify(merged[i]) !== JSON.stringify(prev[i])) { same = false; break; }
            }
            if (same) return prev;
          }
          return merged;
        });
      } catch {}
      if (!stopped) setTimeout(poll, 1000);
    };
    poll();
    return () => { stopped = true; };
  }, [currentUserId, activePeerId]);

  // Auto-mark as read when viewing thread and unread messages to me appear
  useEffect(() => {
    if (!currentUserId || !activePeerId || !messages?.length) return;
    const me = String(currentUserId);
    const hasUnreadToMe = messages.some(m => {
      if (m.read === true) return false;
      const toStu = m.toStudent && String(m.toStudent?._id || m.toStudent) === me;
      const toTeach = m.toTeacher && String(m.toTeacher?._id || m.toTeacher) === me;
      return toStu || toTeach;
    });
    if (hasUnreadToMe) {
      markActiveThreadAsRead(); // will refresh conversations
    }
  }, [messages, currentUserId, activePeerId, markActiveThreadAsRead]);

  const unreadTotal = useMemo(
    () => (conversations || []).reduce((sum, c) => sum + (c?.unreadCount || 0), 0),
    [conversations]
  );

  // getMessageMeta now safely uses activePeer computed above
  const getMessageMeta = useCallback((m) => {
    const me = String(currentUserId || "");
    const senderId =
      (m.senderId && String(m.senderId)) ||
      (m.fromTeacher && String(m.fromTeacher?._id || m.fromTeacher)) ||
      (m.fromStudent && String(m.fromStudent?._id || m.fromStudent)) ||
      "";
    const amISender = senderId === me;
    let senderObj =
      (m.sender && typeof m.sender === "object" && m.sender) ||
      (typeof m.fromTeacher === "object" && m.fromTeacher) ||
      (typeof m.fromStudent === "object" && m.fromStudent) ||
      null;
    if (!senderObj) {
      if (amISender) senderObj = (role === "Student" ? studentUser : user) || null;
      else if (activePeer) senderObj = activePeer;
    }
    return {
      align: amISender ? "right" : "left",
      isMine: amISender,
      senderName: senderObj?.fullname || senderObj?.username || (amISender ? "You" : "User"),
      senderAvatar: senderObj?.avatar || "/avatar.png",
    };
  }, [currentUserId, role, studentUser, user, activePeer]);

  const value = {
    role,
    currentUserId,
    conversations,
    convLoading,
    refreshConversations,

    activePeerId,
    setActivePeerId,
    activePeer,
    messages,
    threadLoading,
    page,
    hasMore,
    isSending,

    openThread,
    loadMore,
    send,
    retrySend,
    edit,
    remove,
    markActiveThreadAsRead,
    search,

    // unified prefs
    isThreadMuted,
    toggleMute,
    getDraftForThread,
    setDraftForThread,
    setLastReadForThread,

    // new pin/block
    getPinnedMessageForThread,
    setPinnedMessageForThread,
    isThreadBlocked,
    toggleBlockThread,

    getMessageMeta,
    unreadTotal,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Add the missing hook export so pages can import { useChat } from this module
export const useChat = () => useContext(ChatContext);


