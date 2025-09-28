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
  router,
}) => (
  <div className="flex flex-col gap-6 w-full">
    {/* Main Action Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <button
        onClick={() => setShowPasswordForm(true)}
        className="w-full px-6 py-4 bg-white/20 dark:bg-gray-800/40 text-black rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaKey /> Change Password
      </button>

      <button
        onClick={() => setShowForget(!showForget)}
        className="w-full px-6 py-4 bg-white/20 dark:bg-gray-800/40 text-black rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaLock /> Forgot Password
      </button>

      <button
        onClick={deleteProfile}
        className="w-full px-6 py-4 bg-white/20 dark:bg-gray-800/40 text-black rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaTrash /> Delete Profile
      </button>

      <button
        onClick={useLogout}
        className="w-full px-6 py-4 bg-white/20 dark:bg-gray-800/40 text-black rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
      >
        <FaRunning /> Logout
      </button>
    </div>

    {/* Secondary Action */}
    <div className="flex justify-center lg:justify-start">
      <button
        onClick={() => router.push("/student")}
        className="w-full lg:w-auto px-8 py-4 text-lg text-black rounded-2xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
      >
        Check other Teachers
      </button>
    </div>

    {/* Forget Password Modal */}
    {showForget && <ForgetPassword showModal={showForget} setShowModal={setShowForget} />}
  </div>
);
