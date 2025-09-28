'use client'
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 text-gray-800">

       <button
            onClick={() => router.back()}
            className="text-black z-30 lg:flex-row lg:flex hover:text-indigo-700 cursor-pointer hover:scale-105 duration-300 transition-all ease-out hidden items-center justify-center gap-2 mr-10 text-xl absolute top-10 left-4 font-medium hover:underline "
          >
              <FaBackward/> Go Back 
             </button>

       
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900"> CodeHype Documentation</h1>
    
       
      
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4"> Introduction</h2>
        <p className="mb-3">
          <strong>CodeHype</strong> is more than a platform — it is a movement. 
          Our mission is to empower individuals by turning their unique skills 
          into opportunities for teaching, learning, and earning.
        </p>
        <p>
          Whether your expertise lies in <em>React, chess openings, beatboxing, 
          or latte art</em>, CodeHype is here to help you share and grow.
        </p>
      </section>

     
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">✨ Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>📌 Skill sharing across all domains, big or small</li>
          <li>💰 Set your own price for teaching sessions</li>
          <li>🤝 Direct contact with learners and teachers</li>
          <li>📱 Elegant, modern, and responsive interface</li>
          <li>🔒 Secure payments and trusted community</li>
        </ul>
      </section>

    
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🛠 Getting Started</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Create an account and personalize your profile</li>
          <li>List your skills and set your teaching price</li>
          <li>Browse available skills or search for something specific</li>
          <li>Book a session or connect directly with a teacher</li>
        </ol>
        <aside className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-lg">
          <p><strong>Pro Tip:</strong> Add a short bio and profile picture to build trust with learners ✨</p>
        </aside>
      </section>

 
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
        <ul className="space-y-3">
          <li><strong>Is CodeHype free to join?</strong> – Yes, signing up and browsing is free. We take a small commission per paid session.</li>
          <li><strong>How do I get paid?</strong> – Payments are securely transferred to your linked account after each session.</li>
          <li><strong>Can I cancel a session?</strong> – Yes, with a full refund policy if canceled 24 hours in advance.</li>
        </ul>
      </section>


      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🗺 Roadmap</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>⭐ Skill ratings and reviews system</li>
          <li>🤖 AI-based skill recommendations</li>
          <li>🏆 Gamification badges for active users</li>
          <li>🌍 Multi-language support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">📬 Contact & Support</h2>
        <p>
          Have questions? Need help? Reach us at{" "}
          <a href="mailto:support@codehype.com" className="text-blue-600 underline">
            support@codehype.com
          </a>{" "}
          or via the contact form on our landing page.
        </p>
      </section>
    </main>
  );
}
