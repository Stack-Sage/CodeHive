'use client'
import React from "react";
import Hero from "./Hero";

const glassyButton = `
  w-full min-w-[180px] sm:w-[320px] lg:w-[380px] mx-auto px-6 py-3 rounded-xl font-semibold shadow-xl
  whitespace-normal break-words
  backdrop-blur-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
  text-white border border-blue-200/40
  transition-all duration-300 ease-in-out
  hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700
  hover:shadow-[0_4px_24px_rgba(139,92,246,0.25)]
  active:scale-95
  focus:ring-2 focus:ring-blue-400
  relative overflow-hidden
  cursor-pointer
`;

const buttonShine = `
  before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/10
  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
`;

export default function Explore({ user, userRole, heroButtons = [], handleAction }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center w-full max-w-4xl min-h-[40vh] py-10 md:py-16 px-2 md:px-8 mx-auto rounded-3xl shadow-2xl
        bg-gradient-to-br from-sky-200/60 via-purple-200/40 to-indigo-200/60
        border border-blue-200/40 transition-all duration-300 animate-fadein
        backdrop-blur-2xl"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <Hero />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent  bg-gradient-to-br from-blue-500 via-indigo-500 to-sky-500 transition-all duration-700 ">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-indigo-600">CodeHive</span>
        </h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-700 text-center max-w-2xl mx-auto transition-all duration-700">
          Discover mentors, learn new skills, and connect with educators. Choose how you want to start your journey!
        </p>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {!user ? (
            heroButtons.map((btn, idx) => (
              <button
                key={btn.label}
                onClick={() => handleAction(btn.action)}
                className={glassyButton + buttonShine + " transition-all duration-300 ease-in-out"}
                style={{ animation: "fadein 0.7s ease-out forwards", animationDelay: `${idx * 100}ms` }}
              >
                <span className="block w-full text-center text-base md:text-lg font-semibold whitespace-normal break-words">
                  {btn.label}
                </span>
              </button>
            ))
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full text-center text-green-600 font-semibold mb-2">
                {userRole === "teacher"
                  ? "You are logged in as Teacher. You can go directly to your Dashboard."
                  : "You are logged in as Student. You can go directly to the Listing page."}
              </div>
              <button
                onClick={() =>
                  handleAction(userRole === "teacher" ? "/dashboard" : "/listing")
                }
                className={glassyButton + buttonShine + " transition-all duration-300 ease-in-out"}
                style={{ animation: "fadein 0.7s ease-out forwards" }}
              >
                <span className="block w-full text-center text-base md:text-lg font-semibold whitespace-normal break-words">
                  {userRole === "teacher" ? "Go to Dashboard" : "Go to Listing"}
                </span>
              </button>
              <button
                onClick={() => handleAction("/login")}
                className={glassyButton + buttonShine + " transition-all duration-300 ease-in-out"}
                style={{ animation: "fadein 0.7s ease-out forwards" }}
              >
                <span className="block w-full text-center text-base md:text-lg font-semibold whitespace-normal break-words">  
                  Login as Different User
                </span>
                 </button>

            </div>
          )}
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute top-10 left-5 md:left-20 w-40 md:w-56 h-40 md:h-56 bg-gradient-to-br from-pink-300/30 via-white/10 to-blue-300/30 rounded-full blur-3xl pointer-events-none transition-all duration-700"></div>
      <div className="absolute bottom-10 right-5 md:right-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-blue-300/30 via-white/10 to-pink-300/30 rounded-full blur-3xl pointer-events-none transition-all duration-700"></div>
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: "radial-gradient(circle at 60% 10%, rgba(255,255,255,0.25) 0%, transparent 70%)"
        }}
      ></div>
    </section>
  );
}

// Add to your global CSS or Tailwind config:
//
// @keyframes fadein {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fadein {
//   animation: fadein 0.7s ease-out forwards;
// }