"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaLock, FaKey, FaFlag } from "react-icons/fa";
import { buttonStyleTwo } from "@/ui/CustomCSS";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        User not found.
      </div>
    );
  }

  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";

  return (
    <section className="max-w-5xl mx-auto p-6 min-h-screen pt-10 flex flex-col gap-6">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.fullname || "User"}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
          <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 shadow-md">
            <FaEdit />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold flex flex-row text-gray-900">{user.fullname}  </h2>
           <p className="text-md italic font-semibold font-sans "> Hourly Rate: {user.price}  </p>
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
              {user._id || "—"}
            </div>
            <div>
              <span className="font-semibold">📅 Joined: </span>
              {joined}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaEdit /> Edit Fullname
        </button>
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaEdit /> Edit Bio
        </button>
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaKey /> Change Password
        </button>
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaLock /> Forgot Password
        </button>
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaTrash /> Delete Profile
        </button>
        <button className={`${buttonStyleTwo} px-4 py-3 bg-black/20 rounded-xl flex items-center gap-2 shadow-lg`}>
          <FaFlag /> Report Flag
        </button>

        <div className="col-span-full text-center text-sm text-gray-600 italic">
          Note: Some actions may not be functional in this demo yet 
        </div>  
        <button className="col-span-full text-center text-lg bg-black/40 rounded-xl px-4 py-4 flex items-center gap-2 shadow-xl text-gray-900 italic"
          onClick={() => router.push('/student')}
        >

          Check other Teachers

        </button>

      </div>
    </section>
  );
};

export default MyProfile;