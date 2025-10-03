'use client'
import React, { useState } from "react";

export default function ChatComposer({ onSend }) {
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const sendNow = () => {
    const payload = { text: text.trim() };
    if (fileUrl) payload.fileUrl = fileUrl;
    if (!payload.text && !payload.fileUrl) return;
    onSend?.(payload);
    setText("");
  };

  return (
    <div style={{ borderTop: "1px solid #eee", padding: 12, display: "flex", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #ddd" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendNow();
          }
        }}
      />
      <input
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        placeholder="Attachment URL (optional)"
        style={{ flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #ddd" }}
      />
      <button
        onClick={sendNow}
        style={{ height: 40, padding: "0 16px", borderRadius: 8, background: "#0a66c2", color: "#fff", border: 0 }}
      >
        Send
      </button>
    </div>
  );
}
