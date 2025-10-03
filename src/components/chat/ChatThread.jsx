'use client'
import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatThread({ messages = [], currentUserId, onLoadMore, hasMore }) {
  const containerRef = useRef(null);
  const topSentinelRef = useRef(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollTop = c.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;
    const el = topSentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onLoadMore();
    }, { threshold: 1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, onLoadMore]);

  return (
    <div ref={containerRef} style={{ flex: 1, overflowY: "auto", padding: 16, background: "#fafafa" }}>
      {hasMore && (
        <div ref={topSentinelRef} style={{ textAlign: "center", color: "#666", padding: "6px 0", fontSize: 12 }}>
          Loading more...
        </div>
      )}
      {messages.map((m) => (
        <MessageBubble key={m._id} msg={m} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
