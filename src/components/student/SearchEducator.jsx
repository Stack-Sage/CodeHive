"use client";
import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSearch, FaBars, FaTimes, FaBackward, FaBell, FaMoneyBillWave, FaEnvelope, FaUser, FaBook, FaRunning, FaListAlt, FaTachometerAlt, FaRegistered, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { searchUserApi } from "@/services/user.service";
import { useGlobalContext } from "@/context/global.context";
import { showInfo } from "@/ui/toast";

const ICON_STYLE = "text-lg md:text-xl rounded-full p-2 transition-all duration-200 shadow-sm border border-blue-100 bg-white/60 backdrop-blur hover:bg-blue-50 hover:shadow-lg hover:scale-110 active:bg-blue-400";
const ACTIVE_ICON_STYLE = "text-lg md:text-xl rounded-full p-2 transition-all duration-200 shadow-md border-2 border-blue-100 bg-blue-400 backdrop-blur ";

const NAV_ITEMS = [
  { name: "Docs", href: "/docs", icon: <FaBook />, aria: "Documentation" },
  { name: "Messages", href: "/chat", icon: <FaEnvelope />, aria: "Messages" },
  { name: "Payments ", href: "/payment/history", icon: <FaMoneyBillWave />, aria: "Payments" },
  { name: "Book Session", href: "/bookSession", icon: <FaCalendarAlt />, aria: "Book Session" },
  { name: "Profile", href: "/profile", icon: <FaUser />, aria: "Profile", auth: true },
  { name: "Logout", href: "/logout", icon: <FaRunning />, auth: true, aria: "Logout" },
  { name: "LogIn", href: "/login", icon: <FaRegistered />, auth: false, aria: "Log In" }
];

const Navbar = ({ goBack }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchResults, isLogin, user } = useGlobalContext();

  const isStudent = isLogin && Array.isArray(user?.roles) && user?.roles.includes("student");
  const isTeacher = isLogin && Array.isArray(user?.roles) && (user?.roles.includes("teacher") || user?.roles.includes("educator"));
  const isGuest = !isLogin && user?.roles?.includes("guest");

  const navItems = [
    { name: "Educators", href: "/listing", icon: <FaListAlt />, aria: "Educators" },
    { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt />, aria: "Dashboard" },
    ...NAV_ITEMS
  ];

  const getActiveNav = () => {
    if (isLogin) {
      if (pathname.startsWith("/listing")) return "Educators";
      if (pathname.startsWith("/dashboard")) return "Dashboard";
      if (pathname.startsWith("/docs")) return "Docs";
      if (pathname.startsWith("/chat")) return "Messages";
      if (pathname.startsWith("/payment/history")) return "Payments";
      if (pathname.startsWith("/profile")) return "Profile";
      if (pathname === "/logout") return "Logout";
    } else {
      if (pathname.startsWith("/login")) return "LogIn";
    }
    return null;
  };
  const activeNav = getActiveNav();

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    try {
      const res = await searchUserApi(q);
      const users = res?.data ?? res;
      setSearchResults(Array.isArray(users) ? users : []);
      router.push(`/listing/searchResult`);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setQuery("");
      setMenuOpen(false);
    }
  };

  const hideNavbar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register";

  const handleNavClick = (item) => {
    if (isGuest) {
      if (item.name !== "Educators") {
        showInfo("Please login or register to access this feature.");
        router.push("/login");
        return;
      }
    }
    router.push(item.href);
  };

  // Split nav items for layout: left (logo), mid (search), center (main nav), right (profile/login/logout)
  const mainNav = navItems.filter(item => !["Profile", "Logout", "LogIn"].includes(item.name));
  const rightNav = navItems.filter(item => ["Profile", "Logout", "LogIn"].includes(item.name) && (item.auth === undefined || item.auth === isLogin));

  // Show search bar for both students and teachers
  const showSearchBar = isStudent || isTeacher;

  return (
    <nav
      className={`w-screen sticky top-0 ${
        hideNavbar
          ? "z-[-1] opacity-0 pointer-events-none"
          : "z-50 opacity-100"
      } bg-gradient-to-r from-white/60 via-blue-100/40 to-white/60 backdrop-blur-xl shadow-2xl border-b border-blue-100/40 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* Left: Logo and Back Button */}
          <div className="flex items-center min-w-[120px] gap-2">
            {goBack && (
              <button
                onClick={() => router.back()}
                className="text-black hover:text-blue-700 cursor-pointer hover:scale-105 duration-300 transition-all ease-out hidden lg:flex left-0 mr-4 text-xl font-medium hover:underline"
              >
                <FaBackward/>
              </button>
            )}
            <div className="flex-shrink-0 lg:text-2xl tracking-tighter text-lg md:tracking-tight lg:tracking-wider font-extrabold text-blue-900 drop-shadow cursor-pointer">
              <Link href="/">CodeHive</Link>
            </div>
          </div>
          {/* Middle: Search Bar */}
          <div className="hidden sm:flex flex-1 items-center justify-start ml-2">
            {showSearchBar && (
              <form
                onSubmit={handleSearch}
                className="w-full max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full rounded-full px-3 py-2 pr-10 text-gray-800 focus:outline-none shadow bg-white/70 border border-blue-100/40 backdrop-blur transition-all duration-200 focus:ring-2 focus:ring-blue-200 text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow transition-all duration-200"
                  >
                    <FaSearch size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
          {/* Center: Main Nav */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-2">
            {mainNav.map(item => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  aria-label={item.aria}
                  className={`flex items-center rounded-xl px-2 py-2
                    ${isActive
                      ? "bg-gradient-to-r from-blue-300 to-blue-100 border-2 border-blue-500 shadow-xl text-blue-900 scale-105"
                      : "bg-white/80 border border-blue-100 hover:bg-blue-50 hover:shadow-md hover:border-blue-300 text-gray-700"}
                    transition-all duration-300
                    hover:scale-105 active:scale-95`}
                  style={{
                    minWidth: 44,
                    letterSpacing: "-0.5px",
                    fontWeight: isActive ? 600 : 500,
                    marginRight: "0.5rem",
                    maxWidth: isActive || hoveredNav === item.name ? "160px" : "44px",
                    overflow: "hidden",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {item.icon}
                  <span
                    className={`ml-2 transition-all duration-300 ease-in-out
                      ${(isActive || hoveredNav === item.name) ? "opacity-100 text-base tracking-tight" : "opacity-0 w-0"}
                    `}
                    style={{
                      maxWidth: isActive || hoveredNav === item.name ? "100px" : "0px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      overflow: "hidden",
                      display: "inline-block"
                    }}
                  >
                    {(isActive || hoveredNav === item.name) ? item.name : ""}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Right: Profile/Login/Logout */}
          <div className="flex items-center gap-2 ml-2">
            {rightNav.map(item => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  aria-label={item.aria}
                  className={`flex items-center rounded-xl px-2 py-2
                    ${isActive
                      ? "bg-gradient-to-r from-blue-300 to-blue-100 border-2 border-blue-500 shadow-xl text-blue-900 scale-105"
                      : "bg-white/80 border border-blue-100 hover:bg-blue-50 hover:shadow-md hover:border-blue-300 text-gray-700"}
                    transition-all duration-300
                    hover:scale-105 active:scale-95`}
                  style={{
                    minWidth: 44,
                    letterSpacing: "-0.5px",
                    fontWeight: isActive ? 600 : 500,
                    marginRight: "0.5rem",
                    maxWidth: isActive || hoveredNav === item.name ? "160px" : "44px",
                    overflow: "hidden",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {item.icon}
                  <span
                    className={`ml-2 transition-all duration-300 ease-in-out
                      ${(isActive || hoveredNav === item.name) ? "opacity-100 text-base tracking-tight" : "opacity-0 w-0"}
                    `}
                    style={{
                      maxWidth: isActive || hoveredNav === item.name ? "100px" : "0px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      overflow: "hidden",
                      display: "inline-block"
                    }}
                  >
                    {(isActive || hoveredNav === item.name) ? item.name : ""}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Mobile menu */}
          <div className="sm:hidden flex items-center w-full justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none ml-2"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
        {/* Mobile: Full-width search bar below nav */}
        {showSearchBar && (
          <div className="sm:hidden w-full mt-2 mb-2">
            <form
              onSubmit={handleSearch}
              className="w-full px-1"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Educators or Topics"
                  className="w-full rounded-full px-4 py-2 pr-12 text-gray-800 focus:outline-none shadow-lg bg-white/70 border border-blue-100/40 backdrop-blur transition-all duration-200 focus:ring-2 focus:ring-blue-400 text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow transition-all duration-200"
                >
                  <FaSearch size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 pt-2 flex flex-col gap-3 shadow-md bg-white/90 backdrop-blur-lg rounded-b-xl border-t border-blue-100/40">
          <div className="flex flex-col items-center gap-3 text-black font-medium">
            {[...mainNav, ...rightNav].map(item => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="flex items-center rounded-lg px-3 py-2 bg-white/80 border border-blue-100 hover:bg-blue-50 hover:shadow transition-all duration-200"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;