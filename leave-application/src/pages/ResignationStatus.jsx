import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ResignationStatus = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar Function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Resignation Details
  const resignationInfo = {
    name: "John Doe",
    empId: "12345",
    photo: "/src/assets/profile.jpg", // Update this path if needed
    designation: "Software Engineer",
    department: "IT",
    dateOfJoining: "2020-01-15",
    noticePeriod: "1 Month",
    startDate: "2025-02-10",
    endDate: "2025-03-10",
    appliedOn: "2025-02-05 10:30 AM",
    confirmedOn: "2025-02-07 02:00 PM",
    reason: "Better career opportunity and growth.",
    status: "Accepted", // Can be "Accepted", "Pending", or "Rejected"
    approvedBy: "HR Manager - Alice Smith",
    nextStep: "Complete pending work and handover tasks before the last working day.",
    rejectionReason: "",
    achievements: ["Best Employee of the Year 2023", "Successfully Led Project X"],
  };

  // Calculate Work Duration
  const calculateWorkDuration = (joiningDate, noticeEndDate) => {
    const start = new Date(joiningDate);
    const end = new Date(noticeEndDate);
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    return `${years} years and ${months >= 0 ? months : 12 + months} months`;
  };

  const workDuration = calculateWorkDuration(resignationInfo.dateOfJoining, resignationInfo.endDate);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar with Sidebar Toggle Button */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Resignation Status</h2>

          {/* Employee Info (Left-Right Parallel Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee Image & Basic Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <img src={resignationInfo.photo} alt="Profile" className="w-20 h-20 rounded-full border" />
                <div>
                  <p className="text-xl font-semibold">{resignationInfo.name}</p>
                  <p className="text-gray-600">{resignationInfo.designation} - {resignationInfo.department}</p>
                  <p className="text-gray-500">Employee ID: {resignationInfo.empId}</p>
                </div>
              </div>
            </div>

            {/* Work Duration */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-blue-700">Work Duration:</h3>
              <p className="text-gray-800">{workDuration}</p>
              <p className="text-gray-500">Joined on: {resignationInfo.dateOfJoining}</p>
            </div>
          </div>

          {/* Resignation Reason */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h3 className="font-semibold text-yellow-700">Reason for Resignation:</h3>
            <p className="text-gray-800">{resignationInfo.reason}</p>
          </div>

          {/* Notice Period (Left-Right Parallel Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-gray-700">Notice Period:</h3>
              <p>{resignationInfo.noticePeriod}</p>
              <p className="text-gray-500">From: {resignationInfo.startDate}</p>
              <p className="text-gray-500">To: {resignationInfo.endDate}</p>
            </div>

            {/* Application & Confirmation Dates */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-gray-700">Application Details:</h3>
              <p className="text-gray-500">Applied On: {resignationInfo.appliedOn}</p>
              {resignationInfo.status !== "Pending" && (
                <p className="text-gray-500">Confirmed On: {resignationInfo.confirmedOn}</p>
              )}
            </div>
          </div>

          {/* Status Box */}
          <div
            className={`p-6 rounded-lg shadow-lg text-center text-2xl font-bold transition-all hover:shadow-xl ${
              resignationInfo.status === "Accepted" ? "bg-green-200 text-green-700"
                : resignationInfo.status === "Rejected" ? "bg-red-200 text-red-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
          >
            Status: {resignationInfo.status}
          </div>

          {/* Approved By */}
          {resignationInfo.status === "Accepted" && (
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-green-700">Approved By:</h3>
              <p className="text-gray-800">{resignationInfo.approvedBy}</p>
            </div>
          )}

          {/* Rejection Reason */}
          {resignationInfo.status === "Rejected" && (
            <div className="bg-red-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-red-700">Rejection Reason:</h3>
              <p className="text-gray-800">{resignationInfo.rejectionReason}</p>
            </div>
          )}

          {/* Next Steps */}
          {resignationInfo.status === "Accepted" && (
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-semibold text-blue-700">Next Steps:</h3>
              <p className="text-gray-800">{resignationInfo.nextStep}</p>
            </div>
          )}

          {/* Achievements */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h3 className="font-semibold text-purple-700">Achievements:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {resignationInfo.achievements.map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResignationStatus;
