"use client";

import React, { useEffect, useState } from "react";
import { getUserByIdApi } from "@/services/user.service";
import { useGlobalContext } from "@/context/global.context";
import { FaEdit, FaTrash, FaLock, FaKey, FaFlag } from "react-icons/fa";
import { buttonStyleTwo } from "@/ui/CustomCSS";

const GetAnyUser = ({ id }) => {
  const { visitedUser, setVisitedUser } = useGlobalContext();
  const [loading, setLoading] = useState(true);

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
    <section className="max-w-5xl mx-auto p-6 min-h-screen pt-10 flex flex-col gap-6">
      {/* Profile Card */}
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.fullname}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
          <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 shadow-md">
            <FaEdit />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900">{user.fullname}</h2>
          <p className="text-gray-600 italic">{user.bio || "No bio added."}</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-800">
            <div>
              <span className="font-semibold">📧 Email: </span>
              {user.email}
              <button className="ml-2 text-indigo-600 hover:text-indigo-800">
                <FaEdit />
              </button>
            </div>
            <div>
              <span className="font-semibold">📞 Contact: </span>
              {user.contact}
              <button className="ml-2 text-indigo-600 hover:text-indigo-800">
                <FaEdit />
              </button>
            </div>
            <div>
              <span className="font-semibold">🆔 User ID: </span>
              {user._id}
            </div>
            <div>
              <span className="font-semibold">📅 Joined: </span>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default GetAnyUser;
