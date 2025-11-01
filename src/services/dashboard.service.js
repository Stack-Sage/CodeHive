import axios from "axios";
import Router from "next/router";

const API_URL = process.env.NEXT_PUBLIC_URL;

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

export const getDashboardStatsApi = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/${userId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const updateDashboardStatsApi = async (userId, update) => {
  try {
    const res = await axios.patch(`${API_URL}/dashboard/${userId}`, update, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const addReviewApi = async (userId, review) => {
  try {
    const res = await axios.post(`${API_URL}/dashboard/${userId}/review`, review, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const addProfileClickApi = async (userId) => {
  try {
    const res = await axios.post(`${API_URL}/dashboard/${userId}/click`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const addSearchAppearanceApi = async (userId) => {
  try {
    const res = await axios.post(`${API_URL}/dashboard/${userId}/search`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const getSiteStatsApi = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/site-stats`, { withCredentials: true });
    return res.data;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};
