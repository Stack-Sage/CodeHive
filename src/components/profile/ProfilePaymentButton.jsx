"use client";
import { FaCalendarPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global.context";

export default function ProfileBookSessionButton({ educator }) {
  const { user } = useGlobalContext();
  const router = useRouter();

  if (!user || !educator || user._id === educator._id || !user.roles.includes("student")) return null;

  return (
    <button
      onClick={() => router.push(`/bookSession/${educator._id}`)}
      className="btn btn-primary flex items-center gap-2"
    >
      <FaCalendarPlus /> Book Session
    </button>
  );
}
