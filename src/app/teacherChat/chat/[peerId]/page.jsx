'use client'
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/context/chat.context";
import { useGlobalContext } from "@/context/global.context";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatThread from "@/components/chat/ChatThread";
import ChatComposer from "@/components/chat/ChatComposer";

export default function TeacherChatPage() {
  const { peerId } = useParams();
  const router = useRouter();
  const { isStuLogin, user } = useGlobalContext();
  const {
    conversations, activePeerId, openThread, hasMore, loadMore,
    messages, send, markActiveThreadAsRead, currentUserId
  } = useChat();

  useEffect(() => {
    // Require teacher login (isStuLogin not true) and user
    if (isStuLogin === true || isStuLogin === "true" || !user?._id) {
      router.replace("/teacherChat/auth/login");
      return;
    }
    if (peerId) {
      openThread(peerId).then(() => markActiveThreadAsRead());
    }
  }, [isStuLogin, user, peerId, openThread, markActiveThreadAsRead, router]);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 0px)" }}>
      <ChatSidebar
        conversations={conversations}
        activePeerId={activePeerId}
        onSelect={(id) => router.push(`/teacherChat/chat/${id}`)}
      />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 12, borderBottom: "1px solid #eee", fontWeight: 600 }}>
          Teacher Chat
        </div>
        <ChatThread
          messages={messages}
          currentUserId={currentUserId}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
        <ChatComposer onSend={send} />
      </main>
    </div>
  );
}
