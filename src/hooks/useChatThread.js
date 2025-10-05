'use client'
import { useCallback, useRef, useState } from "react";
import { getThreadApi } from "@/services/chat.service";
import { normalizeMessage } from "@/utils/chatMessage";

/**
 * useChatThread
 * Manages thread state (open/load) without polling.
 * Keep messages oldest -> newest and expose optimistic helpers.
 */
export const useChatThread = (currentUserId, activePeerId) => {
  const [messages, setMessages] = useState([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [beforeCursor, setBeforeCursor] = useState(null);
  const [afterCursor, setAfterCursor] = useState(null);
  const fetchTokenRef = useRef(0);

  // Merge by _id and sort ascending by createdAt
  const mergeAndSort = useCallback((prev, next) => {
    const map = new Map();
    for (const m of prev || []) if (m?._id) map.set(String(m._id), m);
    for (const m of next || []) if (m?._id) map.set(String(m._id), m);
    const merged = Array.from(map.values())
      .filter(m => m?._id)
      .sort((a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0));
    if (
      merged.length === (prev?.length || 0) &&
      merged.every((m, i) => prev[i]?._id === m._id && (prev[i]?.updatedAt || prev[i]?.createdAt) === (m?.updatedAt || m?.createdAt))
    ) return prev;
    return merged;
  }, []);

  // Open a thread and fetch first page
  const openThread = useCallback(async (peerId) => {
    if (!peerId || !currentUserId) return;
    setThreadLoading(true);
    setHasMore(true);
    setBeforeCursor(null);
    setAfterCursor(null);
    setMessages([]);
    const myToken = ++fetchTokenRef.current;
    try {
      const res = await getThreadApi(currentUserId, peerId, { page: 1, limit: 50 });
      if (myToken !== fetchTokenRef.current) return;
      const list = Array.isArray(res?.data?.data) ? res.data.data.map(normalizeMessage) : [];
      const sorted = list.sort((a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0));
      setMessages(sorted);
      setBeforeCursor(sorted.length ? sorted[0]?.createdAt : null);
      setAfterCursor(sorted.length ? sorted[sorted.length - 1]?.createdAt : null);
      setHasMore(sorted.length === 50);
    } finally {
      if (myToken === fetchTokenRef.current) setThreadLoading(false);
    }
  }, [currentUserId]);

  // Load older messages using before cursor
  const loadMore = useCallback(async () => {
    if (!activePeerId || !currentUserId || !hasMore || !beforeCursor) return;
    setThreadLoading(true);
    const myToken = ++fetchTokenRef.current;
    try {
      const res = await getThreadApi(currentUserId, activePeerId, { limit: 50, before: beforeCursor });
      if (myToken !== fetchTokenRef.current) return;
      const older = Array.isArray(res?.data?.data) ? res.data.data.map(normalizeMessage) : [];
      if (!older.length) { setHasMore(false); return; }
      setMessages(prev => mergeAndSort(prev || [], older));
      setHasMore(older.length === 50);
      setBeforeCursor(older[0]?.createdAt || beforeCursor);
    } finally {
      if (myToken === fetchTokenRef.current) setThreadLoading(false);
    }
  }, [activePeerId, currentUserId, hasMore, beforeCursor, mergeAndSort]);

  // Optimistic helpers
  const appendLocalMessage = useCallback((msg) => {
    if (!msg) return;
    const norm = normalizeMessage(msg);
    setMessages(prev => mergeAndSort(prev || [], [norm]));
    if (norm?.createdAt) setAfterCursor(norm.createdAt);
  }, [mergeAndSort]);

  const updateLocalMessage = useCallback((id, patch) => {
    if (!id) return;
    setMessages(prev => {
      const idx = (prev || []).findIndex(m => String(m?._id) === String(id));
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return mergeAndSort(prev, [next[idx]]);
    });
  }, [mergeAndSort]);

  const removeLocalMessage = useCallback((id) => {
    if (!id) return;
    setMessages(prev => (prev || []).filter(m => String(m?._id) !== String(id)));
  }, []);

  return {
    messages,
    setMessages,
    threadLoading,
    hasMore,
    beforeCursor,
    afterCursor,
    openThread,
    loadMore,
    appendLocalMessage,
    updateLocalMessage,
    removeLocalMessage,
  };
};

// Helper: resolve thread id from Next.js params during refactor ([id] vs [peerId])
export const getThreadIdFromParams = (params) => {
  const id = params?.id ?? params?.peerId ?? null;
  return id != null ? String(id) : null;
};

// Optional: warn if both ids are present and different (helps find conflicting routes)
export const warnRouteParamConflict = (params) => {
  const a = params?.id, b = params?.peerId;
  if (a != null && b != null && String(a) !== String(b)) {
    // eslint-disable-next-line no-console
    console.warn("Route param conflict: 'id' and 'peerId' differ. Unify dynamic folder names to [id].", { id: a, peerId: b });
  }
};