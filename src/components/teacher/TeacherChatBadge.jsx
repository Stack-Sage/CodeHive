'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/chat.context";
import { FaRegCommentDots } from "react-icons/fa";

export default function TeacherChatBadge({ className = "" }) {
  const router = useRouter();
  const { unreadTotal } = useChat();

  return (
    <button
      onClick={() => router.push("/teacherChat/chat")}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50 ${className}`}
      title="Open chat"
    >
      <FaRegCommentDots />
      <span>Messages</span>
      {unreadTotal > 0 && (
        <span className="ml-1 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
          {unreadTotal}
        </span>
      )}
    </button>
  );
}
