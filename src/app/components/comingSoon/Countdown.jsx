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
        Mins: Math.floor((difference / 1000 / 60) % 60),
        Sec: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { Days: 0, Hours: 0, Mins: 0, Sec: 0 };
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
    <div className="flex flex-row w-screen  justify-center lg:gap-6 lg:mt-10 mt-4 md:gap-2 gap-0 mx-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className={`relative w-auto h-auto  not-lg:scale-75  flex flex-row items-center justify-center rounded-2xl
          bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition-transform hover:scale-105 duration-300 ease-out
          ${animate[unit] ? " hover:hue-rotate-15 shadow-blue-400/60" : "hover:hue-rotate-30"}`}
        >
       
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 animate-glow"></div>

      
          <div className="relative z-10 flex flex-row gap-2 p-2 items-center justify-center w-auto h-auto rounded-2xl bg-white/70 backdrop-blur-xl">
          
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
