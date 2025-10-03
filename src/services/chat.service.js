import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL;

// Create a message
export const sendMessageApi = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/messages`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch a thread between two users
export const getThreadApi = async (userA, userB, { page = 1, limit = 50, before } = {}) => {
  try {
    const res = await axios.get(`${API_URL}/messages/thread/${userA}/${userB}`, {
      params: { page, limit, before },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching thread:", error.response?.data || error.message);
    throw error;
  }
};

// Conversations list
export const getConversationsApi = async (userId, role) => {
  try {
    const res = await axios.get(`${API_URL}/messages/conversations/${userId}/${role}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
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
    console.error("Error editing message:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a message
export const deleteMessageApi = async (messageId) => {
  try {
    const res = await axios.delete(`${API_URL}/messages/${messageId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
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
    console.error("Error fetching unread count:", error.response?.data || error.message);
    throw error;
  }
};

// Chat history (paged)
export const getChatHistoryApi = async (studentId, teacherId, page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/messages/history/${studentId}/${teacherId}/${page}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching chat history:", error.response?.data || error.message);
    throw error;
  }
};

// Upload an attachment for chat messages (uses backend /api/messages/upload)
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
    console.error("Error uploading chat file:", error.response?.data || error.message);
    throw error;
  }
};
