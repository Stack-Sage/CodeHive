'use client';
import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/global.context";
import { useDashboard } from "@/context/dashboard.context";
import ProfileCard from "./ProfileCard";
import SiteStatsSidebar from "./SiteStatsSidebar";
import StatsGrid from "./StatsGrid";
import ProfileClicksLine from "./ProfileClicksLine";
import SessionsDoughnut from "./SessionsDoughnut";
import ExtraStats from "./ExtraStats";
import SearchResultStat from "./SearchResultStat";
import MessagesStat from "./MessagesStat";
import SessionHoursStat from "./SessionHoursStat";
import TopSkillsChart from "./TopSkillsChart";
import ReviewsList from "./ReviewsList";
import UpcomingEventsCalendar from "./UpcomingEventsCalendar";
import AccountInfo from "./AccountInfo";
import ProfileCompletionBar from "./ProfileCompletionBar";
import StudentFeedbackSummary from "./StudentFeedbackSummary";
import QuickActions from "./QuickActions";

// Animation variants for fade-in from different directions
const fadeVariants = {
  left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  up: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  center: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
};

export default function EducatorDashboard() {
  const { user } = useGlobalContext();
  const { dashboardStats } = useDashboard();

  // Optionally handle loading/fallback
  if (!dashboardStats) {
    return <div className="text-center py-20 text-xl text-blue-700">Loading dashboard...</div>;
  }

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-2 md:px-6 py-8">
      <motion.h2
        initial={fadeVariants.up.initial}
        animate={fadeVariants.up.animate}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 text-center mb-8 drop-shadow"
      >
        Educator Dashboard
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar: Profile, site stats, quick actions */}
        <motion.div
          initial={fadeVariants.left.initial}
          animate={fadeVariants.left.animate}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #60a5fa33" }}
          className="flex flex-col gap-6 min-w-[260px] max-w-xs mx-auto lg:mx-0"
        >
          <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ scale: 1.03 }}>
            <ProfileCard user={user} />
          </motion.div>
          <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.15 }} whileHover={{ scale: 1.03 }}>
            <AccountInfo />
          </motion.div>
          <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.03 }}>
            <ProfileCompletionBar percent={80} />
          </motion.div>
          <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.25 }} whileHover={{ scale: 1.03 }}>
            <SiteStatsSidebar />
          </motion.div>
          <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ scale: 1.03 }}>
            <QuickActions />
          </motion.div>
        </motion.div>
        {/* Main dashboard content */}
        <div className="flex-1 flex flex-col gap-8 mx-auto w-full lg:w-auto">
          <motion.div {...fadeVariants.up} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ scale: 1.02 }}>
            <StatsGrid stats={dashboardStats} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeVariants.right} transition={{ duration: 0.5, delay: 0.15 }} whileHover={{ scale: 1.02 }}>
              <ProfileClicksLine stats={dashboardStats} />
            </motion.div>
            <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.18 }} whileHover={{ scale: 1.02 }}>
              <SessionsDoughnut stats={dashboardStats} />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeVariants.right} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.02 }}>
              <SearchResultStat count={dashboardStats.searchAppearances} />
            </motion.div>
            <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.22 }} whileHover={{ scale: 1.02 }}>
              <MessagesStat sent={dashboardStats.messagesSent} received={dashboardStats.messagesReceived} />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeVariants.right} transition={{ duration: 0.5, delay: 0.25 }} whileHover={{ scale: 1.02 }}>
              <SessionHoursStat hours={dashboardStats.sessionHours} />
            </motion.div>
            <motion.div {...fadeVariants.left} transition={{ duration: 0.5, delay: 0.28 }} whileHover={{ scale: 1.02 }}>
              <TopSkillsChart skills={dashboardStats.skills} />
            </motion.div>
          </div>
          <motion.div {...fadeVariants.center} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ scale: 1.02 }}>
            <ExtraStats stats={dashboardStats} />
          </motion.div>
          <motion.div {...fadeVariants.down} transition={{ duration: 0.5, delay: 0.32 }} whileHover={{ scale: 1.02 }}>
            <StudentFeedbackSummary feedback={dashboardStats.feedbackSummary} />
          </motion.div>
          <motion.div {...fadeVariants.down} transition={{ duration: 0.5, delay: 0.34 }} whileHover={{ scale: 1.02 }}>
            <ReviewsList reviews={dashboardStats.reviews} />
          </motion.div>
          <motion.div {...fadeVariants.down} transition={{ duration: 0.5, delay: 0.36 }} whileHover={{ scale: 1.02 }}>
            <UpcomingEventsCalendar events={dashboardStats.upcomingEvents} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
