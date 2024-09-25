import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const DashboardLayout = ({ children }) => {
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  return (
    <div
      className={`${isDarkMode ? "dark" : "light"}
    flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />

      <main
        className={`flex flex-col w-full h-full p-7 px-10 bg-gray-50 ${
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
