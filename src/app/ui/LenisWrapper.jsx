"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";

export default function LenisWrapper({ children }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 0.8, // fast but still smooth
      easing: (t) => 1 - Math.pow(1 - t, 4), // responsive ease-out
      smooth: true,
      smoothTouch: false, // keep touch devices native
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [enabled]);


  useEffect(() => {
    function handleKey(e) {
      if (e.key.toLowerCase() === "s") {
        setEnabled((prev) => !prev);
        console.log(`[Lenis] Smooth scroll ${!enabled ? "enabled" : "disabled"}`);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled]);

  return <>{children}</>;
}
