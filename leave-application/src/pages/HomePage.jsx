import React, { useState } from "react";
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import CalendarComponent from '../components/CalendarComponent.jsx';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <CalendarComponent />
      </div>
    </div>
  );
};

export default HomePage;
