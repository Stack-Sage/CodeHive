'use client';
import { createContext, useContext } from "react";
import useSWR from "swr";
import { getDashboardStatsApi } from "@/services/dashboard.service";
import { useGlobalContext } from "./global.context";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const { data: dashboardStats, mutate: reloadDashboard } = useSWR(
    user?._id ? ["dashboard", user._id] : null,
    () => getDashboardStatsApi(user._id)
  );

  return (
    <DashboardContext.Provider value={{ dashboardStats, reloadDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
