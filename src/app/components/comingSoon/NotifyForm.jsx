"use client";
import { useState } from "react";

export default function NotifyForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks! We’ll notify you at: ${email}`);
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16"
    >
      {/* Input */}
      <div className="relative w-72 sm:w-80">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 placeholder-gray-800 text-gray-900 font-medium shadow-md focus:border-blue-400  outline-none transition-all duration-300"
        />
        {/* Neon border glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-500/20 via-blue-500/40 to-purple-500/30 opacity-50 blur-xl animate-glow"></div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,150,0.5)] transition-all duration-300"
      >
        Notify Me
      </button>
    </form>
  );
}
