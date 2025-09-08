
import NotifyForm from "./components/comingSoon/NotifyForm";
import About from "./components/comingSoon/About";
import Hero from "./components/comingSoon/Hero";
import Countdown from "./components/comingSoon/Countdown";
import Footer from "./components/comingSoon/Footer";
import Loader from "./components/comingSoon/Loader";

export default function Home() {
  return (
    <main className="relative  min-h-screen overflow-hidden text-gray-900 flex flex-col items-center justify-center px-6  max-w-screen  contrast-150 ">
    
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/10 animate-gradient-x  "></div>
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/30"></div>

  
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col ">

        <Hero />
      

        <Countdown targetDate="2025-12-31T00:00:00" />
        <div className="mt-10">

        <Loader/>
        </div>
        </div>

   
        <NotifyForm />

     
        <About />

         <Footer/>
      </div>
    </main>
  );
}
