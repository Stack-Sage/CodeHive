'use client';

import { motion } from 'framer-motion';

import NotifyForm from '../components/comingSoon/NotifyForm';

import About from "../components/comingSoon/About";
import Hero from "../components/comingSoon/Hero";

import SecondPageAbout from '../components/comingSoon/SecondPageAbout';
import LenisWrapper from '../ui/LenisWrapper';
import Image from 'next/image';
import Explore from "../components/comingSoon/Explore";
import Footer from '@/components/comingSoon/Footer';





export default function page() {
    
  

  return (
    <main className="h-fit min-h-screen max-w-screen min-w-screen  relative ">
     
        
          
      <section className="relative h-auto w-full  flex flex-col  scale-100  items-center justify-center">
        <Image width={1920} height={1080}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-20 grayscale blur-[3px] -z-10"
                src="/bg_1.jpg"
                alt="Background image"
              />
    
        <div className="absolute inset-0  "></div>
        <div className="absolute inset-0   "></div>

   
        <motion.div
          className="relative z-10 gap-10 flex flex-col items-center text-center mt-6 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        
          <Explore/>
          {/* <NotifyForm /> */}
          <About />
        
        </motion.div>
      </section>

     <section className="h-fit  w-full  flex relative contrast-150">
  
 
  <div className="justify-center relative  hover:-hue-rotate-30 transition-all duration-500 ease-out top-0 items-center flex   scale-90  mx-auto w-full  flex-col ">
   


  <motion.h1
    className="text-4xl font-bold  text-gray-700  z-10 relative "
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    >
    <SecondPageAbout/>
  </motion.h1>

  </div>

     


</section>

     
        <Footer/>
   
    </main>
  );
}
