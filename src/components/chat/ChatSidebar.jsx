'use client'
import React from "react";

export default function ChatSidebar({ conversations = [], activePeerId, onSelect }) {
  return (
    <aside className="w-80 min-w-[260px] border-r border-gray-200 h-full overflow-y-auto bg-white">
      <div className="p-4 border-b font-semibold">Conversations</div>
      <ul>
        {conversations.map((c) => {
          const partnerId = c.partner?._id;
          const selected = String(partnerId) === String(activePeerId);
          return (
            <li
              key={c._id}
              onClick={() => partnerId && onSelect?.(partnerId)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selected ? "bg-blue-50" : ""}`}
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
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
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
    </aside>
  );
}
           