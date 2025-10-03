'use client'
import { useEffect } from "react";
import { useChat } from "../context/chat.context";

export const useChatContext = () => useChat();

// Auto-open a thread when peerId changes
export const useThread = (peerId) => {
  const { openThread, messages, threadLoading } = useChat();
  useEffect(() => {
    if (peerId) openThread(peerId);
  }, [peerId, openThread]);
  return { messages, threadLoading };
};
