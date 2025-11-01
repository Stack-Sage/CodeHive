"use client";
import axios from "axios";

export default function PaymentPage() {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create order from backend
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`,
      { amount: 499 } // Rs.499
    );

    const { order } = data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "CodeHive",
      description: "CodeHive Pro Membership",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify`,
          response
        );

        if (verifyRes.data.success) {
          alert("✅ Payment Successful and Verified!");
        } else {
          alert("❌ Payment Verification Failed!");
        }
      },
      prefill: {
        name: "Adarsh - CodeHive User",
        email: "adarsh@codehive.com",
        contact: "9999999999",
      },
      theme: { color: "#0f172a" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-4">CodeHive Payment Gateway</h1>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
      >
        Pay ₹499
      </button>
    </div>
  );
}
