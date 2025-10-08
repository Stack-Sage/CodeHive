import AnimatedLottieIcon from "./AnimatedLottieIcon";
// import signupAnim from "./lottie/signup.json";
import { FaUserPlus, FaSearch, FaComments, FaRocket } from "react-icons/fa"; // fallback icons

export default function HowItWorks() {
  const steps = [
    {
      // icon: <AnimatedLottieIcon animationData={signupAnim} size={48} />,
      icon: <FaUserPlus className="text-green-500 text-4xl" />,
      title: "Sign Up",
      desc: "Create your free account as a student or educator.",
    },
    {
      // Use fallback icon if exploreAnim is missing
      icon: <FaSearch className="text-purple-500 text-4xl" />,
      title: "Explore",
      desc: "Browse skills, teachers, and connect instantly.",
    },
    {
      icon: <FaComments className="text-pink-500 text-4xl" />,
      title: "Chat & Book",
      desc: "Message, share files, and book 1:1 sessions.",
    },
    {
      icon: <FaRocket className="text-indigo-500 text-4xl" />,
      title: "Grow",
      desc: "Learn, teach, and earn. Track your progress.",
    },
  ];
  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-2 rounded-3xl shadow-xl bg-white/80 backdrop-blur-lg border border-white/30 flex flex-col items-center animate-fadein">
      <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        How CodeHive Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100/60 via-purple-100/40 to-pink-100/60 rounded-2xl shadow-lg p-6 border border-blue-200/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {step.icon}
            <div className="font-bold text-lg text-indigo-700 mt-3 mb-1">
              {step.title}
            </div>
            <div className="text-gray-700 text-center text-sm">
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

