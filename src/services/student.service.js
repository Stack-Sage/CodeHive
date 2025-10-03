import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL; 

export const registerStudentApi = async (studentData) => {
  try {
    console.log("Registering student with data:");
    for (let [k, v] of studentData.entries()) {
      console.log(k, v);
    }

    const response = await axios.post(`${API_URL}/students/register`, studentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering student:", error.response?.data || error.message);
    throw error;
  }
};

// studentRouter.route("/login").post(loginStudent);
// studentRouter.route("/logout").post(verifyJWT, logoutStudent);


// studentRouter.route("/get/:username").get(getStudentByUsername);



// studentRouter.route("/change-name").patch(verifyJWT, changeName);
// studentRouter.route("/change-email").patch(verifyJWT, changeEmail);
// studentRouter.route("/change-password").patch(verifyJWT, changePassword);
// studentRouter.route("/set-new-password").patch(verifyJWT, setNewPassword);
// studentRouter.route("/change-avatar").patch(verifyJWT, upload.single("avatar"), changeAvatar);

// studentRouter.route("/delete-profile").delete(verifyJWT, deleteProfile);


export const loginStudentApi = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students/login`, studentData, {
      headers: {
        "Content-Type": "application/json",

      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in student:", error);
    throw error;
  }
};


export const logoutStudentApi = async () => {
  try {
    const response = await axios.post(`${API_URL}/students/logout-student`, {}, { 
      withCredentials: true 
    });
    console.log("Logout response:", response);
    return response.data;
  } catch (error) {
    console.error("Error logging out student:", error);
  
    throw error;
  }
};
export const changeFullnameApi = async (fullname) => {
  try {
    const response = await axios.patch(`${API_URL}/students/change-name`, { fullname }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in changeFullnameApi:", error.response?.data || error.message);
    throw error;
  }   
}

export const changeEmailApi = async (email) => {
  try {
    const response = await axios.patch(`${API_URL}/students/change-email`, { email }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in changeEmailApi:", error.response?.data || error.message);
    throw error;
  }   
}

export const changePasswordApi = async (oldPassword, newPassword) => {
  try {
    const response = await axios.patch(`${API_URL}/students/change-password`, { oldPassword, newPassword }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in changePasswordApi:", error.response?.data || error.message);
    throw error;
  }   
}


export const changeAvatarApi = async (avatarFile) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
      const response = await axios.patch(`${API_URL}/students/change-avatar`, formData, { withCredentials: true });
      return response.data;
   } catch (error) {
      console.error("Error in changeAvatarApi:", error.response?.data || error.message);
      throw error;
   }
}

export const deleteProfileApi = async () => {
  try {
    const response = await axios.delete(`${API_URL}/students/delete-profile`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in deleteProfileApi:", error.response?.data || error.message);
    throw error;
  }   
}

export const getStudentByUsernameApi = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/students/get/${username}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error in getStudentByUsernameApi:", error.response?.data || error.message);
    throw error;
  }
}


export const refreshAccessTokenStu = async () => {
  try {
    const response = await axios.get(`${API_URL}/students/refresh-access-token`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data || error.message);
    
    // Only redirect if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Add a small delay to prevent rapid redirects
      setTimeout(() => {
        window.location.href = '/studentChat/auth/login';
      }, 100);
    }
    
    throw error;
  }
};