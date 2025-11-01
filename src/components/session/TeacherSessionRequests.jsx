import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/context/global.context";
import { showSuccess, showError } from "@/ui/toast";

export default function TeacherSessionRequests() {
  const { user } = useGlobalContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    axios.get(`${process.env.NEXT_PUBLIC_URL}/sessions/history`, { withCredentials: true })
      .then(res => setRequests((res.data.data || []).filter(s => s.teacher === user._id && s.status === "pending")))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, [user?._id]);

  const handleAccept = async (sessionId, paymentMethod) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/sessions/respond/${sessionId}`, { action: "accept", paymentMethod }, { withCredentials: true });
      showSuccess("Session accepted!");
      setRequests(reqs => reqs.filter(r => r._id !== sessionId));
    } catch {
      showError("Failed to accept session");
    }
  };

  const handleReject = async (sessionId) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/sessions/respond/${sessionId}`, { action: "reject" }, { withCredentials: true });
      showSuccess("Session rejected!");
      setRequests(reqs => reqs.filter(r => r._id !== sessionId));
    } catch {
      showError("Failed to reject session");
    }
  };

  // Optionally: handle propose new date/message

  if (loading) return <div>Loading session requests...</div>;
  if (!requests.length) return <div>No pending session requests.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Session Requests</h2>
      {requests.map(req => (
        <div key={req._id} className="border rounded-lg p-4 mb-4 bg-white/80">
          <div><b>Student:</b> {req.student?.fullname}</div>
          <div><b>Topic:</b> {req.topic}</div>
          <div><b>Skill:</b> {req.skill}</div>
          <div><b>Proposed Dates:</b> {req.proposedDates?.join(", ")}</div>
          <div><b>Message:</b> {req.message}</div>
          {/* Accept/Reject/Message/Propose new date */}
          <div className="mt-2 flex gap-2">
            <button onClick={() => handleAccept(req._id, {/* paymentMethod object here */})} className="bg-green-600 text-white px-3 py-1 rounded">Accept</button>
            <button onClick={() => handleReject(req._id)} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
            {/* Add propose new date/message logic here */}
          </div>
        </div>
      ))}
    </div>
  );
}
