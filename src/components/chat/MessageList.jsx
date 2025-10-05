'use client'
import React from 'react';

export default function MessageList({ messages, currentUserId }) {
  const formatTime = (ts) => {
    try { return new Date(ts).toLocaleTimeString(); } catch { return ''; }
  };

  return (
    <div className="space-y-3">
      {(messages || []).map((m) => {
        const isMine = String(m.fromUser) === String(currentUserId);
        return (
          <div key={m._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm ${
                isMine
                  ? 'bg-gradient-to-br from-sky-600 to-indigo-600 text-white'
                  : 'bg-white border text-gray-900'
              }`}
            >
              {/* Name small on top */}
              <div className={`text-[11px] opacity-80 mb-1 ${isMine ? 'text-white/90' : 'text-gray-700'}`}>
                {isMine ? "You" : m.fromUser?.fullname || "User"}
              </div>
              
              {/* Text */}
              {m.message && (
                <div className="whitespace-pre-wrap break-words">{m.message}</div>
              )}
              
              {/* Attachment link */}
              {m.fileUrl && (
                <div className="mt-1">
                  <a
                    href={m.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={isMine ? 'underline' : 'text-blue-700 underline hover:text-blue-800'}
                  >
                    View attachment
                  </a>
                </div>
              )}
              
              {/* Time */}
              <div className={`text-[10px] mt-1 opacity-70 ${isMine ? 'text-white/90' : 'text-gray-500'} text-right`}>
                {formatTime(m.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
              