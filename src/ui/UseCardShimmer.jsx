import LoadingHand from "@/components/auth/LoadingHand";

const UserCardShimmer = () => {
  return (
    <div className="relative w-full lg:w-[90%] max-w-[95rem] mx-auto rounded-2xl shadow-lg overflow-hidden p-6 bg-indigo-50/20 magical-gradient">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/40 via-white/40 to-indigo-200/40 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] z-0"></div>

      {/* Responsive Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Avatar + Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/50 border-2 border-indigo-300 shadow-md"></div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-5 w-40 bg-white/50 rounded"></div>
              <div className="h-4 w-28 bg-white/50 rounded"></div>
            </div>
          </div>
          <div className="h-4 w-full bg-white/50 rounded mt-2"></div>
          <div className="h-4 w-3/4 bg-white/50 rounded"></div>
          <div className="flex gap-2 mt-2">
            <div className="h-4 w-1/2 bg-white/50 rounded"></div>
            <div className="h-4 w-1/3 bg-white/50 rounded"></div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="h-8 w-12 bg-white/50 rounded"></div>
            <div className="h-8 w-12 bg-white/50 rounded"></div>
            <div className="h-8 w-12 bg-white/50 rounded"></div>
            <div className="h-8 w-12 bg-white/50 rounded"></div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-4">
          <div className="h-5 w-3/4 bg-white/50 rounded"></div>
          <div className="h-4 w-2/3 bg-white/50 rounded"></div>
          <div className="h-4 w-full bg-white/50 rounded"></div>
          <div className="h-4 w-5/6 bg-white/50 rounded"></div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="h-24 w-1/3 bg-white/50 rounded"></div>
            <div className="h-24 w-1/3 bg-white/50 rounded"></div>
            <div className="h-24 w-1/3 bg-white/50 rounded"></div>
          </div>
          <div className="h-4 w-2/3 bg-white/50 rounded"></div>
          <div className="h-4 w-1/2 bg-white/50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCardShimmer;
