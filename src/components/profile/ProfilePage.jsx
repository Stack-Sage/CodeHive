import React from "react";
import { useGlobalContext } from "@/context/global.context";
import { FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/ui/toast";
import { paymentRouter } from "@/app/api/payment/route";
import ProfileBookSessionButton from "./ProfilePaymentButton";

export default function ProfilePage({ educator }) {
  const { user } = useGlobalContext();
  const router = useRouter();

  const handlePayment = async () => {
    if (!user?._id) {
      return showError("Please log in to continue");
    }

    // Redirect to payment page with educator ID as query parameter
    router.push(`/payment?educatorId=${educator._id}`);
  };

  return (
    <div>
      {/* ...existing profile info... */}
      <ProfileBookSessionButton educator={educator} />
      {/* ...existing code... */}
    </div>
  );
}