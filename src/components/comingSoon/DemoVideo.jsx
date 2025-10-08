import { FaPlayCircle } from "react-icons/fa";

export default function DemoVideo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-2 py-6 md:px-8 md:py-10">
      <div className="relative rounded-3xl shadow-2xl border border-blue-200/40 bg-white/40 backdrop-blur-lg overflow-hidden max-w-2xl w-full mx-auto">
        <video
          src="/demo.mp4"
          controls
          autoPlay
          loop
          muted
          className="rounded-3xl w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[540px] object-cover"
          poster="/demo-poster.png"
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-2 rounded-xl shadow-lg text-white font-bold">
          <FaPlayCircle className="text-xl" />
          <span>Website Demo</span>
        </div>
      </div>
      <div className="mt-2 text-center text-indigo-700 font-semibold text-base md:text-lg">
        See how CodeHive works in action!
      </div>
    </div>
  );
}
