export const heroButtons = [
  { label: "Sign Up", action: "/register" },
  { label: "Sign In", action: "/login" },
  { label: "Visit as Guest", action: "/listing" },
];

export const studentPoints = [
  "Explore teachers by expertise.",
  "Direct messaging (text, files, photos).",
  "Real-time notifications.",
  "Access profile, listing, messages pages.",
  "Secure login with token-based encryption.",
];

export const teacherPoints = [
  "Showcase skills, bio, rates, language fluency.",
  "Appear in listing page.",
  "Personalized dashboard: messages, sessions, earnings.",
  "Direct messaging with students.",
  "Future: integrated payment gateway & video calls.",
];

export const achievements = [
  { title: "Chat App", desc: "Real-time messaging with file/photo support.", done: true },
  { title: "Dashboard", desc: "Personalized dashboard for teachers.", done: true },
  { title: "Listings", desc: "Browse and filter teachers by expertise.", done: true },
  { title: "Recommendation System", desc: "Smart suggestions for students.", done: true },
  { title: "Video Calls", desc: "Integrated video sessions (coming soon).", done: false },
  { title: "Payment Gateway", desc: "Secure payments (coming soon).", done: false },
];

export const socialLinks = [
  { icon: "twitter", url: "https://twitter.com" },
  { icon: "linkedin", url: "https://linkedin.com" },
  { icon: "github", url: "https://github.com" },
];

export const iconMap = {
  twitter: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 19c11 0 13-9 13-13v-1a9 9 0 01-2.6.7A4.5 4.5 0 0021 3.5a9 9 0 01-2.9 1.1A4.5 4.5 0 0012 8.5c0 .4 0 .8.1 1.2A12.8 12.8 0 013 4.5a4.5 4.5 0 001.4 6A4.5 4.5 0 012 9.5v.1a4.5 4.5 0 003.6 4.4A4.5 4.5 0 012 14.5a4.5 4.5 0 004.2 3A9 9 0 012 18.5"></path>
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 110 4 2 2 0 010-4z"></path>
    </svg>
  ),
  github: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.4.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2.2-.3-4.5-1.1-4.5-5a4 4 0 011-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a4 4 0 011 2.7c0 3.9-2.3 4.7-4.5 5 .3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z"></path>
    </svg>
  ),
};
