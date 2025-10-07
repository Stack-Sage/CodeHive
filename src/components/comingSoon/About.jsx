'use client'

import { motion } from "framer-motion";

export default function About({
  studentPoints = [],
  teacherPoints = [],
}) {
  const staggerList = {
    visible: {
      transition: {
        staggerChildren: 0.2 // 200ms between each item
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
      className="w-full mx-auto max-w-7xl text-center mb-10 md:mb-16 px-2 md:px-8 py-6 md:py-12 rounded-3xl shadow-2xl
        bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-pink-200/60 backdrop-blur-2xl border border-blue-200/40"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        About <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-600 via-blue-600 to-indigo-600">CodeHive</span>
      </motion.h3>
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch w-full">
        {/* Student Features */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerList}
          className="flex-1 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-4 py-6 mb-8 lg:mb-0"
        >
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-bold text-blue-700 mb-4"
          >
            What Students Get
          </motion.h4>
          <motion.ul
            variants={staggerList}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {studentPoints.map((point, idx) => (
              <motion.li
                key={point}
                variants={staggerItem}
                transition={{ duration: 0.5, delay: (idx + 1) * 0.2 }}
                className="bg-white/40 backdrop-blur-lg rounded-xl px-4 py-3 shadow-md text-blue-900 font-medium hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        {/* Teacher Features */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerList}
          className="flex-1 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-4 py-6"
        >
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-purple-700 mb-4"
          >
            What Educators Get
          </motion.h4>
          <motion.ul
            variants={staggerList}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {teacherPoints.map((point, idx) => (
              <motion.li
                key={point}
                variants={staggerItem}
                transition={{ duration: 0.5, delay: (idx + 1) * 0.2 }}
                className="bg-white/40 backdrop-blur-lg rounded-xl px-4 py-3 shadow-md text-purple-900 font-medium hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
