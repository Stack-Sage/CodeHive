'use client'
import React from "react";

export default function MessageBubble({ msg, currentUserId }) {
  const isMine =
    String(msg.fromStudent || "") === String(currentUserId || "") ||
    String(msg.fromTeacher || "") === String(currentUserId || "");

  const bubbleStyle = {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: 12,
    background: isMine ? "#0a66c2" : "#f2f2f2",
    color: isMine ? "#fff" : "#222",
    wordBreak: "break-word",
  };

  return (
    <div style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start", marginBottom: 8 }}>
      <div style={bubbleStyle}>
        {msg.message && <div style={{ whiteSpace: "pre-wrap" }}>{msg.message}</div>}
        {msg.fileUrl && (
          <div style={{ marginTop: msg.message ? 8 : 0 }}>
            {msg.fileType?.startsWith("image") || msg.fileType === "image" ? (
              <img src={msg.fileUrl} alt="attachment" style={{ maxWidth: "100%", borderRadius: 8 }} />
            ) : (
              <a href={msg.fileUrl} target="_blank" rel="noreferrer" style={{ color: isMine ? "#fff" : "#0a66c2" }}>
                View attachment
              </a>
            )}
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 4, fontSize: 11, opacity: 0.8 }}>
          {new Date(msg.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
