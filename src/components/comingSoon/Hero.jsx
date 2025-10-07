"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-row items-center justify-center mb-4 md:mb-6 px-2 relative scale-95 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-row items-center gap-2 md:gap-4 justify-center w-full"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative bg-transparent"
        >
          <img
            src="/logo.png"
            alt="CodeHive Logo"
            width={60}
            height={60}
            className="rounded-full bg-transparent object-cover shadow-lg border-2 border-blue-200/30"
          />
        </motion.div>
        <motion.h1
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 mt-0"
        >
          CodeHive
        </motion.h1>
      </motion.div>
    </motion.section>
  );
}

