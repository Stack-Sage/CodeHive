'use client'
import React, { useState } from "react";

export default function MessageBubble({ msg, currentUserId, onDelete }) {
  const senderId = msg.fromUser?._id || msg.fromUser;
  const isMine = String(senderId) === String(currentUserId);

  return (
    <div
      className={`flex items-end mb-6 ${isMine ? "justify-end" : "justify-start"} group`}
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Avatar */}
      {isMine ? (
        <>
          <div className="flex flex-col items-end  max-w-[300px] md:max-w-[720px] mr-2 relative">
            <div
              className={`px-5 py-3 rounded-3xl shadow-md break-words transition-transform duration-300 ${
                isMine
                  ? "bg-gradient-to-br from-blue-500/90 via-blue-700/90 to-indigo-700/90 text-white hover:scale-[1.02] transition-all duration-200 ease-in "
                  : "bg-gradient-to-br from-blue-100/90 via-gray-100/90 to-white text-black hover:scale-105 transition-all duration-200 ease-in"
              }`}
              style={{
                borderBottomRightRadius: isMine ? "12px" : "32px",
                borderBottomLeftRadius: isMine ? "32px" : "12px",
                animation: "bubblepop 0.5s cubic-bezier(.4,0,.2,1)",
                maxWidth: "100%",
                wordBreak: "break-word"
              }}
            >
              {msg.message && (
                <div className="whitespace-pre-wrap break-words text-base">{msg.message}</div>
              )}
              {msg.fileUrl && msg.fileType === "image" && (
                <img
                  src={msg.fileUrl}
                  alt="attachment"
                  className="mt-2 rounded-xl max-w-xs max-h-60 shadow"
                  style={{ border: "1px solid #eee" }}
                />
              )}
              {msg.fileUrl && (msg.fileType === "pdf" || msg.fileType === "doc") && (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-white"
                  download
                >
                  Download {msg.fileType.toUpperCase()}
                </a>
              )}
              {msg.fileUrl && !["image", "pdf", "doc"].includes(msg.fileType) && (
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
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-800 justify-end">
              <span>
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </span>
              <span className="text-blue-600 font-semibold  text-lg">✓</span>
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
          <img
            src={msg.fromUser?.avatar || "/avatar.png"}
            alt={msg.fromUser?.fullname || "User"}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow mr-2"
          />
          <div className="flex flex-col items-start max-w-[300px] md:max-w-[700px]  ">
            <div
              className="px-5 py-3 rounded-3xl shadow-md break-words bg-white/90 border font-semibold border-gray-200 text-gray-900 transition-transform duration-300 ease-in hover:scale-[1.02]"
              style={{
                borderBottomRightRadius: "32px",
                borderBottomLeftRadius: "12px",
                animation: "bubblepop 0.5s cubic-bezier(.4,0,.2,1)",
                maxWidth: "100%",
                wordBreak: "break-word"
              }}
            >
              {msg.message && (
                <div className="whitespace-pre-wrap break-words text-base">{msg.message}</div>
              )}
              {msg.fileUrl && msg.fileType === "image" && (
                <img
                  src={msg.fileUrl}
                  alt="attachment"
                  className="mt-2 rounded-xl max-w-xs max-h-60 shadow"
                  style={{ border: "1px solid #eee" }}
                />
              )}
              {msg.fileUrl && (msg.fileType === "pdf" || msg.fileType === "doc") && (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline hover:text-blue-800"
                  download
                >
                  Download {msg.fileType.toUpperCase()}
                </a>
              )}
              {msg.fileUrl && !["image", "pdf", "doc"].includes(msg.fileType) && (
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
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-800">
              <span>
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </span>
              <span className="text-green-600 text-lg">✓</span>
            </div>
          </div>
        </>
      )}
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes bubblepop {
          0% { transform: scale(0.95); opacity: 0.7;}
          80% { transform: scale(1.03);}
          100% { transform: scale(1); opacity: 1;}
        }
        @keyframes deletefade {
          from { opacity: 0; transform: translateX(20px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-deletefade {
          animation: deletefade 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}