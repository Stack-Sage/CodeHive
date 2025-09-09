'use client';

import { motion } from 'framer-motion';

import NotifyForm from "./components/comingSoon/NotifyForm";
import About from "./components/comingSoon/About";
import Hero from "./components/comingSoon/Hero";
import Countdown from "./components/comingSoon/Countdown";
import Footer from "./components/comingSoon/Footer";
import Loader from "./components/comingSoon/Loader";
import LoaderBall from './components/comingSoon/LoaderBall';
import SecondPageAbout from './components/comingSoon/SecondPageAbout';



export default function page() {
  return (
    <main className="h-screen  overflow-y-scroll overflow-x-hidden scroll-smooth snap-y  snap-mandatory   ">

     
      <section className="relative h-screen w-full snap-start flex flex-col  scale-100  items-center justify-center">
 
     
        <div className="absolute inset-0  "></div>
        <div className="absolute inset-0 backdrop-blur-2xl  "></div>

   
        <motion.div
          className="relative z-10 flex flex-col items-center text-center mt-6 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <Countdown targetDate="2025-10-16T00:00:00" />
          <div className="mt-10">
            <Loader />
          </div>
          <NotifyForm />
          <About />
        
        </motion.div>
      </section>

     <section className="h-screen min-w-screen  w-full snap-start flex relative contrast-150">
  
 
  <div className="justify-center hover:-hue-rotate-30 transition-all duration-500 ease-out top-0 items-center flex absolute scale-90  mx-auto w-full  flex-col ">
   


  <motion.h1
    className="text-4xl font-bold  text-gray-700 lg:mt-16 z-10 relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <SecondPageAbout/>
  </motion.h1>

  </div>

 

  {/* Footer */}
  <motion.div
    className="w-full absolute bottom-0 z-10"
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1, ease: 'anticipate' }}
  >
    <Footer />
  </motion.div>

</section>

    </main>
  );
}
