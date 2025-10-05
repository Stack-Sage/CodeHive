'use client'
import { useEffect } from "react";
import { useChat } from "../context/chat.context";

// Hook to get chat context
export const useChatContext = () => useChat();

// Hook to auto-load thread messages when peerId changes
export const useThread = (peerId) => {
  const { setActivePeerId, messages, threadLoading } = useChat();
  useEffect(() => {
    if (peerId) setActivePeerId(peerId);
  }, [peerId, setActivePeerId]);
  return { messages, threadLoading };
};
