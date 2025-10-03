'use client'
import React from "react";

export default function ChatSidebar({ conversations = [], activePeerId, onSelect }) {
  return (
    <aside style={{ width: 320, minWidth: 260, borderRight: "1px solid #eee", height: "100%", overflowY: "auto" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #eee", fontWeight: 600 }}>Conversations</div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {conversations.map((c) => {
          const selected = String(c._id) === String(activePeerId);
          return (
            <li
              key={c._id}
              onClick={() => onSelect?.(c._id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                cursor: "pointer",
                background: selected ? "#f5f7ff" : "transparent",
                borderBottom: "1px solid #f4f4f4",
              }}
            >
              <img
                src={c.partner?.avatar || "/avatar.png"}
                alt="avatar"
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.partner?.fullname || c.partner?.username || "Unknown"}
                  </span>
                  {c.unreadCount > 0 && (
                    <span style={{ background: "#0a66c2", color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 12 }}>
                      {c.unreadCount}
                    </span>
                  )}
                </div>
                <div style={{ color: "#666", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.lastMessage || "No messages yet"}
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#999" }}>
                {c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleTimeString() : ""}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
