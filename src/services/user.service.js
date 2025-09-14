import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL; 


export const registerUserApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in registerUserApi:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUserApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error in loginUserApi:", error.response?.data || error.message);
    throw error;
  }
};


export const logoutUserApi = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in logoutUserApi:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserByIdApi = async (id) => {
  try {
    console.log("fetching user by id api called with id ",id)
    const response = await axios.get(`${API_URL}/users/get/${id}`,{});
    return response.data;
  } catch (error) {
    console.error("Error in getUserByIdApi:", error.response?.data || error.message);
    throw error;
  }
}

export const getAllUserApi = async () =>{
  try {
    const response = await axios.get(`${API_URL}/users/getAll`, {});
    return response.data; 
  } catch (error) {
    console.error("Error in getAllUserApi:", error.response?.data || error.message);
    throw error;
  }
}

export const searchUserApi = async (query) => {
  try {
    const res = await axios.get(`${API_URL}/users/search/${encodeURIComponent(query)}`);
    return res.data?.data ?? res.data; // normalize ApiResponse
  } catch (error) {
    console.error("Error in searchUserApi:", error.response?.data || error.message);
    throw error;
  }
};


