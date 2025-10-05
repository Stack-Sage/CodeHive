'use client'
import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { getThreadApi, getConversationsApi } from "../services/chat.service";
import { useGlobalContext } from './global.context';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { user, isLogin } = useGlobalContext();

  const [conversations, setConversations] = useState([]);
  const [convLoading, setConvLoading] = useState(false);

  const [activePeerId, setActivePeerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [threadLoading, setThreadLoading] = useState(false);

  // Fetch conversations
  useEffect(() => {
    if (!isLogin || !user?._id) return;
    const fetchConversations = async () => {
      setConvLoading(true);
      try {
        const res = await getConversationsApi(user._id);
        setConversations(res?.data?.data || []);
      } finally {
        setConvLoading(false);
      }
    };
    fetchConversations();
  }, [isLogin, user]);

  // Refs to avoid overlapping requests and to manage polling
  const pollRef = useRef(null);
  const inFlightRef = useRef(false);
  const lastReloadRef = useRef(0);
  const POLL_INTERVAL_MS = 2000; // changed to 2 seconds

  const reloadThread = useCallback(async () => {
    if (!isLogin || !user?._id || !activePeerId) return;
    // Avoid concurrent reloads
    if (inFlightRef.current) return;
    const now = Date.now();
    // minimal guard: ensure at least ~900ms between calls if something tries to call quickly
    if (now - lastReloadRef.current < 800) return;
    inFlightRef.current = true;
    setThreadLoading(true);
    try {
      const res = await getThreadApi(user._id, activePeerId);
      setMessages(res?.data?.data || []);
      lastReloadRef.current = Date.now();
    } catch (err) {
      console.error("reloadThread error:", err);
    } finally {
      setThreadLoading(false);
      inFlightRef.current = false;
    }
  }, [isLogin, user, activePeerId]);

  // Start a single polling interval when activePeerId is set; stop when cleared.
  useEffect(() => {
    // clear any previous poll
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }

    if (!isLogin || !user?._id || !activePeerId) {
      // clear messages on no active peer (optional)
      setMessages([]);
      return;
    }

    // initial load
    reloadThread();

    // start poll (2s)
    pollRef.current = setInterval(() => {
      // if a request is in flight, skip this tick
      if (inFlightRef.current) return;
      reloadThread(); // reloadThread has in-flight & debounce guard
    }, POLL_INTERVAL_MS);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      inFlightRef.current = false;
    };
  }, [isLogin, user, activePeerId, reloadThread]);

  // Keep conversations refreshed when thread changes (optional)
  useEffect(() => {
    if (!isLogin || !user?._id) return;
    const refreshConversations = async () => {
      try {
        const res = await getConversationsApi(user._id);
        setConversations(res?.data?.data || []);
      } catch (e) {
        // ignore
      }
    };
    refreshConversations();
  }, [messages, isLogin, user]);

  const value = {
    conversations,
    convLoading,
    activePeerId,
    setActivePeerId,
    messages,
    threadLoading,
    reloadThread, // expose reloadThread to components
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
