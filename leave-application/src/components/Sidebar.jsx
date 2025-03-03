import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // State to manage dropdowns
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [resignationDropdown, setResignationDropdown] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
      style={{ maxHeight: "100vh" }} // Ensures sidebar is scrollable independently
    >
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-white p-2 hover:bg-gray-700 rounded-lg"
        onClick={toggleSidebar}
      >
        <X size={24} />
      </button>

      {/* Sidebar Menu */}
      <div className="mt-8 space-y-4">
        {/* Home / Dashboard */}
        <a href="/dashboard" className="block text-gray-300 hover:text-white">
          Home / Dashboard
        </a>

        {/* Leave (Dropdown) */}
        <div className="relative">
          <button
            onClick={() => setLeaveDropdown(!leaveDropdown)}
            className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white"
          >
            Leave
            <ChevronDown size={18} className={`transform ${leaveDropdown ? "rotate-180" : "rotate-0"}`} />
          </button>
          {leaveDropdown && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/leave-status" className="block text-gray-400 hover:text-white">
                Leave Status
              </a>
              <a href="/apply-overtime" className="block text-gray-400 hover:text-white">
                Apply Overtime
              </a>
            </div>
          )}
        </div>

        {/* Resignation (Dropdown) */}
        <div className="relative">
          <button
            onClick={() => setResignationDropdown(!resignationDropdown)}
            className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white"
          >
            Resignation
            <ChevronDown size={18} className={`transform ${resignationDropdown ? "rotate-180" : "rotate-0"}`} />
          </button>
          {resignationDropdown && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/resignation-status" className="block text-gray-400 hover:text-white">
                Status
              </a>
            </div>
          )}
        </div>

        {/* Settings */}
        <a href="/settings" className="block text-gray-300 hover:text-white">
          Settings
        </a>

        {/* Logout */}
        <a href="/logout" className="block text-gray-300 hover:text-red-500">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
