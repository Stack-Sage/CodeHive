export default function page () {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">CodeHype Documentation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          <strong>CodeHype</strong> is a platform where anyone can share their unique skills, no matter how niche or small. Users can list their skills, set prices for 1-on-1 teaching sessions, and connect with others who want to learn.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc pl-6">
          <li>Skill sharing for all levels and niches</li>
          <li>Set your own price for teaching sessions</li>
          <li>Contact and connect with learners</li>
          <li>Modern, responsive, and elegant UI</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <ol className="list-decimal pl-6">
          <li>Sign up and create your profile</li>
          <li>List your skills and set your teaching price</li>
          <li>Browse available skills or search for something specific</li>
          <li>Contact a teacher to schedule a session</li>
        </ol>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact & Support</h2>
        <p>
          For questions or support, please reach out via the contact form on the landing page or email us at <a href="mailto:support@codehype.com" className="text-blue-600 underline">support@codehype.com</a>.
        </p>
      </section>
    </main>
  );

}