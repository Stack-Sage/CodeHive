import { useState, useRef, useEffect, Suspense, lazy } from "react";
import {
  heroButtons,
  studentPoints,
  teacherPoints,
  achievements,
  socialLinks,
  iconMap,
} from "./landingPageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown, FaComments } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

// Lazy load components
const Hero = lazy(() => import("./Hero"));
const Footer = lazy(() => import("./Footer"));
const Explore = lazy(() => import("./Explore"));
const About = lazy(() => import("./About"));
const SecondPageAbout = lazy(() => import("./SecondPageAbout"));
const VisionScroll = lazy(() => import("./VisionScroll"));
const HowItWorks = lazy(() => import("./HowItWorks"));
const DemoVideo = lazy(() => import("./DemoVideo"));
const MorphBlob = lazy(() => import("./MorphBlob"));

// GSAP fade/slide-in hook
function useGsapFadeIn(ref, direction = "y", delay = 0) {
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, [direction]: 40 },
        {
          opacity: 1,
          [direction]: 0,
          duration: 1.2,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [ref, direction, delay]);
}

export default function LandingPage({ user, userRole }) {
  const [aboutTab, setAboutTab] = useState("student");
  const exploreRef = useRef();
  const demoRef = useRef();
  const aboutRef = useRef();
  const secondAboutRef = useRef();
  const footerRef = useRef();
  const howItWorksRef = useRef();

  useGsapFadeIn(exploreRef, "y", 0.1);
  useGsapFadeIn(demoRef, "x", 0.2);
  useGsapFadeIn(howItWorksRef, "y", 0.3);
  useGsapFadeIn(aboutRef, "x", 0.4);
  useGsapFadeIn(secondAboutRef, "y", 0.5);
  useGsapFadeIn(footerRef, "y", 0.7);

  const handleAction = (action) => {
    window.location.href = action;
  };

  const handleVisionCardClick = (card) => {
    alert(card.title + "\n" + card.description);
  };

  // Scroll to HowItWorks section
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col relative bg-gradient-to-br from-indigo-300/50 via-purple-200/30 to-pink-300/30 overflow-x-hidden items-center justify-center ">
      <Suspense fallback={null}>
        <div className="fixed inset-0 z-0 pointer-events-none w-screen">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/40 via-purple-200/30 to-pink-300/40 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-300/40 via-blue-200/30 to-purple-300/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-300/30 via-white/10 to-blue-300/30 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
        </div>
      </Suspense>
      {/* Floating chat/help button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:scale-105 transition-all"
        onClick={() => alert("Need help? Chat coming soon!")}
        aria-label="Help/Chat"
      >
        <FaComments className="text-xl" />
        <span className="hidden md:inline font-bold">Help</span>
      </button>
      {/* Explore + DemoVideo side by side on lg screens */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-0 px-2 md:px-4 mb-8 overflow-x-hidden">
        <div ref={exploreRef} className="flex-1 flex items-center justify-center w-full max-w-2xl lg:justify-end">
          <Suspense fallback={<div className="w-full h-40" />}>
            <Explore
              user={user}
              userRole={userRole}
              heroButtons={heroButtons}
              handleAction={handleAction}
            />
          </Suspense>
        </div>
        <div ref={demoRef} className="flex-1 flex items-center justify-center w-full max-w-2xl lg:justify-start lg:pl-8 mt-8 lg:mt-0">
          <Suspense fallback={<div className="w-full h-40" />}>
            <DemoVideo />
          </Suspense>
        </div>
      </section>
      {/* Scroll Down Indicator */}
      <div
        className="flex flex-col items-center animate-bounce-slow z-10 w-full cursor-pointer"
        onClick={scrollToHowItWorks}
        tabIndex={0}
        role="button"
        aria-label="Scroll Down"
      >
        <span className="text-sm font-semibold text-indigo-600">Scroll Down</span>
        <FaChevronDown className="text-2xl text-indigo-500 mt-1" />
      </div>
      {/* How It Works Section */}
      <section ref={howItWorksRef} className="w-full flex flex-col items-center justify-center py-4 px-2 md:px-4 mb-8 overflow-x-hidden">
        <Suspense fallback={<div className="w-full h-40" />}>
          <HowItWorks />
        </Suspense>
      </section>
      <Suspense fallback={null}>
        <MorphBlob />
      </Suspense>
      {/* VisionScroll Row */}
      <div className="w-full px-2 md:px-4 flex items-center justify-center mb-8 overflow-x-hidden">
        <Suspense fallback={<div className="w-full h-40" />}>
          <VisionScroll onCardClick={handleVisionCardClick} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <MorphBlob />
      </Suspense>
      {/* About Section */}
      <section className="w-full flex flex-col gap-0 items-center justify-center px-2 md:px-4 mb-8 overflow-x-hidden">
        <div ref={aboutRef} className="w-full flex items-center justify-center pt-10">
          <Suspense fallback={<div className="w-full h-40" />}>
            <About
              studentPoints={studentPoints}
              teacherPoints={teacherPoints}
              aboutTab={aboutTab}
              setAboutTab={setAboutTab}
            />
          </Suspense>
        </div>
      </section>
      <Suspense fallback={null}>
        <MorphBlob />
      </Suspense>
      {/* Achievements Section */}
      <section
        ref={secondAboutRef}
        className="w-full flex flex-col items-center justify-center py-8 px-2 md:px-4 mb-8 overflow-x-hidden"
      >
        <Suspense fallback={<div className="w-full h-40" />}>
          <SecondPageAbout achievements={achievements} />
        </Suspense>
      </section>
      {/* Live Demo Button */}
      <div className="flex justify-center mt-2 mb-8 w-full">
        <button
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => window.open("/demo", "_blank")}
        >
          Live Demo
        </button>
      </div>
      <footer ref={footerRef} className="w-full">
        <Suspense fallback={<div className="w-full h-20" />}>
          <Footer
            socialLinks={socialLinks}
            iconMap={iconMap}
          />
        </Suspense>
      </footer>
    </div>
  );
}