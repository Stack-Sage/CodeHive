"use client";

export default function Hero() {
  return (
    <section className="flex flex-row items-center justify-center mb-4 md:mb-6 px-2 relative scale-95 w-full animate-fadein">
      <div className="flex flex-row items-center gap-2 md:gap-4 justify-center w-full">
        <div className="relative bg-transparent animate-bounce-slow">
          <img
            src="/logo.png"
            alt="CodeHive Logo"
            width={60}
            height={60}
            className="rounded-full bg-transparent object-cover shadow-lg border-2 border-blue-200/30"
          />
        </div>
        <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 mt-0 transition-all duration-700">
          CodeHive
        </h1>
      </div>
    </section>
  );
}


