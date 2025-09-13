import { useGlobalContext } from "@/context/global.context";
import { registerUserApi, loginUserApi, logoutUserApi } from "@/services/user.service";
import { getUserByIdApi,getAllUserApi } from "@/services/user.service";
import { showError, showInfo, showSuccess } from "@/ui/toast";
import { useState } from "react";

const useUserHook = () => {

  const { allUser, setAllUser, visitedUser, setVisitedUser } = useGlobalContext()

  const getAllUser = async()=>{
    try {
      const response = await getAllUserApi();
      setAllUser(response.data)
      console.log("all user in hook is ",response.data)
      showInfo("Explore Any Educator Profile");
    } catch (error) {
      showError("Failed to fetch users");
      throw error;
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await getUserByIdApi(id);
      setVisitedUser(response.data)
      console.log("visited user in hook is ",response.data)
      showInfo("Educator Profile Loaded");
      
    } catch (error) {
      showError("Failed to fetch user");
      throw error;
    }
  };

  return { getAllUser, getUserById };
};


export default useUserHook;
