"use client";

import React, { useEffect, useState } from "react";
import { getUserByIdApi } from "@/services/user.service";
import { useGlobalContext } from "@/context/global.context";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

const GetAnyUser = ({ id }) => {
  const { visitedUser, setVisitedUser } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserByIdApi(id);
        if (response.data) {
          setVisitedUser(response.data);
        }
      } catch (error) {
        console.log("error in fetching user by id ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, setVisitedUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!visitedUser) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        User not found.
      </div>
    );
  }

  const user = visitedUser;
  const isEducator = user.roles?.includes("educator");
  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";
  const updated = user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—";

  return (
    <section className="relative w-full  max-w-6xl 2xl:max-w-8xl mx-auto bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-8 xl:p-20 flex flex-col md:flex-row gap-20 items-center md:items-start border border-indigo-100 min-h-[70vh]">
      {/* Glowing background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-200/30 via-blue-100/20 to-blue-300/20 blur-2xl"></div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute left-4 top-4 text-black hidden lg:flex items-center gap-2 text-xl font-medium hover:underline hover:text-indigo-900 transition-all duration-300"
      >
        <FaBackward />
        Back
      </button>

      {/* Avatar */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <div className="absolute inset-0 rounded-full bg-indigo-400 blur-2xl opacity-30 animate-pulse"></div>
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.fullname || "User"}
          className="relative w-36 h-36 xl:w-56 xl:h-56 rounded-full object-cover shadow-xl ring-4 ring-blue-200"
        />
        {/* Profile Role Badge below avatar */}
        <span
          className={`mt-6 px-10 py-3 rounded-2xl font-bold text-lg shadow-xl border-2 ${
            isEducator
              ? "bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-600 text-white border-indigo-300"
              : "bg-gradient-to-r from-green-400 via-blue-200 to-green-600 text-white border-green-300"
          }`}
          style={{
            letterSpacing: "0.08em",
            boxShadow: "0 4px 24px 0 rgba(60,60,120,0.12)",
          }}
        >
          {isEducator ? "Educator" : "Student"}
        </span>
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col gap-16">
        {/* Grid for fields */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-6 w-full">
          <div className="flex flex-col gap-2 w-full mb-2">
            <label className="font-medium min-w-[110px] text-black mb-1">Name:</label>
            <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{user.fullname}</div>
          </div>
          <div className="flex flex-col gap-2 w-full mb-2">
            <label className="font-medium min-w-[110px] text-black mb-1">Email:</label>
            <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{user.email}</div>
          </div>
          {isEducator && (
            <>
              <div className="flex flex-col gap-2 w-full mb-2">
                <label className="font-medium min-w-[110px] text-black mb-1">Country:</label>
                <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{user.country || "—"}</div>
              </div>
              <div className="flex flex-col gap-2 w-full mb-2">
                <label className="font-medium min-w-[110px] text-black mb-1">Date of Birth:</label>
                <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{user.dob ? new Date(user.dob).toLocaleDateString() : "—"}</div>
              </div>
              <div className="flex flex-col gap-2 w-full mb-2">
                <label className="font-medium min-w-[110px] text-black mb-1">Skills:</label>
                <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || "—")}</div>
              </div>
              <div className="flex flex-col gap-2 w-full mb-2">
                <label className="font-medium min-w-[110px] text-black mb-1">Hourly Rate (₹):</label>
                <div className="w-full bg-white/40 font-semibold rounded-lg px-4 py-2 text-sm text-black">{user.price || "—"}</div>
              </div>
            </>
          )}
        </div>
        {/* Bio stays full width */}
        {isEducator && (
          <div className="flex flex-col gap-4 w-full bg-blue-50/80 backdrop-blur-lg shadow-inner p-5 rounded-2xl mt-2">
            <label className="font-medium text-black mb-1">Bio:</label>
            <div className="w-full min-h-[80px] rounded-xl px-4 py-3 text-black bg-blue-100">{user.bio || "—"}</div>
          </div>
        )}
        {/* Common Info */}
        <div className="grid sm:grid-cols-2 gap-12 text-sm text-black mt-2">
          <div className="bg-blue-50/80 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">📅 Joined: </span>
            {joined}
          </div>
          <div className="bg-blue-50/80 backdrop-blur-lg p-4 rounded-xl shadow-md">
            <span className="font-medium">📝 Last Updated: </span>
            {updated}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAnyUser;
