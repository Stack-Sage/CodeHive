'use client'
import React from "react";

export default function MessageBubble({ msg, currentUserId }) {
  const senderId = msg.fromUser?._id || msg.fromUser;
  const isMine = String(senderId) === String(currentUserId);

  return (
    <div className={`flex items-end mb-6 ${isMine ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {isMine ? (
        <>
          {/* Bubble first, then avatar */}
          <div className="flex flex-col items-end max-w-[70%] mr-2">
            <div
              className={`px-5 py-3 rounded-3xl shadow-md break-words ${
                isMine
                  ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
              style={{
                borderBottomRightRadius: isMine ? "12px" : "32px",
                borderBottomLeftRadius: isMine ? "32px" : "12px",
              }}
            >
              {msg.message && (
                <div className="whitespace-pre-wrap break-words text-base">{msg.message}</div>
              )}
              {msg.fileUrl && msg.fileType?.startsWith("image") && (
                <img
                  src={msg.fileUrl}
                  alt="attachment"
                  className="mt-2 rounded-xl max-w-xs max-h-60 shadow"
                  style={{ border: "1px solid #eee" }}
                />
              )}
              {msg.fileUrl && !msg.fileType?.startsWith("image") && (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-white"
                >
                  View attachment
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 justify-end">
              <span>
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </span>
              <span className="text-green-500 text-lg">✓</span>
            </div>
          </div>
          <img
            src={msg.fromUser?.avatar || "/avatar.png"}
            alt={msg.fromUser?.fullname || "User"}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow"
          />
        </>
      ) : (
        <>
          {/* Avatar first, then bubble */}
          <img
            src={msg.fromUser?.avatar || "/avatar.png"}
            alt={msg.fromUser?.fullname || "User"}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow mr-2"
          />
          <div className="flex flex-col items-start max-w-[70%]">
            <div
              className="px-5 py-3 rounded-3xl shadow-md break-words bg-white border border-gray-200 text-gray-900"
              style={{
                borderBottomRightRadius: "32px",
                borderBottomLeftRadius: "12px",
              }}
            >
              {msg.message && (
                <div className="whitespace-pre-wrap break-words text-base">{msg.message}</div>
              )}
              {msg.fileUrl && msg.fileType?.startsWith("image") && (
                <img
                  src={msg.fileUrl}
                  alt="attachment"
                  className="mt-2 rounded-xl max-w-xs max-h-60 shadow"
                  style={{ border: "1px solid #eee" }}
                />
              )}
              {msg.fileUrl && !msg.fileType?.startsWith("image") && (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline hover:text-blue-800"
                >
                  View attachment
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <span>
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </span>
              <span className="text-green-500 text-lg">✓</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}