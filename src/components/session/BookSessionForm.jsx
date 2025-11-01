'use client';
import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/context/global.context";
import { showSuccess, showError } from "@/ui/toast";
import SessionEmail from "./SessionEmail";
import { useRouter } from "next/navigation";

export default function BookSessionForm({ teacher }) {
  const { user, startChatWithUser } = useGlobalContext();
  const router = useRouter();
  const [form, setForm] = useState({
    topic: "",
    skill: "",
    message: "",
    proposedRate: teacher?.price || "",
  });
  const [proposedDates, setProposedDates] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Prevent booking with self
  if (user?._id === teacher?._id) {
    return (
      <div className="max-w-lg mx-auto bg-white/80 p-6 rounded-2xl shadow-lg text-center text-red-600 font-bold">
        You cannot book a session with yourself.
      </div>
    );
  }

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "proposedRate") {
      if (Number(value) < Number(teacher.price)) {
        showError(`Minimum rate is ₹${teacher.price}`);
        setForm(f => ({ ...f, [name]: teacher.price }));
        return;
      }
    }
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleDateChange = (idx, value) => setProposedDates(dates => dates.map((d, i) => i === idx ? value : d));
  const addDateField = () => setProposedDates(dates => [...dates, ""]);
  const removeDateField = idx => setProposedDates(dates => dates.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/sessions/book/${teacher._id}`,
        { ...form, proposedDates },
        { withCredentials: true }
      );
      showSuccess("Session request sent!");
      setBookingSuccess(true);
      setEmailData({
        toEmail: teacher.email,
        teacherName: teacher.fullname,
        studentName: user.fullname,
        topic: form.topic,
        skill: form.skill,
        rate: form.proposedRate,
        message: form.message,
        studentEmail: user.email,
        studentCountry: user.country,
        studentProfile: `${window.location.origin}/profile/${user._id}`,
      });
    } catch (err) {
      showError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 my-8 flex flex-col gap-6 items-center">
        <div className="text-2xl font-bold text-green-700 mb-2 text-center">
          Session request sent successfully!
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => startChatWithUser(teacher._id)}
          >
            Message Teacher Privately
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => router.push("/bookSession")}
          >
            Visit Session Status
          </button>
        </div>
        {emailData && (
          <SessionEmail {...emailData} />
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-8 my-8 flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
        Book a Session with <span className="text-indigo-600">{teacher.fullname}</span>
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1 text-blue-800">What do you want to learn?</label>
            <input
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="e.g. Python OOPs"
              className="rounded px-3 py-2 border border-blue-200 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-blue-800">Skill/Subject</label>
            <input
              name="skill"
              value={form.skill}
              onChange={handleChange}
              placeholder="e.g. Python"
              className="rounded px-3 py-2 border border-blue-200 w-full"
              required
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-800">Propose Date(s) & Time(s) for Session</label>
          {proposedDates.map((date, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="datetime-local"
                value={date}
                onChange={e => handleDateChange(idx, e.target.value)}
                className="rounded px-3 py-2 border border-blue-200 flex-1"
                required
              />
              {proposedDates.length > 1 && (
                <button type="button" onClick={() => removeDateField(idx)} className="text-red-500 font-bold">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDateField} className="text-blue-600 underline text-sm mt-1">+ Add another date/time</button>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-800">Proposed Rate (per hour)</label>
          <input
            name="proposedRate"
            type="number"
            value={form.proposedRate}
            onChange={handleChange}
            placeholder={`Minimum ₹${teacher.price}`}
            className="rounded px-3 py-2 border border-blue-200 w-full"
            min={teacher.price}
            required
          />
          <span className="text-xs text-gray-500">Minimum: ₹{teacher.price}</span>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-800">Message for the Educator</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write a message for the educator"
            className="rounded px-3 py-2 border border-blue-200 w-full"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Booking..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}
