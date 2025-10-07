'use client'
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  heroButtons,
  studentPoints,
  teacherPoints,
  achievements,
  socialLinks,
  iconMap,
} from "@/components/comingSoon/landingPageContent";


export default function Page() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
     

      {/* Docs Card */}
      <div className="w-full max-w-3xl mx-auto px-4 py-10 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30">
        <button
          onClick={() => router.back()}
          className="text-black z-30 lg:flex-row lg:flex hover:text-indigo-700 cursor-pointer hover:scale-105 duration-300 transition-all ease-out hidden items-center justify-center gap-2 mr-10 text-xl absolute top-10 left-4 font-medium hover:underline"
        >
          <FaBackward /> Go Back
        </button>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center drop-shadow-lg">
          CodeHype Documentation
        </h1>

        {/* Introduction */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Introduction</h2>
          <p className="mb-3 text-lg">
            <strong>CodeHype</strong> is more than a platform — it is a movement.
            Our mission is to empower individuals by turning their unique skills
            into opportunities for teaching, learning, and earning.
          </p>
          <p className="text-lg">
            Whether your expertise lies in <em>React, chess openings, beatboxing,
            or latte art</em>, CodeHype is here to help you share and grow.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-purple-700">✨ Key Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>📌 Skill sharing across all domains, big or small</li>
            <li>💰 Set your own price for teaching sessions</li>
            <li>🤝 Direct contact with learners and teachers</li>
            <li>📱 Elegant, modern, and responsive interface</li>
            <li>🔒 Secure payments and trusted community</li>
          </ul>
        </section>

        {/* Getting Started */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-pink-700">🛠 Getting Started</h2>
          <ol className="list-decimal pl-6 space-y-2 text-lg">
            <li>Create an account and personalize your profile</li>
            <li>List your skills and set your teaching price</li>
            <li>Browse available skills or search for something specific</li>
            <li>Book a session or connect directly with a teacher</li>
          </ol>
          <aside className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-lg text-base">
            <p>
              <strong>Pro Tip:</strong> Add a short bio and profile picture to build trust with learners ✨
            </p>
          </aside>
        </section>

        {/* FAQ */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">❓ Frequently Asked Questions</h2>
          <ul className="space-y-3 text-lg">
            <li><strong>Is CodeHype free to join?</strong> – Yes, signing up and browsing is free. We take a small commission per paid session.</li>
            <li><strong>How do I get paid?</strong> – Payments are securely transferred to your linked account after each session.</li>
            <li><strong>Can I cancel a session?</strong> – Yes, with a full refund policy if canceled 24 hours in advance.</li>
          </ul>
        </section>

        {/* Roadmap */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">🗺 Roadmap</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>⭐ Skill ratings and reviews system</li>
            <li>🤖 AI-based skill recommendations</li>
            <li>🏆 Gamification badges for active users</li>
            <li>🌍 Multi-language support</li>
          </ul>
        </section>

        {/* Features for Students */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Features for Students</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            {studentPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>

        {/* Features for Educators */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Features for Educators</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            {teacherPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>

        {/* Achievements */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-2xl font-bold mb-4 text-pink-700">Platform Achievements</h2>
          <ul className="space-y-3">
            {achievements.map((ach, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className={`inline-block w-3 h-3 rounded-full ${ach.done ? "bg-green-400" : "bg-gray-400"}`}></span>
                <span className="font-semibold">{ach.title}</span>
                <span className="text-gray-600">{ach.desc}</span>
                {ach.done ? (
                  <span className="ml-2 text-green-600 font-bold">✓</span>
                ) : (
                  <span className="ml-2 text-yellow-500 font-bold">Soon</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Social Links */}
        <section className="mb-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow flex gap-6 justify-center">
          {socialLinks.map((link, idx) => (
            <a
              key={link.icon}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
              aria-label={link.icon}
            >
              {iconMap[link.icon]}
            </a>
          ))}
        </section>

        {/* Contact & Support */}
        <section className="mb-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow">
          <h2 className="text-3xl font-bold mb-4 text-pink-700">📬 Contact & Support</h2>
          <p className="text-lg">
            Have questions? Need help? Reach us at{" "}
            <a href="mailto:support@codehype.com" className="text-blue-600 underline">
              support@codehype.com
            </a>{" "}
            or via the contact form on our landing page.
          </p>
        </section>
      </div>
    </main>
  );
}
