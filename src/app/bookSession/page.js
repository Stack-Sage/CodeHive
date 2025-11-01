"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/global.context";
import BookSessionTable from "@/components/session/BookSessionTable";
import PaymentMethodModal from "@/components/session/PaymentMethodModal";
import SessionEmail from "@/components/session/SessionEmail";
import { showSuccess, showError } from "@/ui/toast";
import axios from "axios";

export default function BookSessionHistoryPage() {
  const { user } = useGlobalContext();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState(null);
  const [showPayment, setShowPayment] = useState(null);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({ upi: "", bank: "", mobile: "" });
  const [acceptingSession, setAcceptingSession] = useState(null);

  // Load teacher's saved payment method from localStorage (simulate backend persistence)
  useEffect(() => {
    if (user?.roles?.includes("educator")) {
      const saved = localStorage.getItem("teacherPaymentMethod");
      if (saved) setPaymentMethod(JSON.parse(saved));
    }
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return;
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/sessions/history`,
          { withCredentials: true }
        );
        const filtered = (data.data || []).filter(
          (s) =>
            (s.student && (s.student._id === user._id || s.student === user._id)) ||
            (s.teacher && (s.teacher._id === user._id || s.teacher === user._id))
        );
        setSessions(filtered);
      } catch {
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [user?._id]);

  // Handler functions passed to components
  const handleTeacherAccept = (session) => {
    if (!paymentMethod.upi && !paymentMethod.bank && !paymentMethod.mobile) {
      setAcceptingSession(session);
      setShowPaymentMethodModal(true);
      return;
    }
    acceptSessionWithPaymentMethod(session, paymentMethod);
  };

  const acceptSessionWithPaymentMethod = async (session, method) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/sessions/respond/${session._id}`,
      { action: "accept", paymentMethod: method },
      { withCredentials: true }
    );
    setSessions((sessions) =>
      sessions.map(sess =>
        sess._id === session._id ? { ...sess, status: "accepted", teacherPaymentMethod: method } : sess
      )
    );
    setEmailData({
      toEmail: session.student.email,
      teacherName: session.teacher.fullname,
      studentName: session.student.fullname,
      topic: session.topic,
      skill: session.skill,
      rate: session.proposedRate,
      message: session.message,
      studentEmail: session.student.email,
      studentCountry: session.student.country,
      studentProfile: `${window.location.origin}/profile/${session.student._id}`,
    });
    if (user?.roles?.includes("educator")) {
      localStorage.setItem("teacherPaymentMethod", JSON.stringify(method));
      setPaymentMethod(method);
    }
    setShowPaymentMethodModal(false);
    setAcceptingSession(null);
  };

  const handlePayment = async (session) => {
    setShowPayment(session._id);
    try {
      if (!user?._id || !session.teacher?._id) {
        showError("Missing user or teacher information.");
        setShowPayment(null);
        return;
      }
      const baseAmount = Number(session.proposedRate);
      if (!baseAmount || isNaN(baseAmount)) {
        showError("Invalid session rate.");
        setShowPayment(null);
        return;
      }
      const totalAmount = Math.round(baseAmount * 1.05);

      const loadRazorpayScript = () =>
        new Promise((resolve) => {
          if (window.Razorpay) return resolve(true);
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const res = await loadRazorpayScript();
      if (!res) {
        showError("Razorpay SDK failed to load. Are you online?");
        setShowPayment(null);
        return;
      }

      let orderResp;
      try {
        orderResp = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/payments/order`,
          { amount: totalAmount * 100, userId: user._id },
          { withCredentials: true }
        );
      } catch (err) {
        showError(err.response?.data?.message || "Failed to create payment order.");
        setShowPayment(null);
        return;
      }
      const { order } = orderResp.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CodeHive",
        description: `Session Payment to ${session.teacher.fullname}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${process.env.NEXT_PUBLIC_URL}/payments/verify`,
              response,
              { withCredentials: true }
            );
            if (verifyRes.data.success) {
              await axios.post(
                `${process.env.NEXT_PUBLIC_URL}/sessions/pay/${session._id}`,
                { paymentId: order.id },
                { withCredentials: true }
              );
              showSuccess("✅ Payment Successful and Session Confirmed!");
              setSessions((sessions) =>
                sessions.map(sess =>
                  sess._id === session._id ? { ...sess, status: "paid" } : sess
                )
              );
            } else {
              showError("❌ Payment Verification Failed!");
            }
          } catch (err) {
            showError(err.response?.data?.message || "❌ Payment Verification Failed!");
          }
          setShowPayment(null);
        },
        prefill: {
          name: user?.fullname || "",
          email: user?.email || "",
          contact: "",
        },
        theme: { color: "#0f172a" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Payment failed.");
      setShowPayment(null);
    }
  };

  const handleCancel = async (s) => {
    try {
      if (!s?._id) {
        showError("Invalid session.");
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/sessions/cancel/${s._id}`,
        {},
        { withCredentials: true }
      );
      setSessions((sessions) =>
        sessions.filter((sess) => sess._id !== s._id)
      );
      if (res.data?.message) showSuccess(res.data.message);
      if (res.data?.data?.refundAmount) {
        showSuccess(
          `Refund processed: ₹${res.data.data.refundAmount / 100} (${res.data.data.refundType === "half" ? "50%" : "100%"})`
        );
      }
    } catch (err) {
      showError(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading)
    return <div className="p-8 text-blue-600">Loading session history...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-8 w-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Session History</h1>
      <BookSessionTable
        sessions={sessions}
        user={user}
        showPayment={showPayment}
        handlePayment={handlePayment}
        handleCancel={handleCancel}
        handleTeacherAccept={handleTeacherAccept}
        setSessions={setSessions}
      />
      {showPaymentMethodModal && (
        <PaymentMethodModal
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSave={() => acceptSessionWithPaymentMethod(acceptingSession, paymentMethod)}
          onClose={() => {
            setShowPaymentMethodModal(false);
            setAcceptingSession(null);
          }}
        />
      )}
      {emailData && <SessionEmail {...emailData} />}
    </div>
  );
}
