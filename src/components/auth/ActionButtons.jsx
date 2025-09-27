"use client";
import React from "react";
import { FaKey, FaLock, FaTrash, FaRunning } from "react-icons/fa";
import { buttonStyleTwo } from "@/ui/CustomCSS";
import ForgetPassword from "./ForgetPassword";

export const ActionButtons = ({
  useLogout,
  deleteProfile,
  setShowPasswordForm,
  showForget,
  setShowForget,
  router,
}) => (
  <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <button
        onClick={() => setShowPasswordForm(true)}
        className={`${buttonStyleTwo} w-full px-6 py-4 bg-indigo-100 text-black rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold`}
      >
        <FaKey /> Change Password
      </button>

      <button
        onClick={() => setShowForget(!showForget)}
        className={`${buttonStyleTwo} w-full px-6 py-4 text-black rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold`}
      >
        <FaLock /> Forgot Password
      </button>

      <button
        onClick={deleteProfile}
        className={`${buttonStyleTwo} w-full px-6 py-4 bg-red-200 text-black rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold`}
      >
        <FaTrash /> Delete Profile
      </button>

      <button
        onClick={useLogout}
        className={`${buttonStyleTwo} w-full px-6 py-4 bg-gray-200 text-black rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold`}
      >
        <FaRunning /> Logout
      </button>

      <button
        className={`${buttonStyleTwo} col-span-full w-full text-center text-lg text-black rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg justify-center hover:scale-105 duration-300 ease-in transition-transform font-semibold bg-white`}
        onClick={() => router.push("/student")}
      >
        Check other Teachers
      </button>
    </div>

    {showForget && <ForgetPassword showModal={showForget} setShowModal={setShowForget} />}
  </div>
);
