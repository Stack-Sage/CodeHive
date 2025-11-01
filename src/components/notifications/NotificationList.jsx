'use client';
import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/notifications`, { withCredentials: true });
        setNotifications(data.notifications || []);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/notifications/${id}/read`, {}, { withCredentials: true });
    setNotifications((prev) => prev.map(n => n._id === id ? { ...n, read: true } : n));
  };

  if (loading) return <div className="p-4">Loading notifications...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white/90 rounded-xl shadow p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <div>No notifications.</div>
      ) : (
        <ul>
          {notifications.map(n => (
            <li key={n._id} className={`mb-2 p-2 rounded ${n.read ? "bg-gray-100" : "bg-blue-100"}`}>
              <div className="flex justify-between items-center">
                <span>{n.message}</span>
                {!n.read && (
                  <button className="text-xs text-blue-700 underline" onClick={() => markAsRead(n._id)}>
                    Mark as read
                  </button>
                )}
              </div>
              {n.link && (
                <a href={n.link} className="text-xs text-blue-500 underline">View</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
