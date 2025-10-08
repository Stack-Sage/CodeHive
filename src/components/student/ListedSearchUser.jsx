'use client'

import React, { useEffect } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaThumbsUp, FaUserAlt, FaRegComment, FaEye } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'

const BioPreview = ({ bio }) => {
  if (!bio) return null;
  const lines = bio.split('\n');
  const preview = lines.slice(0, 2).join(' ');
  const hasMore = lines.length > 2 || bio.length > 80;
  return (
    <div className="text-gray-700 text-base mt-2 font-medium max-w-xs mx-auto text-center">
      {bio.length > 80 ? bio.slice(0, 80) + '...' : preview}
      {hasMore && <span className="text-blue-500 ml-2">...</span>}
    </div>
  );
};

const blurEmail = (email, isLogin) => {
  if (isLogin || !email) return email;
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const blurred =
    name.length > 2
      ? name.slice(0, 2) + '••••••'
      : '••••••';
  return `${blurred}@${domain}`;
};

const ListedSearchUser = () => {
  const { searchResults, startChatWithUser, isLogin, user } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();
  const isGuest = !isLogin && user?.roles?.includes("guest");

  useEffect(() => {
    // Restrict guest navigation
    if (isGuest && pathname !== "/listing/searchResult") {
      router.push("/login");
    }
  }, [isGuest, pathname, router]);

  const handleRestrictedAction = () => {
    if (isGuest) {
      import("@/ui/toast").then(({ showInfo }) => {
        showInfo("Please login or register to access this feature.");
      });
      router.push("/login");
      return true;
    }
    return false;
  };

  return (
    <section className="max-w-6xl w-full item-center justify-center mx-auto my-10 p-4 flex flex-col gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-fadein">
        Search Results
      </h1>
      {(!searchResults || searchResults.length === 0) ? (
        <p className="text-gray-500 text-center">No educators found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Search Results: {searchResults.length}
          </h2>
          {searchResults.map(user => (
            <div
              key={user._id}
              className="bg-white/40 backdrop-blur-xl min-w-[90%] rounded-2xl shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-blue-400 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden animate-fadein"
            >
              {user.roles.includes('educator') && ( 
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 relative">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 border-blue-200 shadow-lg bg-white"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4 text-lg">
                  <span className="text-2xl font-bold text-blue-900">{user.fullname}</span>
                  <span className="text-lg font-semibold italic tracking-tight text-indigo-700">
                    Hourly Rate: <span className="text-blue-600 font-bold">₹ {user.price || "—"}</span>
                  </span>
                  <span className="text-base text-gray-800">
                    Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </span>
                  <span className="text-base text-gray-800">
                    {user.country || "—"}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-lg">
                    <span className="font-medium">{blurEmail(user.email, isLogin)}</span>
                    {!isLogin && (
                      <button
                        className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-900 font-bold text-base hover:bg-blue-200 transition"
                        onClick={() => handleRestrictedAction()}
                        title="Login to reveal"
                      >
                        <FaEye />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center min-w-[120px] relative px-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(user.skills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/60 text-blue-900 rounded-full text-sm font-semibold cursor-pointer shadow"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <BioPreview bio={user.bio} />
                </div>
                <div className="hidden lg:flex flex-col gap-3 items-center justify-center min-w-[120px] ml-6">
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction() || router.push(`/profile/${user._id}`)}>
                    <FaUserAlt /> <span className="font-semibold">Profile</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction() || startChatWithUser(user._id)}>
                    <FaRegComment /> <span className="font-semibold">Message</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction()}>
                    <FaThumbsUp /> <span className="font-semibold">Favorite</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction()}>
                    <FaFlag /> <span className="font-semibold">Report</span>
                  </button>
                </div>
                <div className="flex lg:hidden flex-row gap-2 items-center justify-center mt-4 w-full">
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction() || router.push(`/profile/${user._id}`)}>
                    <FaUserAlt />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction() || startChatWithUser(user._id)}>
                    <FaRegComment />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction()}>
                    <FaThumbsUp />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                    onClick={() => handleRestrictedAction()}>
                    <FaFlag />
                  </button>
                </div>
              </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListedSearchUser