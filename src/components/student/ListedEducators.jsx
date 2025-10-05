'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import useUserHook from '@/hooks/useUserHook'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaRegComment, FaThumbsUp, FaUserAlt, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

// Shimmer skeleton for user card
const UserCardShimmer = () => {
  return (
    <div className="bg-white/10 magical-gradient min-w-[90%] rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:flex-row md:gap-6 overflow-hidden relative">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Avatar */}
      <div className="w-14 h-14 md:w-32 md:h-32 rounded-full bg-gray-300 border-2 border-indigo-900 shadow-md relative z-10"></div>

      {/* Text content */}
      <div className="flex-1 flex flex-col gap-2 md:gap-4 relative z-10">
        <div className="h-6 rounded w-1/3 md:w-1/4 bg-gray-300"></div>
        <div className="h-4 rounded w-2/3 md:w-1/2 bg-gray-300"></div>
        <div className="h-4 rounded w-full md:w-3/4 bg-gray-300"></div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="h-4 rounded w-1/2 bg-gray-300"></div>
          <div className="h-4 rounded w-1/3 bg-gray-300"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 relative z-10">
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

const BioPreview = ({ bio }) => {
  if (!bio) return null;
  // Show up to 160 chars, then truncate
  const maxLen = 160;
  const showBio = bio.length > maxLen ? bio.slice(0, maxLen) + '...' : bio;
  return (
    <div className="text-gray-700 text-base mt-2 font-medium max-w-md mx-auto text-center">
      {showBio}
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

const ListedEducators = () => {
  const { getAllUser } = useUserHook();
  const { allUser, startChatWithUser, isLogin } = useGlobalContext();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getAllUser()
      setLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <section className="max-w-6xl lg:min-w-5xl item-center justify-center mx-auto my-10 p-4 flex flex-col gap-6">
      {loading 
        ? Array.from({ length: 5 }).map((_, i) => <UserCardShimmer key={i} />)
        : ( 
          <div className="flex flex-col gap-8">
            {allUser.map(user => (
              
              <div
                key={user._id}
                className=" magical-gradient min-w-[90%] items-center justify-center rounded-2xl shadow-lg hover:shadow-2xl  hover:ring-sky-500 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden hover:bg-white/20"
              >
                {user.roles.includes('educator') && (


                <div className="flex ring-1 rounded-2xl flex-col md:flex-row items-center md:items-start gap-6 p-6 relative">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt={user.fullname}
                      className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-indigo-900 shadow-md bg-white"
                    />
                  </div>
                  {/* Main Info (4 rows) */}
                  <div className="flex-1 flex flex-col gap-2 text-base">
                    <span className="text-xl font-bold text-gray-900">{user.fullname}</span>
                    <span className="text-base font-semibold italic tracking-tight text-indigo-950">
                      Hourly Rate: ₹ {user.price || "—"}
                    </span>
                    <span className="text-sm text-gray-800">
                      Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </span>
                    <span className="text-sm text-gray-800">
                      {user.country || "—"}
                    </span>
                    <div className="flex items-center gap-2 mt-1 text-base">
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
                  {/* Skills and Bio Preview - centered */}
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
                      onClick={ () => router.push(`/chat/${user._id}`)}>
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
                      onClick={() => router.push(`/chat/${user._id}`)}>
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

export default ListedEducators