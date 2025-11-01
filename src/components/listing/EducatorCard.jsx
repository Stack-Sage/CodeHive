import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global.context";

export default function EducatorCard({ educator }) {
  const router = useRouter();
  const { user } = useGlobalContext();

  return (
    <div className="educator-card">
      {/* Educator information display */}
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <div className="flex items-center gap-4">
          <img
            src={educator.avatar || "/default-avatar.png"}
            alt={educator.fullname}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {educator.fullname}
            </h3>
            <p className="text-sm text-gray-600">{educator.bio}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {educator.role}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                {educator.price ? `₹${educator.price}` : "Free Session"}
              </span>
            </div>
          </div>
        </div>
        {/* Pay / Book Session button */}
        <button
          className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={() => router.push(`/profile/${educator._id}`)}
          disabled={user?._id === educator._id}
        >
          Pay / Book Session
        </button>
      </div>
    </div>
  );
}