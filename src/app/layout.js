import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/comingSoon/Footer";
import LenisWrapper from "../ui/LenisWrapper";
import {Toaster} from 'react-hot-toast'
import { GlobalProvider } from "@/context/global.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Code Hive",
  description: "Where Every Small Skill Holds a Great Value",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative w-screen min-h-screen overflow-x-hidden antialiased text-gray-900 contrast-[1.1] font-sans`}
        >

       <div className="fixed  top-10 left-0 w-full h-full  pointer-events-none z-50">

       <Toaster
          position="top-right"
          toastOptions={{
            style: {
              zIndex: 999999,
            },
          }}
          containerStyle={{
            position: "fixed", 
            top: 20,
            right: 20,
          }}
        />
       </div>

        <GlobalProvider>

        <div className="absolute inset-0 -z-10 animate-gradient-magical  opacity-90 " />

        <LenisWrapper>
        

          {children}
          {/* <Footer /> */}
          
         
        </LenisWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
