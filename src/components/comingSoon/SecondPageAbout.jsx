'use client';

import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaLightbulb, FaPeopleCarry, FaTeamspeak, FaUsers } from 'react-icons/fa';

export default function SecondPageAbout({ achievements = [] }) {
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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full mx-4 flex flex-col items-center justify-center relative px-2 md:px-4 py-8 md:py-12 rounded-3xl shadow-xl
        bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-pink-200/60 backdrop-blur-2xl border border-blue-200/40 max-w-7xl mx-auto mb-10 md:mb-16"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-xl md:text-2xl font-extrabold text-center mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        “Knowledge grows when shared. Every skill you master is a spark waiting to ignite someone else’s journey.”
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-gray-700 text-center text-sm md:text-base mb-6 md:mb-10 max-w-xl mx-auto"
      >
        CodeHive is more than a platform. It’s where curiosity meets expertise, learners meet mentors, and every session sparks growth. 
        From coding to chess, art to calligraphy, your skills find a home and a chance to shine.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              rotateZ: ach.done ? 2 : -2,
              boxShadow: "0 8px 32px 0 rgba(139,92,246,0.18)",
            }}
            className={`relative bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-pink-200/60 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/40 p-6 transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block w-3 h-3 rounded-full ${ach.done ? "bg-green-400" : "bg-yellow-400"} shadow`} />
              <span className="font-bold text-lg text-blue-900">{ach.title}</span>
            </div>
            <div className="text-gray-700">{ach.desc}</div>
            <span className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
