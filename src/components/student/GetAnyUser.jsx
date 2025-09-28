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

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16 min-h-screen flex flex-col gap-14">
      {/* Magical gradient background glow */}


      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200/50 via-purple-200/50 to-pink-100/50 blur-3xl opacity-40"></div>

      {/* Profile Card */}
      <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-10 flex flex-col md:flex-row gap-12 items-center md:items-start min-h-[70vh] border border-white/30">
        
      <button
                onClick={() => router.back()}
                className="text-black absolute left-4  lg:flex-row hidden  lg:flex  hover:text-indigo-900 top-4 cursor-pointer hover:scale-105 duration-300 transition-all ease-out  gap-2    mr-10 text-xl font-medium hover:underline "
              >
          <FaBackward/> 
      </button>
        {/* Avatar with glow */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 w-full h-full rounded-full bg-indigo-500 blur-3xl opacity-30 animate-pulse"></div>
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.fullname}
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-indigo-400/60"
          />
        </div>

        {/* User Details */}
        <div className="flex-1 flex flex-col gap-10">
          {/* Name + Bio */}
          <div>
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-md">
              {user.fullname}
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6 text-base text-gray-800 dark:text-gray-200">
            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <span className="block font-semibold text-indigo-700 dark:text-indigo-400">📧 Email</span>
              <p>{user.email}</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <span className="block font-semibold text-indigo-700 dark:text-indigo-400">📞 Contact</span>
              <p>{user.contact || "Not provided"}</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <span className="block font-semibold text-indigo-700 dark:text-indigo-400">🆔 Hourly Price</span>
              <p className="truncate">{user.price}</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <span className="block font-semibold text-indigo-700 dark:text-indigo-400">📅 Joined</span>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="flex flex-col gap-6 text-center">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white drop-shadow-sm">
          ✨ Recent Activity
        </h3>
        <p className="text-gray-600 dark:text-gray-400 italic">
          No recent activity to show.
        </p>
      </div>
    </section>
  );
};

export default GetAnyUser;
