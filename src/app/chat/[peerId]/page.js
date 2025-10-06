'use client'

import { useEffect } from "react";
import useUserHook from "@/hooks/useUserHook";
import { useGlobalContext } from "@/context/global.context";
import ChatLayout from "@/components/chat/modern/ChatLayout";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const peerId = params?.peerId;
  const { getUserById } = useUserHook();
  const { visitedUser, setVisitedUser } = useGlobalContext();

  useEffect(() => {
    if (peerId && typeof peerId === "string" && (!visitedUser || visitedUser._id !== peerId)) {
      getUserById(peerId).then(setVisitedUser).catch(() => {});
    }
  }, [peerId, visitedUser, getUserById, setVisitedUser]);

  return (
    <div className="h-screen w-full fixed top-0">
      <ChatLayout currentPeerId={peerId} />
    </div>
  );
}