import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LeaveStatus = () => {
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedLeave, setExpandedLeave] = useState(null);

  // Toggle Sidebar Function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle Leave Box Expansion
  const toggleExpand = (id) => {
    setExpandedLeave(expandedLeave === id ? null : id);
  };

  // Static User Info
  const userInfo = {
    name: "John Doe",
    empId: "12345",
    photo: "/src/assets/ai-profile.jpg",
    designation: "Software Engineer",
    department: "IT",
  };

  // Leave History
  const leaveHistory = [
    {
      id: 1,
      ...userInfo,
      leaveType: "Sick Leave",
      date: "2025-02-10",
      reason: "Fever and flu symptoms",
      status: "Accepted",
      appliedAt: "2025-02-08 10:00 AM",
      confirmedAt: "2025-02-09 04:00 PM",
    },
    {
      id: 2,
      ...userInfo,
      leaveType: "Casual Leave",
      date: "2025-02-15",
      reason: "Personal work",
      status: "Rejected",
      appliedAt: "2025-02-12 02:30 PM",
      confirmedAt: "2025-02-13 11:00 AM",
      rejectionReason: "Insufficient leave balance",
    },
    {
      id: 3,
      ...userInfo,
      leaveType: "Medical Leave",
      date: "2025-02-18",
      reason: "Doctor appointment",
      status: "Pending",
      appliedAt: "2025-02-16 09:15 AM",
      confirmedAt: null,
      document: "/src/assets/medical_certificate.pdf",
    },
    {
      id: 4,
      ...userInfo,
      leaveType: "On Duty Leave",
      date: "2025-02-20",
      reason: "Client visit",
      status: "Accepted",
      appliedAt: "2025-02-18 08:45 AM",
      confirmedAt: "2025-02-19 06:00 PM",
      document: "/src/assets/duty_document.pdf",
    },
  ];

  // Filter Leave History
  const filteredLeaves =
    filter === "all"
      ? leaveHistory
      : leaveHistory.filter((leave) => leave.status.toLowerCase() === filter);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with Sidebar Toggle Button */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6">Leave Status</h2>

            {/* Filter Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Filter by Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Leave List */}
            {filteredLeaves.map((leave) => (
              <div
                key={leave.id}
                className={`border p-4 rounded-lg mb-4 shadow-md cursor-pointer transition-all duration-300 ${
                  leave.status === "Accepted"
                    ? "bg-green-100 border-green-500"
                    : leave.status === "Rejected"
                    ? "bg-red-100 border-red-500"
                    : "bg-yellow-100 border-yellow-500"
                } ${expandedLeave === leave.id ? "scale-105 p-6" : ""}`}
                onClick={() => toggleExpand(leave.id)}
              >
                <div className="flex items-center space-x-4">
                  <img src={leave.photo} alt="Profile" className="w-12 h-12 rounded-full border" />
                  <div>
                    <h3 className="font-bold">{leave.name}</h3>
                    <p className="text-sm text-gray-600">{leave.designation} - {leave.department}</p>
                    <p className="text-sm text-gray-600">Leave Type: {leave.leaveType}</p>
                    <p className="text-sm text-gray-600">Date: {leave.date}</p>
                    <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
                    <p
                      className={`text-sm font-bold ${
                        leave.status === "Accepted" ? "text-green-600" : leave.status === "Rejected" ? "text-red-600" : "text-yellow-600"
                      }`}
                    >
                      Status: {leave.status}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedLeave === leave.id && (
                  <div className="mt-4 text-sm text-gray-700">
                    <p><strong>Applied At:</strong> {leave.appliedAt}</p>
                    {leave.confirmedAt && (
                      <p><strong>Status Confirmed At:</strong> {leave.confirmedAt}</p>
                    )}

                    {/* Rejection Reason */}
                    {leave.status === "Rejected" && leave.rejectionReason && (
                      <p className="text-red-600"><strong>Rejection Reason:</strong> {leave.rejectionReason}</p>
                    )}

                    {/* Document Link for Medical & On Duty Leave */}
                    {(leave.leaveType === "Medical Leave" || leave.leaveType === "On Duty Leave") && leave.document && (
                      <p>
                        <strong>Document:</strong>{" "}
                        <a
                          href={leave.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {filteredLeaves.length === 0 && (
              <p className="text-center text-gray-500">No leave records found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
