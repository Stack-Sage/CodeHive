'use client'

import React, { useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaThumbsUp, FaUserAlt, FaRegComment, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const BioPreview = ({ bio }) => {
  if (!bio) return null;
  const lines = bio.split('\n');
  const preview = lines.slice(0, 2).join(' ');
  const hasMore = lines.length > 2 || bio.length > 80;
  return (
    <div className="text-gray-700 text-base mt-2 font-medium max-w-xs mx-auto text-center">
      {bio.length > 80 ? bio.slice(0, 80) + '...' : preview}
      {hasMore && <span className="text-indigo-500 ml-2">...</span>}
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
  const { searchResults, startChatWithUser, isLogin } = useGlobalContext();
  const router = useRouter();

  return (
    <section className="max-w-6xl item-center justify-center mx-auto my-10 p-4 flex flex-col gap-6">
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
              className="magical-gradient min-w-[90%] items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl   hover:ring-sky-500 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden hover:bg-white/20"
            >
              {user.roles.includes('educator') && ( 

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 relative">
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname}
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover border-2 border-indigo-900 shadow-md bg-white"
                  />
                </div>
                {/* Main Info (4 rows) */}
                <div className="flex-1 flex flex-col gap-4 text-lg">
                  <span className="text-2xl font-bold text-gray-900">{user.fullname}</span>
                  <span className="text-lg font-semibold italic tracking-tight text-indigo-950">
                    Hourly Rate: ₹ {user.price || "—"}
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
                        className="ml-2 px-2 py-1 rounded bg-indigo-200 text-indigo-900 font-bold text-base hover:bg-indigo-400 transition"
                        onClick={() => router.push('/login')}
                        title="Login to reveal"
                      >
                        <FaEye />
                      </button>
                    )}
                  </div>
                </div>
                {/* Skills and Bio Preview */}
                <div className="flex flex-col gap-2 items-center min-w-[120px] relative px-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(user.skills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <BioPreview bio={user.bio} />
                </div>
                {/* Action buttons (right column in lg screens) */}
                <div className="hidden lg:flex flex-col gap-3 items-center justify-center min-w-[120px] ml-6">
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center`}
                    onClick={() => router.push(`/profile/${user._id}`)}>
                    <FaUserAlt /> <span className="font-semibold">Profile</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center`}
                    onClick={() => startChatWithUser(user._id)}>
                    <FaRegComment /> <span className="font-semibold">Message</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center`}>
                    <FaThumbsUp /> <span className="font-semibold">Favorite</span>
                  </button>
                  <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center`}>
                    <FaFlag /> <span className="font-semibold">Report</span>
                  </button>
                </div>
                {/* For mobile/tablet, show icons only below */}
                <div className="flex lg:hidden flex-row gap-2 items-center justify-center mt-4 w-full">
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base`}
                    onClick={() => router.push(`/profile/${user._id}`)}>
                    <FaUserAlt />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base`}
                    onClick={() => startChatWithUser(user._id)}>
                    <FaRegComment />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base`}>
                    <FaThumbsUp />
                  </button>
                  <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base`}>
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