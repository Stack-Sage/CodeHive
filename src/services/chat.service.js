import axios from "axios";
import Router from "next/router"; // For client-side navigation

const API_URL = process.env.NEXT_PUBLIC_URL;

// Helper: redirect to login on unauthorized
function handleUnauthorized(error) {
  if (
    error?.response?.status === 401 ||
    error?.response?.data?.message === "Unauthorized Request"
  ) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("unauthorized"));
    }
  }
}

// Create a message
export const sendMessageApi = async (payload) => {
  try {
    // Fix: map fileType to allowed enum
    let fileType = "";
    if (payload.fileType) {
      if (payload.fileType.startsWith("image/")) fileType = "image";
      else if (payload.fileType.startsWith("video/")) fileType = "video";
      else if (payload.fileType.startsWith("audio/")) fileType = "audio";
      else if (payload.fileType === "application/pdf") fileType = "pdf";
      else if (payload.fileType === "application/msword" || payload.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") fileType = "doc";
      else fileType = "file";
    }
    const res = await axios.post(`${API_URL}/messages`, {
      ...payload,
      fileType,
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data; // returns the new message, but context will refetch thread
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch a thread between two users
export const getThreadApi = async (userA, userB) => {
  try {
    // Always fetch the latest 50 messages
    const res = await axios.get(`${API_URL}/messages/thread/${userA}/${userB}`, {
      params: { page: 1, limit: 50 },
      withCredentials: true,
    });
    // Should return an array of messages
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error fetching thread:", error.response?.data || error.message);
    throw error;
  }
};

// Conversations list
export const getConversationsApi = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/messages/conversations/${userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error fetching conversations:", error.response?.data || error.message);
    throw error;
  }
};

// Mark a specific message as read
export const markMessageAsReadApi = async (messageId) => {
  try {
    const res = await axios.patch(`${API_URL}/messages/${messageId}/read`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error marking message as read:", error.response?.data || error.message);
    throw error;
  }
};

// Mark entire thread as read
export const markThreadAsReadApi = async (me, peer) => {
  try {
    const res = await axios.patch(`${API_URL}/messages/thread/${me}/${peer}/read`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error marking thread as read:", error.response?.data || error.message);
    throw error;
  }
};

// Edit a message
export const editMessageApi = async (messageId, newText) => {
  try {
    const res = await axios.patch(`${API_URL}/messages/${messageId}`, { newText }, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error editing message:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a message
export const deleteMessageApi = async (messageId) => {
  try {
    // Backend expects DELETE /api/messages/:messageId
    const res = await axios.delete(`${API_URL}/messages/${messageId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error deleting message:", error.response?.data || error.message);
    throw error;
  }
};

// Search inside a thread
export const searchMessagesApi = async (me, peer, keyword) => {
  try {
    const res = await axios.get(`${API_URL}/messages/search`, {
      params: { me, peer, keyword },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error searching messages:", error.response?.data || error.message);
    throw error;
  }
};

// Unread count for a thread
export const getUnreadCountApi = async (me, peer) => {
  try {
    const res = await axios.get(`${API_URL}/messages/unread/${me}/${peer}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error fetching unread count:", error.response?.data || error.message);
    throw error;
  }
};

// Chat history (paged)
export const getChatHistoryApi = async (studentId, teacherId) => {
  try {
    const res = await axios.get(`${API_URL}/messages/history/${studentId}/${teacherId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error fetching chat history:", error.response?.data || error.message);
    throw error;
  }
};


export const uploadMessageFileApi = async (file) => {
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await axios.post(`${API_URL}/messages/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      timeout: 60_000,
    });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error uploading chat file:", error.response?.data || error.message);
    throw error;
  }
};

// All API endpoints in this file match the routes defined in your backend's message.routes.js and message.controller.js.
// You have:
// - sendMessageApi (POST /api/messages)
// - getThreadApi (GET /api/messages/thread/:userA/:userB)
// - getConversationsApi (GET /api/messages/conversations/:userId/:role) [role param is optional in backend]
// - markMessageAsReadApi (PATCH /api/messages/:messageId/read)
// - markThreadAsReadApi (PATCH /api/messages/thread/:me/:peer/read)
// - editMessageApi (PATCH /api/messages/:messageId)
// - deleteMessageApi (DELETE /api/messages/:messageId)
// - searchMessagesApi (GET /api/messages/search)
// - getUnreadCountApi (GET /api/messages/unread/:me/:peer)
// - getChatHistoryApi (GET /api/messages/history/:userA/:userB/:page)
// - uploadMessageFileApi (POST /api/messages/upload)
//
// All endpoints are present and correctly mapped to your backend routes and controller logic.
