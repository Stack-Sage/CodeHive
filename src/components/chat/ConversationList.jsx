'use client'
import React from "react";

export default function ConversationList({ conversations = [], activePeerId, onSelect }) {
  return (
    <ul className="divide-y">
      {(conversations || []).map((c) => {
        const partnerId = c.partner?._id || c.partner?.id || c.partner?.userId;
        const selected = String(partnerId || "") === String(activePeerId || "");
        return (
          <li
            key={c._id}
            onClick={() => partnerId && onSelect?.(partnerId)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selected ? "bg-gray-50" : ""}`}
          >
            <img
              src={c.partner?.avatar || "/avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">
                  {c.partner?.fullname || c.partner?.username || "Unknown"}
                </span>
                {c.unreadCount > 0 && (
                  <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    {c.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{c.lastMessage || "No messages yet"}</p>
            </div>
            <div className="text-xs text-gray-500">
              {c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleTimeString() : ""}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
