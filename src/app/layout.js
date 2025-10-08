import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/comingSoon/Footer";
import LenisWrapper from "../ui/LenisWrapper";
import {Toaster} from 'react-hot-toast'
import { GlobalProvider } from "@/context/global.context";
import { ChatProvider } from "@/context/chat.context";
import Navbar from '@/components/student/SearchEducator'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Codehive - Educator Platform for Everyone",
  description: "Where Every Small Skill Holds a Great Value. Learn, grow, and master coding with our expert guides and resources.",
  keywords: ["coding", "programming", "javascript", "react", "python", "next.js", "web development","codehive","codehype","mentorship","learn to code","teach coding","skill sharing","online learning","1v1 sessions","coding community","chatapp","codehive chat","educator platform","learner platform","skill monetization","secure payments","modern interface","responsive design","online tutoring","peer learning","collaborative learning","knowledge sharing","skill development","personal growth","professional development","mentorship programs","teaching platform","learning platform","skill exchange","expert guides","coding resources","developer community","tech education","digital skills","career growth","freelance teaching","side hustle","hobby to income","skill marketplace","talent showcase","skill discovery","learning journey","educator tools","learner tools","interactive learning","customizable sessions","flexible scheduling","skill improvement","continuous learning","tech skills","creative skills","practical skills","life skills","soft skills","hard skills","skill mastery","skill enhancement","skill building","skill sharing economy","skill networking","skill collaboration","skill innovation"],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  authors: [{ name: "Adarsh", url: "https://adarsh-dev11.onrender.com/" }],

  creator: "Adarsh",
  publisher: "codehive",
  applicationName: "Codehive",

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Code Hive - Elevate Your Coding Skills",
    description: "Learn, grow, and master coding with our expert guides and resources.",
    url: "https://codehive.co.in",
    siteName: "codehive",
    images: [
      {
        url: "https://codehive.co.in/cdAbout.png",
        width: 1200,
        height: 630,
        alt: "Code Hive Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codehive - Teaching Platform for Everyone",
    description: "Where Every Small Skill Holds a Great Value",
    images: ["https://codehive.co.in/cdDashboard.png"],
    creator: "@Adirajput018",
    site: "@codehive",

  },
  linkedin:{
    title: "Codehive - Teaching Platform for Everyone",
    description: "Where Every Small Skill Holds a Great Value",
    image: "https://codehive.co.in/cdDashboard.png",  
    url: "https://codehive.co.in",
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative w-screen min-h-screen overflow-x-hidden antialiased text-gray-900 contrast-[1.1] font-sans`}
        >

       <Toaster
          position="top-right"
          
        />
      
        <GlobalProvider>
          <ChatProvider>

        <Navbar/>
        <div className="absolute inset-0 -z-10 animate-gradient-magical w-screen  opacity-90 " />

        <LenisWrapper>
        

          {children}
          {/* <Footer /> */}
          
         
        </LenisWrapper>
          </ChatProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
