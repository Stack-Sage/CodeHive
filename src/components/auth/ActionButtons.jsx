"use client";
import React from "react";
import { FaKey, FaLock, FaTrash, FaRunning } from "react-icons/fa";
import ForgetPassword from "./ForgetPassword";

export const ActionButtons = ({
  useLogout,
  deleteProfile,
  setShowPasswordForm,
  showForget,
  setShowForget,
  user,
}) => (
  <div className="flex flex-col items-center gap-8 w-full mt-8">
    {/* Main Action Buttons */}
    <div className="flex flex-wrap gap-6 justify-center w-full">
      <button
        onClick={() => setShowPasswordForm(true)}
        className="flex-1 min-w-[180px] max-w-xs px-6 py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 text-black rounded-xl backdrop-blur-md flex items-center justify-center gap-3 shadow hover:shadow-lg hover:bg-blue-200 hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaKey /> Change Password
      </button>
      <button
        onClick={() => setShowForget(!showForget)}
        className="flex-1 min-w-[180px] max-w-xs px-6 py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 text-black rounded-xl backdrop-blur-md flex items-center justify-center gap-3 shadow hover:shadow-lg hover:bg-blue-200 hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaLock /> Forgot Password
      </button>
      {user?.roles?.includes("educator") && (
        <button
          onClick={deleteProfile}
          className="flex-1 min-w-[180px] max-w-xs px-6 py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 text-black rounded-xl backdrop-blur-md flex items-center justify-center gap-3 shadow hover:shadow-lg hover:bg-blue-200 hover:scale-105 transition-all duration-300 font-semibold"
        >
          <FaTrash /> Delete Profile
        </button>
      )}
      <button
        onClick={useLogout}
        className="flex-1 min-w-[180px] max-w-xs px-6 py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 text-black rounded-xl backdrop-blur-md flex items-center justify-center gap-3 shadow hover:shadow-lg hover:bg-blue-200 hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaRunning /> Logout
      </button>
    </div>

    {/* Divider for neat separation */}
    <div className="w-full flex justify-center">
      <div className="h-[2px] w-2/3 bg-indigo-100 rounded-full"></div>
    </div>

    {/* Forget Password Modal */}
    {showForget && <ForgetPassword showModal={showForget} setShowModal={setShowForget} />}
  </div>
);

