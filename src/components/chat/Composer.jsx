'use client'
import React, { useEffect, useState } from "react";

export default function Composer({
  value,
  onChange,
  onSend,
  isSending,
  placeholder = "Type a message...",
}) {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!value?.trim()) { setTyping(false); return; }
    setTyping(true);
    const id = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <div className="border-t p-3 flex flex-col gap-2">
      {typing && (
        <div className="text-[11px] text-gray-500 animate-pulse px-1">Typing…</div>
      )}
      <div className="flex gap-2">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 h-10 px-3 rounded-md border outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && value.trim() && !isSending) {
              e.preventDefault();
              onSend?.();
            }
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isSending}
          className={`h-10 px-4 rounded-md ${(!value.trim() || isSending) ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
