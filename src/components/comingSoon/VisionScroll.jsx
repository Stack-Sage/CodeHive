import { useRef, useEffect } from "react";
import gsap from "gsap";
import { visionCards } from "./landingPageContent";

export default function VisionScroll({ onCardClick }) {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(scrollRef.current, {
          xPercent: -33.33, // 1/3 because 3 sets of cards
          repeat: -1,
          duration: 18,
          ease: "linear",
        });
      }, scrollRef);

      return () => ctx.revert();
    }
  }, []);

  // Triple the cards for seamless loop
  const cards = [...visionCards, ...visionCards, ...visionCards];

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-hidden relative py-8 px-2">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 md:gap-10 justify-center not-lg:w-fit max-w-screen overflow-x-hidden items-center"
        style={{ willChange: "transform" }}
      >
        {cards.map((card, idx) => (
          <button
            key={card.id + "-" + idx}
            className="flex-shrink-0 min-w-[180px] max-w-xs w-fit md:w-[260px] h-[180px] sm:h-[220px] bg-gradient-to-br from-white/80 via-blue-100/60 to-purple-100/60 rounded-3xl shadow-2xl border-2 border-blue-200/40 flex flex-col items-center justify-center px-4 py-4 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_8px_32px_rgba(139,92,246,0.25)] active:scale-95"
            onClick={() => onCardClick?.(card)}
            tabIndex={0}
            aria-label={card.title}
          >
            <div className="mb-2 sm:mb-3">{card.icon}</div>
            <div className="font-bold text-base sm:text-lg text-indigo-700 mb-1 sm:mb-2">
              {card.title}
            </div>
            <div className="text-gray-700 text-center text-xs sm:text-sm">
              {card.description}
            </div>
          </button>
        ))}
      </div>

      {/* Gradient fade on edges */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-blue-100/80 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-pink-100/80 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
