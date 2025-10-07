"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";

export default function LenisWrapper({ children }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2, // Medium scroll speed (higher = slower)
      easing: (t) => 1 - Math.pow(1 - t, 4), // Smooth quart easing for natural feel
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.2, // Keeps mobile scroll balanced
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [enabled]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e?.key?.toLowerCase() === "l" && e.ctrlKey) {
        setEnabled((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled]);

  return <>{children}</>;
}
