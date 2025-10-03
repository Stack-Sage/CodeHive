'use client'
import React from "react";

export default function ThreadHeader({
  partner,
  muted = false,
  onToggleMute,
  right,
  // new
  pinnedMessage = "",
  pinned = false,
  onTogglePin,
  blocked = false,
  onToggleBlock,
  onReport,
}) {
  return (
    <div className="border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={partner?.avatar || "/avatar.png"}
              alt={partner?.fullname || partner?.username || "Chat"}
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div className="font-semibold">
              {partner?.fullname || partner?.username || "Chat"}
            </div>
            <button
              onClick={onToggleMute}
              className={`ml-2 text-xs px-2 py-1 rounded border ${muted ? "bg-gray-100 text-gray-600" : "hover:bg-gray-50"}`}
              title="Mute/unmute notifications for this thread"
            >
              {muted ? "Muted" : "Mute"}
            </button>
            <button
              onClick={onTogglePin}
              className="ml-2 text-xs px-2 py-1 rounded border hover:bg-gray-50"
              title="Pin/Unpin message"
            >
              {pinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={onToggleBlock}
              className={`ml-2 text-xs px-2 py-1 rounded border ${blocked ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
              title="Block/unblock this user"
            >
              {blocked ? "Blocked" : "Block"}
            </button>
            <button
              onClick={onReport}
              className="ml-2 text-xs px-2 py-1 rounded border hover:bg-gray-50"
              title="Report this user"
            >
              Report
            </button>
          </div>
          <div className="flex items-center gap-2">{right}</div>
        </div>
      </div>
      {pinnedMessage && (
        <div className="px-4 pb-2">
          <div className="text-xs text-gray-600 bg-gray-50 border rounded-md px-3 py-2">
            <span className="font-medium mr-2">Pinned:</span>
            <span className="line-clamp-2">{pinnedMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
