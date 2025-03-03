import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLeaveDropdownOpen, setIsLeaveDropdownOpen] = useState(false);
  const [isResignationDropdownOpen, setIsResignationDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const leaveRef = useRef(null);
  const resignationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle Profile Dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (leaveRef.current && !leaveRef.current.contains(event.target)) {
        setIsLeaveDropdownOpen(false);
      }
      if (resignationRef.current && !resignationRef.current.contains(event.target)) {
        setIsResignationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Handle Leave Click
  const handleLeaveClick = () => {
    navigate("/leave");
    setIsLeaveDropdownOpen(true);
  };

  // Handle Resignation Click
  const handleResignationClick = () => {
    navigate("/resignation");
    setIsResignationDropdownOpen(true);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-500 to-red-700 p-4 flex items-center justify-between z-50 shadow-md">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-white font-semibold hover:bg-red-700 p-2 rounded"
      >
        ☰
      </button>

      {/* Navigation Links - Centered */}
      <ul className="flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <a
            className={`text-white font-semibold hover:underline ${
              isActive("/") ? "underline font-bold" : ""
            }`}
            href="/"
          >
            Home
          </a>
        </li>

        {/* Leave Dropdown */}
        <li className="relative" ref={leaveRef}>
          <button
            onClick={handleLeaveClick}
            className={`text-white font-semibold hover:underline ${
              isActive("/leave") || isActive("/leave-status") || isActive("/overtime-apply")
                ? "underline font-bold"
                : ""
            }`}
          >
            Leave ▼
          </button>
          <ul
            className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-2 transition-all duration-300 ease-in-out transform ${
              isLeaveDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <li>
              <a
                href="/leave-status"
                className={`block px-4 py-2 hover:bg-gray-200 transition-colors ${
                  isActive("/leave-status") ? "bg-gray-300 font-bold" : ""
                }`}
              >
                Leave Status
              </a>
            </li>
            <li>
              <a
                href="/apply-overtime"
                className={`block px-4 py-2 hover:bg-gray-200 transition-colors ${
                  isActive("/overtime-apply") ? "bg-gray-300 font-bold" : ""
                }`}
              >
                Overtime Apply
              </a>
            </li>
          </ul>
        </li>

        {/* Resignation Dropdown */}
        <li className="relative" ref={resignationRef}>
          <button
            onClick={handleResignationClick}
            className={`text-white font-semibold hover:underline ${
              isActive("/resignation") || isActive("/resignation-status")
                ? "underline font-bold"
                : ""
            }`}
          >
            Resignation ▼
          </button>
          <ul
            className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-2 transition-all duration-300 ease-in-out transform ${
              isResignationDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <li>
              <a
                href="/resignation-status"
                className={`block px-4 py-2 hover:bg-gray-200 transition-colors ${
                  isActive("/resignation-status") ? "bg-gray-300 font-bold" : ""
                }`}
              >
                Status
              </a>
            </li>
          </ul>
        </li>
      </ul>

      {/* Profile Picture - Click to Toggle Profile */}
      <div className="relative" ref={profileRef}>
        <img
          src="/src/assets/ai-profile.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
          onClick={toggleProfile}
        />

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 shadow-lg rounded-lg p-6 border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsProfileOpen(false)}
            >
              ✖
            </button>

            <div className="flex flex-col items-center">
              {/* Enlarged Profile Image */}
              <img
                src="/src/assets/ai-profile.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
              />

              {/* Employee Details */}
              <h2 className="mt-3 font-semibold text-lg">John Doe</h2>
              <p className="text-sm text-gray-600">Emp ID: <span className="font-medium">12345</span></p>
              <p className="text-sm text-gray-600">Software Engineer</p>
              <p className="text-sm text-gray-600">Department: IT</p>
              <p className="text-sm text-gray-600">Phone: +1 234 567 890</p>
              <p className="text-sm text-gray-600">Email: johndoe@email.com</p>

              {/* Logout Button */}
              <button className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
