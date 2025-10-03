"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBars, FaTimes, FaBackward } from "react-icons/fa";
import Link from "next/link";
import { searchUserApi } from "@/services/user.service";
import { useGlobalContext } from "@/context/global.context";
import LogoutStudent from "./stuAuth/logout";



const Navbar = ({goBack}) => {
  
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const {setSearchResults, isStuLogin, setIsStuLogin} = useGlobalContext();


const handleSearch = async (e) => {
  e.preventDefault();
  const q = query.trim();
  if (!q) return;

  try {
    const res = await searchUserApi(q);          
    const users = res?.data ?? res;        
    setSearchResults(Array.isArray(users) ? users : []);   
    
      console.log("search result is", users);

      router.push(`/student/searchResult`);


  } catch (error) {
    console.error("Search error:", error);
    setSearchResults([]);
  } finally {
    setQuery("");
    setMenuOpen(false);
  }
};


  return (
    <nav className="w-full sticky top-0 z-50 bg-black/20 backdrop-blur-3xl hover:bg-white/20 transition-all duration-300 ease-in-out  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
        
          {goBack && (
            <button
              onClick={() => router.back()}
              className="text-black lg:flex-row lg:flex hover:text-blue-700 cursor-pointer hover:scale-105 duration-300 transition-all ease-out hidden left-0 mr-10 text-xl font-medium hover:underline "
            >
                <FaBackward/> 
            </button>
          )}
     
          <div className=" flex-shrink-0 lg:text-2xl tracking-tighter text-lg md:tracking-tight lg:tracking-wider font-extrabold text-black cursor-pointer">

            <Link href="/">CodeHive</Link>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for Educators or Topics "
                className="w-full rounded-full px-4 py-2 pr-12 text-gray-800 focus:outline-none shadow-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-black p-2 rounded-full"
              >
                <FaSearch size={16} />
              </button>
            </div>
          </form>

 
          <div className="hidden sm:flex space-x-6 text-black font-medium items-center">
            <Link href="/docs" className="hover:text-blue-900  hover:underline transition ">
              Docs
            </Link>
            <Link href="/studentChat/stuProfile" className="hover:text-blue-900  hover:underline   transition">
              Profile
            </Link>

           { isStuLogin === "true" ? (
      
              <LogoutStudent />

            ) : (
              <Link href="/studentChat/auth/register" className="hover:text-blue-900 hover:underline transition">
                SignIn
              </Link>
            )}
         
          </div>

          <div className="sm:hidden flex items-center">
              
          <form onSubmit={handleSearch} className="relative mx-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Educator/Topic"
              className="w-full rounded-full px-4 py-2 pr-12 text-gray-800 focus:outline-none shadow-md"
            />
            <button
              type="submit"
              className="absolute right-2   top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full"
            >
              <FaSearch size={16} />
            </button>
          </form>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >

              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
            
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 pt-2 flex flex-col gap-3   shadow-md">
       

          <div className="flex flex-col items-center justify-between gap-3 text-black font-medium">
            <Link href="/docs" onClick={() => setMenuOpen(false)} className="hover:text-gray-700 transition">
              Docs
            </Link>
            <Link href="/studentChat/stuProfile" onClick={() => setMenuOpen(false)} className="hover:text-gray-700 transition">
              Profile
            </Link>
            { isStuLogin === "true" ? (
            
              <LogoutStudent />
       
            ) : (
              <Link href="/studentChat/auth/register" className="hover:text-blue-900 hover:underline transition">
                SignIn
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
