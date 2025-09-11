"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent]  = useState("Notify Me")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;
    setIsSent("Please Wait ... ")
    emailjs
      .send(
        "service_nfq1gql",     
        "template_yzukbeh",    
        {
          email: email,  
          owner_email: "official.adirajpu@gmail.com",  // don't know kanishka's mail
        },
        "Yt7duJ8PkQlj2j1w7"   // for now my public key --    
      )
      .then(
        (res) => {
          console.log("Email sent successfully!", res);
         
          setEmail("");
          setIsSent("Subscribed !!!")
        },
        (err) => {
          console.error("Failed to send email:", err);
          setIsSent("Failed ")
        }
      );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16"
    >
    
      <div className="relative w-72 sm:w-80">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 placeholder-gray-800 text-gray-900 font-medium shadow-md focus:border-blue-400 outline-none transition-all duration-300"
        />
       
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-500/20 via-blue-500/40 to-purple-500/30 opacity-50 blur-xl animate-glow"></div>
      </div>

   
      <button
        type="submit"
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,150,0.5)] transition-all duration-300"
      >
        {isSent}
      </button>
    </form>
  );
}
