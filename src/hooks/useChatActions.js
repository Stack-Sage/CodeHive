'use client'
import { useCallback, useState } from "react";
import { sendMessageApi, editMessageApi, deleteMessageApi } from "@/services/chat.service";
import { normalizeMessage } from "@/utils/chatMessage";

/**
 * useChatActions
 * Encapsulates chat actions with optimistic updates.
 */
export const useChatActions = ({
  currentUserId,
  activePeerId,
  role,
  activePeer,
  setMessages,
  refreshConversations,
  notifyError,
}) => {
  const [isSending, setIsSending] = useState(false);

  // Send (string or object with {text,fileUrl,fileType})
  const send = useCallback(async (input = {}) => {
    let text = "";
    let fileUrl, fileType;
    if (typeof input === "string") text = input;
    else if (input && typeof input === "object") {
      text = input.text ?? "";
      fileUrl = input.fileUrl;
      fileType = input.fileType;
    }
    const trimmed = String(text ?? "").trim();
    if (!activePeerId || !currentUserId) throw new Error("Missing required IDs for sending message");
    if (!trimmed && !fileUrl) throw new Error("Message content is required");

    setIsSending(true);
    const receiverId = String(activePeer?._id || activePeerId);
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const base = {
      _id: tempId,
      message: trimmed,
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
    const temp = role === "Teacher"
      ? { ...base, fromTeacher: currentUserId, toStudent: receiverId }
      : { ...base, fromStudent: currentUserId, toTeacher: receiverId };
    setMessages(prev => [...(Array.isArray(prev) ? prev : []), temp]);

    try {
      const common = { senderId: currentUserId, receiverId, message: trimmed, text: trimmed, fileUrl, fileType };
      const payload = role === "Teacher"
        ? { ...common, senderRole: "Teacher", fromTeacher: currentUserId, toStudent: receiverId }
        : { ...common, senderRole: "Student", fromStudent: currentUserId, toTeacher: receiverId };

      const res = await sendMessageApi(payload);
      let saved = res?.data?.data;
      if (saved && typeof saved === "object") saved = normalizeMessage(saved);

      if (saved?._id) {
        setMessages(prev => (Array.isArray(prev)
          ? prev.map(m => (m._id === tempId ? saved : m))
          : [saved]));
      } else {
        setMessages(prev => (Array.isArray(prev)
          ? prev.map(m => (m._id === tempId ? { ...m, __failed: true } : m))
          : []));
      }
      refreshConversations?.();
    } catch (error) {
      setMessages(prev => (Array.isArray(prev)
        ? prev.map(m => (m._id === tempId ? { ...m, __failed: true } : m))
        : []));
      notifyError?.(error, "Failed to send message");
      throw error;
    } finally {
      setIsSending(false);
    }
  }, [activePeerId, currentUserId, role, activePeer, setMessages, refreshConversations, notifyError]);

  const retrySend = useCallback(async (tempId) => {
    setMessages(prev => prev.map(m => (m._id === tempId ? { ...m, __failed: false } : m)));
    // find last snapshot of the optimistic message
    let snapshot = null;
    setMessages(prev => {
      snapshot = prev.find(m => m._id === tempId);
      return prev;
    });
    if (!snapshot) return;
    await send({ text: snapshot.message, fileUrl: snapshot.fileUrl, fileType: snapshot.fileType });
  }, [send, setMessages]);

  const edit = useCallback(async (messageId, newText) => {
    try {
      const res = await editMessageApi(messageId, newText);
      const updated = res?.data?.data;
      if (!updated) return;
      setMessages(prev => prev.map(m => (m._id === messageId ? normalizeMessage(updated) : m)));
    } catch (err) {
      notifyError?.(err, "Failed to edit message");
    }
  }, [setMessages, notifyError]);

  const remove = useCallback(async (messageId) => {
    try {
      await deleteMessageApi(messageId);
      setMessages(prev => prev.filter(m => m._id !== messageId));
    } catch (err) {
      notifyError?.(err, "Failed to delete message");
    }
  }, [setMessages, notifyError]);

  return { isSending, send, retrySend, edit, remove };
};
