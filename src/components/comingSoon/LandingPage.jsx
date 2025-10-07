import { useState } from "react";
import {
  heroButtons,
  studentPoints,
  teacherPoints,
  achievements,
  socialLinks,
  iconMap,
} from "./landingPageContent";
import Hero from "./Hero";
import Footer from "./Footer";
import Explore from "./Explore";
import About from "./About";
import SecondPageAbout from "./SecondPageAbout";
import AnimatedSection from "./AnimatedSection";
import Animated3DBackground from "./Animated3DBackground";

export default function LandingPage({ user, userRole }) {
  const [aboutTab, setAboutTab] = useState("student");

  const handleAction = (action) => {
    window.location.href = action;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col relative">
      <Animated3DBackground />
      <AnimatedSection className="w-full flex flex-col items-center justify-center pt-10 pb-8 px-4 md:px-8">
       
        <Explore
          user={user}
          userRole={userRole}
          heroButtons={heroButtons}
          handleAction={handleAction}
        />
      </AnimatedSection>
      <AnimatedSection className="w-full flex flex-col items-center justify-center py-8 px-4 md:px-8">
        <About
          studentPoints={studentPoints}
          teacherPoints={teacherPoints}
          aboutTab={aboutTab}
          setAboutTab={setAboutTab}
        />
      </AnimatedSection>
      <AnimatedSection className="w-full flex flex-col items-center justify-center py-8 px-4 md:px-8">
        <SecondPageAbout achievements={achievements} />
      </AnimatedSection>
      <Footer
        socialLinks={socialLinks}
        iconMap={iconMap}
      />
    </div>
  );
}