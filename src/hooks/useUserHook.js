import { useGlobalContext } from "@/context/global.context";
import {
  registerUserApi,
  loginUserApi,
  logoutUserApi,
  getUserByIdApi,
  getAllUserApi,
  searchUserApi,
  changeBioApi,
  changeAvatarApi,
  changeFullnameApi,
  changePasswordApi,
  changeContactApi,
  changeEmailApi,
  enterNewPasswordApi,
  deleteProfileApi
} from "@/services/user.service";
import { showError, showInfo, showSuccess } from "@/ui/toast";
import { useState } from "react";

const useUserHook = () => {
  const {
    user, setUser,
    allUser, setAllUser,
    visitedUser, setVisitedUser,
    searchResults, setSearchResults,
    isLogin, setIsLogin
  } = useGlobalContext();

  // Register user
  const registerUser = async (userData) => {
    try {
      const response = await registerUserApi(userData);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Registration successful!");
      return response;
    } catch (error) {
      showError("Registration failed");
      throw error;
    }
  };

  // Login user
  const loginUser = async (userData) => {
    try {
      const response = await loginUserApi(userData);
      setUser(response.user);
      setIsLogin(true);
      localStorage.setItem("user", JSON.stringify(response.user));
      // userRole is now in response.user.userRole (array)
      showSuccess("Login successful!");
      return response;
    } catch (error) {
      showError("Login failed");
      throw error;
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await logoutUserApi();
      setUser(null);
      setIsLogin(false);
      localStorage.removeItem("user");
      showInfo("Logged out");
    } catch (error) {
      showError("Logout failed");
      throw error;
    }
  };

  // Get all users
  const getAllUser = async () => {
    try {
      const response = await getAllUserApi();
      setAllUser(response.data);
      showInfo("Explore Any Educator Profile");
    } catch (error) {
      showError("Failed to fetch users");
      throw error;
    }
  };

  // Get user by ID
  const getUserById = async (id) => {
    if (!id || typeof id !== "string") return null;
    // Guard: only fetch if not already loaded
    if (visitedUser && visitedUser._id === id) return visitedUser;
    try {
      const response = await getUserByIdApi(id);
      localStorage.setItem("visitedUser", JSON.stringify(response.data));
      setVisitedUser(response.data);
      return response.data;
    } catch (error) {
      showError("Failed to fetch user");
      throw error;
    }
  };

  // Search users
  const searchUser = async (query) => {
    try {
      const results = await searchUserApi(query);
      setSearchResults(results);
      showInfo("Search complete");
    } catch (error) {
      showError("Search failed");
      throw error;
    }
  };

  // Profile update functions
  const changeBio = async (bio) => {
    try {
      const response = await changeBioApi(bio);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Bio updated");
    } catch (error) {
      showError("Bio update failed");
      throw error;
    }
  };

  const changeAvatar = async (avatar) => {
    try {
      const response = await changeAvatarApi(avatar);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Avatar updated");
    } catch (error) {
      showError("Avatar update failed");
      throw error;
    }
  };

  const changeFullname = async (fullname) => {
    try {
      const response = await changeFullnameApi(fullname);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Fullname updated");
    } catch (error) {
      showError("Fullname update failed");
      throw error;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await changePasswordApi(oldPassword, newPassword);
      showSuccess("Password updated");
    } catch (error) {
      showError("Password update failed");
      throw error;
    }
  };

  const changeContact = async (contact) => {
    try {
      const response = await changeContactApi(contact);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Contact updated");
    } catch (error) {
      showError("Contact update failed");
      throw error;
    }
  };

  const changeEmail = async (email) => {
    try {
      const response = await changeEmailApi(email);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      showSuccess("Email updated");
    } catch (error) {
      showError("Email update failed");
      throw error;
    }
  };

  const enterNewPassword = async (newPassword) => {
    try {
      await enterNewPasswordApi(newPassword);
      showSuccess("Password reset successful");
    } catch (error) {
      showError("Password reset failed");
      throw error;
    }
  };

  const deleteProfile = async () => {
    try {
      await deleteProfileApi();
      setUser(null);
      setIsLogin(false);
      localStorage.removeItem("user");
      showInfo("Profile deleted");
    } catch (error) {
      showError("Profile deletion failed");
      throw error;
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    getAllUser,
    getUserById,
    searchUser,
    changeBio,
    changeAvatar,
    changeFullname,
    changePassword,
    changeContact,
    changeEmail,
    enterNewPassword,
    deleteProfile,
  };
};

export default useUserHook;
