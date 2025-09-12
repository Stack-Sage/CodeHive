'use client';

import { motion } from 'framer-motion';

import NotifyForm from '../components/comingSoon/NotifyForm';

import About from "../components/comingSoon/About";
import Hero from "../components/comingSoon/Hero";

import SecondPageAbout from '../components/comingSoon/SecondPageAbout';
import LenisWrapper from '../ui/LenisWrapper';
import Image from 'next/image';
import Explore from "../components/comingSoon/Explore";



export default function page() {
  
  return (
    <main className="h-full min-h-screen max-w-screen overflow-x-hidden  relative scroll-smooth animate-gradient-x  z-10 ">
      <LenisWrapper>
         
          
      <section className="relative h-screen w-full  flex flex-col  scale-100  items-center justify-center">
        <img
                className="absolute top-0 left-0 w-full h-full object-cover opacity-10 grayscale -z-10"
                src="/bg_2.jpg"
                alt="Background image"
              />
    
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
          <Explore/>
          <NotifyForm />
          <About />
        
        </motion.div>
      </section>

     <section className="min-h-[80vh]  w-full  flex relative contrast-150">
  
 
  <div className="justify-center hover:-hue-rotate-30 transition-all duration-500 ease-out top-0 items-center flex absolute scale-90  mx-auto w-full  flex-col ">
   


  <motion.h1
    className="text-4xl font-bold  text-gray-700 lg:mt-16 z-10 relative "
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    >
    <SecondPageAbout/>
  </motion.h1>

  </div>

     


</section>

     

    </LenisWrapper>
    </main>
  );
}
