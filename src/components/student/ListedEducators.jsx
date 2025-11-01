'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/global.context'
import useUserHook from '@/hooks/useUserHook'
import { buttonStyleTwo } from '@/ui/CustomCSS'
import { FaFlag, FaRegComment, FaUserAlt, FaEye, FaMoneyBillWave, FaCalendarPlus } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'

const UserCardShimmer = () => (
  <div className="bg-white/10 min-w-[90%] rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:flex-row md:gap-6 overflow-hidden relative animate-fadein">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>
    <div className="w-14 h-14 md:w-32 md:h-32 rounded-full bg-gray-300 border-2 border-indigo-900 shadow-md relative z-10"></div>
    <div className="flex-1 flex flex-col gap-2 md:gap-4 relative z-10">
      <div className="h-6 rounded w-1/3 md:w-1/4 bg-gray-300"></div>
      <div className="h-4 rounded w-2/3 md:w-1/2 bg-gray-300"></div>
      <div className="h-4 rounded w-full md:w-3/4 bg-gray-300"></div>
      <div className="flex flex-row gap-2 mt-2">
        <div className="h-4 rounded w-1/2 bg-gray-300"></div>
        <div className="h-4 rounded w-1/3 bg-gray-300"></div>
      </div>
    </div>
    <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 relative z-10">
      <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
      <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
      <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
      <div className="h-8 w-20 md:w-full bg-gray-300 rounded"></div>
    </div>
  </div>
)

const BioPreview = ({ bio }) => {
  if (!bio) return null;
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
  const { allUser, startChatWithUser, isLogin, user } = useGlobalContext();
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const pathname = usePathname();
  const isGuest = !isLogin && user?.roles?.includes("guest");

  // Only redirect guest if not on /listing
  useEffect(() => {
    if (isGuest && pathname !== "/listing") {
      router.push("/login");
    }
  }, [isGuest, pathname, router]);

  // Only fetch users once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getAllUser()
      setLoading(false)
    }
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        Discover Educators
      </h1>
      {loading 
        ? Array.from({ length: 5 }).map((_, i) => <UserCardShimmer key={i} />)
        : ( 
          <div className="flex flex-col gap-8">
            {allUser.map(user => (
              <div
                key={user._id}
                className="bg-white/40 backdrop-blur-xl min-w-[90%] rounded-2xl shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-blue-400 transition-all duration-300 ease-out hover:scale-[1.01] cursor-pointer overflow-hidden animate-fadein"
              >
                {user.roles.includes('educator') && (
                <div className="flex ring-1 rounded-2xl flex-col md:flex-row items-center md:items-start gap-6 p-6 relative">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt={user.fullname}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 border-blue-200 shadow-lg bg-white"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 text-base">
                    <span className="text-xl font-bold text-blue-900">{user.fullname}</span>
                    <span className="text-base font-semibold italic tracking-tight text-indigo-700">
                      Hourly Rate: <span className="text-blue-600 font-bold">₹ {user.price || "—"}</span>
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
                      onClick={() => handleRestrictedAction() || router.push(`/chat/${user._id}`)}>
                      <FaRegComment /> <span className="font-semibold">Message</span>
                    </button>
                    {user.roles.includes('educator') && (
                      <button className={`${buttonStyleTwo} px-3 py-2 rounded-lg text-base flex flex-row gap-2 items-center bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                        onClick={() => handleRestrictedAction() || router.push(`/bookSession/${user._id}`)}>
                        <FaCalendarPlus /> <span className="font-semibold">Book Session</span>
                      </button>
                    )}
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
                      onClick={() => handleRestrictedAction() || router.push(`/chat/${user._id}`)}>
                      <FaRegComment />
                    </button>
                    {user.roles.includes('educator') && (
                      <button className={`${buttonStyleTwo} px-2 py-2 rounded-lg text-base bg-white/70 text-blue-900 shadow hover:ring-2 hover:ring-blue-400 transition`}
                        onClick={() => handleRestrictedAction() || router.push(`/bookSession/${user._id}`)}>
                        <FaCalendarPlus />
                      </button>
                    )}
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

export default ListedEducators