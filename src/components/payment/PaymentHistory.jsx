'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/context/global.context";

export default function PaymentHistory() {
  const { user } = useGlobalContext();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/payments/history?userId=${user._id}`
        );
        setPayments(data.payments);
      } catch (err) {
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-slate-900">
        Loading payment history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">💳 Payment History</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-700 rounded-xl">
            <thead className="bg-slate-800 text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount (₹)</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="px-4 py-2">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{p.amount}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      p.status === "success"
                        ? "text-green-400"
                        : p.status === "failed"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </td>
                  <td className="px-4 py-2 text-sm">{p.orderId}</td>
                  <td className="px-4 py-2 text-sm">{p.paymentId || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
