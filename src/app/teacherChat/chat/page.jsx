'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/chat.context";
import { useGlobalContext } from "@/context/global.context";

export default function TeacherChatListPage() {
  const router = useRouter();
  const { isStuLogin, user } = useGlobalContext();
  const { conversations, unreadTotal, refreshConversations } = useChat();

  // Guard: require teacher (not student) and a logged-in user
  useEffect(() => {
    if (isStuLogin === true || isStuLogin === "true" || !user?._id) {
      router.replace("/teacherChat/auth/login");
    }
  }, [isStuLogin, user, router]);

  useEffect(() => { refreshConversations(); }, [refreshConversations]);

  return (
    <div className="min-h-[calc(100vh-0px)]">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Teacher Chat</h1>
        <span className="text-sm text-gray-600">Unread: {unreadTotal}</span>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        {(!conversations || conversations.length === 0) ? (
          <p className="text-gray-500">No conversations yet.</p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {conversations.map((c) => (
              <li
                key={c._id}
                onClick={() => router.push(`/teacherChat/chat/${c._id}`)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50"
              >
                <img
                  src={c.partner?.avatar || "/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {c.partner?.fullname || c.partner?.username || "Unknown"}
                    </span>
                    {c.unreadCount > 0 && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {c.lastMessage || "No messages yet"}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleTimeString() : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
