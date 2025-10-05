'use client'
import { useEffect } from "react";
import { getThreadApi } from "@/services/chat.service";
import { normalizeMessage } from "@/utils/chatMessage";

/**
 * useChatPolling
 * Polls the active thread for updates with exponential backoff and cleanup.
 * @param {string} currentUserId
 * @param {string} activePeerId
 * @param {(fn: (prev:any[]) => any[]) => void} setMessages
 */
export const useChatPolling = (currentUserId, activePeerId, setMessages) => {
  useEffect(() => {
    if (!currentUserId || !activePeerId || typeof setMessages !== 'function') return;

    let stopped = false;
    let timeoutId = null;
    let retryCount = 0;
    const maxRetries = 3;

    const schedule = () => {
      const delay = retryCount > 0 ? Math.min(5000 * Math.pow(2, retryCount - 1), 30000) : 2000;
      timeoutId = setTimeout(poll, delay);
    };

    const poll = async () => {
      if (stopped) return;
      try {
        const res = await getThreadApi(currentUserId, activePeerId, { page: 1, limit: 50 });
        const latest = Array.isArray(res?.data?.data) ? res.data.data.map(normalizeMessage) : [];
        retryCount = 0;
        setMessages(prev => {
          if (!Array.isArray(prev)) return latest;
          const map = new Map(prev.map(m => [String(m._id), m]));
          for (const srv of latest) if (srv?._id) map.set(String(srv._id), srv);
          const merged = Array.from(map.values())
            .filter(m => m?._id)
            .sort((a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0));
          if (merged.length === prev.length && merged.every((m, i) => prev[i]?._id === m._id)) return prev;
          return merged;
        });
      } catch {
        retryCount++;
        if (retryCount >= maxRetries) return; // stop after max retries
      }
      if (!stopped) schedule();
    };

    // start
    timeoutId = setTimeout(poll, 1000);

    return () => {
      stopped = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentUserId, activePeerId, setMessages]);
};
