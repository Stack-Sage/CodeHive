'use client'
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { getThreadApi, getConversationsApi } from "../services/chat.service";
import { useGlobalContext } from './global.context';

const ChatContext = createContext(null);

const fetchConversations = async (userId) => {
  const res = await getConversationsApi(userId);
  return res?.data ?? [];
};

const fetchThread = async (userA, userB) => {
  const res = await getThreadApi(userA, userB);
  return res?.data ?? [];
};

export const ChatProvider = ({ children }) => {
  const { user, isLogin } = useGlobalContext();
  const [activePeerId, setActivePeerId] = useState(null);

  // SWR for conversations
  const { data: conversations = [], isLoading: convLoading, mutate: mutateConversations } = useSWR(
    isLogin && user?._id ? ["conversations", user._id] : null,
    () => fetchConversations(user._id),
    { refreshInterval: 10000 }
  );

  // SWR for thread messages (receiver will poll every 2 seconds)
  const { data: messages = [], isLoading: threadLoading, mutate: mutateThread } = useSWR(
    isLogin && user?._id && activePeerId ? ["thread", user._id, activePeerId] : null,
    () => fetchThread(user._id, activePeerId),
    { refreshInterval: 2000 } // receiver will poll for new messages
  );

  // Debug: log messages and activePeerId
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("ChatContext: activePeerId", activePeerId, "messages", messages);
  }

  // Manual reloads for thread/conversations (sender calls after sending)
  const reloadThread = async () => {
    await mutateThread();
    await mutateConversations();
  };

  const value = {
    conversations,
    convLoading,
    activePeerId,
    setActivePeerId,
    messages,
    threadLoading,
    reloadThread,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};


export const useChat = () => useContext(ChatContext);

