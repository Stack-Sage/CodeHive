"use client";
import { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [animate, setAnimate] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();

   
      Object.keys(newTime).forEach((key) => {
        if (timeLeft[key] !== newTime[key]) {
          setAnimate((prev) => ({ ...prev, [key]: true }));
          setTimeout(() => {
            setAnimate((prev) => ({ ...prev, [key]: false }));
          }, 600);
        }
      });

      setTimeLeft(newTime);

    
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className={`relative w-28 h-32 flex flex-col items-center justify-center rounded-2xl
          bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition transform hover:scale-105
          ${animate[unit] ? " hover:hue-rotate-15 shadow-blue-400/60" : "hover:hue-rotate-15"}`}
        >
          {/* Neon Glow Border */}
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 animate-glow"></div>

          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full rounded-2xl bg-white/70 backdrop-blur-xl">
          
            <span
              className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent animate-gradient"
            >
              {value}
            </span>
            <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
              {unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
