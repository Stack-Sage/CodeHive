'use client'
import { useEffect, useRef } from "react";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import gsap from "gsap";

const studentIcons = [
  <FaUserGraduate className="text-blue-500 text-2xl" />,
  <FaUserGraduate className="text-indigo-500 text-2xl" />,
  <FaUserGraduate className="text-purple-500 text-2xl" />,
  <FaUserGraduate className="text-pink-500 text-2xl" />,
  <FaUserGraduate className="text-blue-400 text-2xl" />,
];

const teacherIcons = [
  <FaChalkboardTeacher className="text-purple-500 text-2xl" />,
  <FaChalkboardTeacher className="text-indigo-500 text-2xl" />,
  <FaChalkboardTeacher className="text-blue-500 text-2xl" />,
  <FaChalkboardTeacher className="text-pink-500 text-2xl" />,
  <FaChalkboardTeacher className="text-purple-400 text-2xl" />,
];

export default function About({
  studentPoints = [],
  teacherPoints = [],
}) {
  const studentRef = useRef([]);
  const teacherRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      studentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      teacherRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      className="max-w-7xl overflow-x-hidden text-center mb-10 md:mb-16 py-6 md:py-12 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-pink-200/60 border border-blue-200/40"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        background: "linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)"
      }}
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        About <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-600 via-blue-600 to-indigo-600">CodeHive</span>
      </h3>
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch w-full">
        {/* Student Features */}
        <div className="flex-1 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-4 py-6 mb-8 lg:mb-0">
          <h4 className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
            What Students Get
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentPoints.map((point, idx) => (
              <div
                key={point}
                ref={el => studentRef.current[idx] = el}
                className="flex items-center gap-4 bg-white/60 rounded-xl px-4 py-4 shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer border border-blue-100"
              >
                <span>{studentIcons[idx % studentIcons.length]}</span>
                <span className="text-blue-900 font-medium text-left">{point}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Teacher Features */}
        <div className="flex-1 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-4 py-6">
          <h4 className="text-xl md:text-2xl font-bold text-purple-700 mb-6">
            What Educators Get
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherPoints.map((point, idx) => (
              <div
                key={point}
                ref={el => teacherRef.current[idx] = el}
                className="flex items-center gap-4 bg-white/60 rounded-xl px-4 py-4 shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer border border-purple-100"
              >
                <span>{teacherIcons[idx % teacherIcons.length]}</span>
                <span className="text-purple-900 font-medium text-left">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
