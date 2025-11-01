'use client';
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

// You must create this template in your EmailJS dashboard
const EMAILJS_SERVICE_ID = "service_nfq1gql";
const EMAILJS_TEMPLATE_ID = "template_t5ytmg9"; // create this template
const EMAILJS_USER_ID = "Yt7duJ8PkQlj2j1w7";

/**
 * SessionEmail sends a styled session booking email to the educator.
 * 
 * Template variables you should use in EmailJS:
 * - to_email
 * - teacher_name
 * - student_name
 * - topic
 * - skill
 * - rate
 * - message
 * - student_email
 * - student_country
 * - student_profile
 */
export default function SessionEmail({
  toEmail,
  teacherName,
  studentName,
  topic,
  skill,
  rate,
  message,
  studentEmail,
  studentCountry,
  studentProfile,
  onSent
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!toEmail || !teacherName || !studentName || !topic || !skill || !rate) return;

    setStatus("Sending session request email...");
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: toEmail,
          teacher_name: teacherName,
          student_name: studentName,
          topic,
          skill,
          rate,
          message,
          student_email: studentEmail,
          student_country: studentCountry,
          student_profile: studentProfile,
        },
        EMAILJS_USER_ID
      )
      .then(() => {
        setStatus("✅ Session request email sent!");
        if (onSent) onSent();
      })
      .catch(() => setStatus("❌ Failed to send session email"));
    // Only send once per mount
    // eslint-disable-next-line
  }, [toEmail, teacherName, studentName, topic, skill, rate, message, studentEmail, studentCountry, studentProfile]);

  return status ? (
    <div className="mt-4 text-sm text-center">
      <div className={`inline-block px-4 py-2 rounded-lg shadow-lg font-semibold ${status.startsWith("✅") ? "bg-green-100 text-green-700" : status.startsWith("❌") ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
        {status}
      </div>
    </div>
  ) : null;
}
