import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_URL; 

// Helper: redirect to login on unauthorized
function handleUnauthorized(error) {
  if (
    error?.response?.status === 401 ||
    error?.response?.data?.message === "Unauthorized Request"
  ) {
    if (typeof window !== "undefined") {
      // Dispatch a custom event for global handler
      window.dispatchEvent(new Event("unauthorized"));
    }
  }
}

export const everythingOkayApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/everything-okay`);
    return response;
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
};

export const registerUserApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
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
    handleUnauthorized(error);
    console.error("Error in loginUserApi:", error.response?.data || error.message);
    throw error;
  }
};


export const logoutUserApi = async () => {
  try {
    await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
  } catch (error) {
    handleUnauthorized(error);
    // Ignore error, always redirect to login
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

export const getUserByIdApi = async (id) => {
  try {
    console.log("fetching user by id api called with id ",id)
    const response = await axios.get(`${API_URL}/users/get/${id}`,{});
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in getUserByIdApi:", error.response?.data || error.message);
    throw error;
  }
}

export const getAllUserApi = async () =>{
  try {
    const response = await axios.get(`${API_URL}/users/getAll`, {});
    return response.data; 
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in getAllUserApi:", error.response?.data || error.message);
    throw error;
  }
}

export const searchUserApi = async (query) => {
  try {
    const res = await axios.get(`${API_URL}/users/search/${encodeURIComponent(query)}`);
    return res.data?.data ?? res.data; // normalize ApiResponse
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in searchUserApi:", error.response?.data || error.message);
    throw error;
  }
};

export const changeBioApi = async (newBio) => {
  try {
    const response = await axios.patch(`${API_URL}/users/change-bio`, { bio: newBio }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changeBioApi:", error.response?.data || error.message);
    throw error;
  }
};


export const changeAvatarApi = async (avatar) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await axios.patch(
      `${API_URL}/users/change-avatar`,
      formData,
      {
        withCredentials: true,
      
      }
    );
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changeAvatarApi:", error.response?.data || error.message);
    throw error;
  }
};

export const changeFullnameApi = async (newFullname) => {
  try {
    const response = await axios.patch(`${API_URL}/users/change-fullname`, { fullname: newFullname }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changeFullnameApi:", error.response?.data || error.message);
    throw error;
  } 

}

export const changePasswordApi = async (oldPassword, newPassword) => {
  try {

    console.log(oldPassword, newPassword);
    const response = await axios.patch(`${API_URL}/users/change-password`, { oldPassword, newPassword },  { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changePasswordApi:", error.response?.data || error.message);
    throw error;
  }
}


export const changeContactApi = async (newContact) => {
  try {
    const response = await axios.patch(`${API_URL}/users/change-contact`, { contact: newContact }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changeContactApi:", error.response?.data || error.message);
    throw error;
  }
}

export const changeEmailApi = async (newEmail) => {
  try {
    
    const response = await axios.patch(`${API_URL}/users/change-email`, { email: newEmail }, { withCredentials: true });

    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in changeEmailApi:", error.response?.data || error.message);
    throw error;
  }
}



export const enterNewPasswordApi = async (newPassword) => {
  try {
    const response = await axios.patch(`${API_URL}/users/enter-new-password`, { newPassword }, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in enterNewPasswordApi:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteProfileApi = async () => {
  try {
    const response = await axios.delete(`${API_URL}/users/delete-profile`, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
    console.error("Error in deleteProfileApi:", error.response?.data || error.message);
    throw error;
  }
}



