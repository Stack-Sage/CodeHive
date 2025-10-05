'use client'

import { getUserByIdApi } from "@/services/user.service";
import { use,useEffect } from "react";
import useUserHook from "@/hooks/useUserHook";
import { useGlobalContext } from "@/context/global.context";
import ModernChatLayout from "@/components/chat/modern/ChatLayout";
export default function Page({ params }) {

   const { peerId } = params;
   const { getUserById } = useUserHook();
   const { visitedUser } = useGlobalContext();

   useEffect(  () => {
       const fetchUser = async () => {
           const peer = await getUserById(peerId);
           console.log("Fetched user for chat:", peer);
       };
       fetchUser();
   }, [peerId]);

   return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
         <ModernChatLayout currentPeerId={peerId} />
      </div>
   )
}