'use client'

import { getUserByIdApi } from "@/services/user.service";
import { use,useEffect } from "react";
import useUserHook from "@/hooks/useUserHook";
import { useGlobalContext } from "@/context/global.context";
import ChatLayout from "@/components/chat/modern/ChatLayout";
export default function Page() {

   const { getUserById } = useUserHook();
   const { visitedUser } = useGlobalContext();

   // useEffect(  () => {
   //     const fetchUser = async () => {
   //         const peer = await getUserById(peerId);
   //         console.log("Fetched user for chat:", peer);
   //     };
   //     fetchUser();
   // }, [peerId]);

   return (
      <div className="min-h-screen w-full ">
         <ChatLayout currentPeerId={visitedUser?._id} />
      </div>
   )
}

// Renders chat for /chat