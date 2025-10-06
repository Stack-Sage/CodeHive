import React from "react";
import { FaEnvelope, FaGlobe, FaBirthdayCake, FaUser } from "react-icons/fa";

export default function PeerProfileCard({ user }) {
  if (!user) return null;
  return (
    <div
      className="flex flex-col items-center p-8 gap-6 rounded-2xl   backdrop-blur-md"
      style={{
        animation: "fadein 0.7s cubic-bezier(.4,0,.2,1)",
        minWidth: 280,
        maxWidth: 340,
      }}
    >
      {/* Header */}
      <div className="w-full flex flex-col items-center mb-2">
        <img
          src={user.avatar || "/avatar.png"}
          alt={user.fullname || user.username || "User"}
          loading="lazy"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
        />
        <div className="mt-3 text-xl font-bold text-indigo-700 flex items-center gap-2">
          <FaUser className="text-indigo-400" />
          {user.fullname || user.username}
        </div>
        <div className="text-xs text-gray-500 mt-1">{user.roles?.join(", ")}</div>
      </div>
      {/* Info */}
      <div className="w-full text-sm text-gray-800 space-y-2">
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-400" />
          <span>{user.email}</span>
        </div>
        {user.country && (
          <div className="flex items-center gap-2">
            <FaGlobe className="text-green-400" />
            <span>{user.country}</span>
          </div>
        )}
        {user.dob && (
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-pink-400" />
            <span>DOB: {new Date(user.dob).toLocaleDateString()}</span>
          </div>
        )}
        <div>
          <span className="font-medium">Account Created:</span>{" "}
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </div>
        <div>
          <span className="font-medium">Last Updated:</span>{" "}
          {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}
        </div>
      </div>
      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="w-full">
          <div className="font-semibold text-xs text-gray-700 mb-2">Skills:</div>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium shadow border border-indigo-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* View Profile Button */}
      <button
        className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-100 ring-black/10 ring-1 via-blue-100 to-indigo-50 text-blue-800 font-semibold tracking-tight shadow hover:scale-105 transition-all active:text-blue-600"
        onClick={() => window.open(`/profile/${user._id}`)}
      >
        View Profile
      </button>
      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
