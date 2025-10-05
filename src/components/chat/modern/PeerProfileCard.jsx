import React from "react";

export default function PeerProfileCard({ user }) {
  if (!user) return null;
  return (
    <div className="flex flex-col items-center p-8 gap-6">
      <img
        src={user.avatar || "/avatar.png"}
        alt={user.fullname || user.username || "User"}
        className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
      />
      <div className="text-center">
        <div className="text-xl font-bold">{user.fullname || user.username}</div>
        <div className="text-sm text-gray-500">{user.bio || "No bio available."}</div>
        {user.country && (
          <div className="mt-2 text-xs text-gray-400">{user.country}</div>
        )}
      </div>
      <button
        className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all"
        onClick={() => window.open(`/profile/${user._id}`, "_blank")}
      >
        View Profile
      </button>
      {/* Add video/call buttons if needed */}
      <div className="flex gap-4 mt-6">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-indigo-100 transition">
          📹
        </button>
        <button className="p-3 rounded-full bg-gray-100 hover:bg-indigo-100 transition">
          📞
        </button>
      </div>
    </div>
  );
}
