'use client';

import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaLightbulb, FaPeopleCarry, FaTeamspeak, FaUsers } from 'react-icons/fa';

export default function SecondPageAbout() {
  const visionCards = [
    {
      id: 1,
      icon: <FaChalkboardTeacher className="text-3xl sm:text-4xl md:text-5xl text-pink-500" />,
      title: "Empower Mentors",
      description: "Provide a platform for skilled individuals to teach and share knowledge effectively."
    },
    {
      id: 2,
      icon: <FaUsers className="text-3xl sm:text-4xl md:text-5xl text-blue-500" />,
      title: "Connect Learners",
      description: "Help learners discover mentors and 1v1 sessions tailored to their interests."
    },
    {
      id: 3,
      icon: <FaLightbulb className="text-3xl sm:text-4xl md:text-5xl text-purple-500" />,
      title: "Inspire Growth",
      description: "Create a space where every skill, from coding to calligraphy, can flourish."
    },
    {
      id: 4,
      icon: <FaPeopleCarry className="text-3xl sm:text-4xl md:text-5xl text-indigo-500" />,
      title: "Collaborate",
      description: "Connect With Other Educators and Collaborate Together to reach new heigths "
    },
  ];

  return (
    <section className="h-fit w-full snap-start flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-12 py-12 overflow-hidden">
   
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-4 sm:mb-6 max-w-full md:max-w-3xl lg:max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        “Knowledge grows when shared. Every skill you master is a spark waiting to ignite someone else’s journey.”
      </motion.h2>

      <motion.p
        className="text-gray-700 text-center text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-full sm:max-w-2xl md:max-w-3xl px-2 sm:px-0 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        CodeHive is more than a platform. It’s where curiosity meets expertise, learners meet mentors, and every session sparks growth. 
        From coding to chess, art to calligraphy, your skills find a home and a chance to shine.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 max-w-full">
        {visionCards.map((card, idx) => (
          <motion.div
            key={card.id}
            className="flex flex-col items-center lg:w-[20%] lg:h-[40%] md:w-[20%] md:h-[30%] w-[42%] h-[20%] text-center bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg   hover:scale-105 transition-all hover:contrast-125 duration-300 ease-out hover:hue-rotate-15 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.25 }}
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="font-semibold lg:text-lg text-gray-800 text-sm sm:text-base md:text-lg mb-2">{card.title}</h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">{card.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-8 left-1/4 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-pink-400 opacity-20 blur-3xl animate-blob"></div>
   
      <div className="absolute bottom-16 right-1/4 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-blue-400 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
     
      <div className="absolute top-1/3 right-1/3 w-14 sm:w-28 h-14 sm:h-28 rounded-full bg-purple-400 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>


      
    </section>
  );
}
