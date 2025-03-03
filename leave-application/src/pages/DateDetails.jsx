import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

const leaveData = [
  {
    fromDate: "2025-01-20",
    fromSession: "Forenoon",
    toDate: "2025-01-20",
    toSession: "Afternoon",
    leaveType: "Sick Leave",
    reason: "Suffering from flu",
    document: "Medical Certificate.pdf",
  },
  {
    fromDate: "2025-01-23",
    fromSession: "Forenoon",
    toDate: "2025-01-24",
    toSession: "Afternoon",
    leaveType: "Casual Leave",
    reason: "Personal Work",
  },
  {
    fromDate: "2025-01-30",
    fromSession: "Afternoon",
    toDate: "2025-01-31",
    toSession: "Forenoon",
    leaveType: "Annual Leave",
    reason: "Vacation",
  },
];

// Dummy leave balance data
const leaveBalance = [
  { type: "Casual Leave", eligible: 12, availed: 5 },
  { type: "Earned Leave", eligible: 15, availed: 7 },
  { type: "Sick Leave", eligible: 10, availed: 3 },
  { type: "On Duty Leave", eligible: 8, availed: 2 },
  { type: "Compensatory Leave", eligible: 6, availed: 1 },
  { type: "Holiday Leave", eligible: 5, availed: 0 },
  { type: "Special Leave", eligible: 3, availed: 1 },
];

const DateDetails = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (isNaN(parsedDate.getTime())) {
    return <h2 className="text-red-500 text-center mt-10">Invalid Date</h2>;
  }

  const goToPreviousDate = () => {
    const prevDate = new Date(parsedDate);
    prevDate.setDate(parsedDate.getDate() - 1);
    navigate(`/date/${prevDate.toISOString().split("T")[0]}`);
  };

  const goToNextDate = () => {
    const nextDate = new Date(parsedDate);
    nextDate.setDate(parsedDate.getDate() + 1);
    navigate(`/date/${nextDate.toISOString().split("T")[0]}`);
  };

  const formattedDate = parsedDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/");

  const monthYear = parsedDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const leaveInfo = leaveData.find((leave) => {
    const leaveStart = new Date(`${leave.fromDate}T00:00:00Z`);
    const leaveEnd = new Date(`${leave.toDate}T23:59:59Z`);

    return parsedDate >= leaveStart && parsedDate <= leaveEnd;
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Leave Balance Sidebar with separate scrolling */}
        <div className="p-5 bg-gray-100 border-r mt-20 w-85 h-full overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Leave Balance</h3>
          
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto lg:overflow-x-hidden">
            <table className="w-full border-collapse border bg-white shadow-lg min-w-max">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-2 border">Leave Type</th>
                  <th className="p-2 border">Eligible</th>
                  <th className="p-2 border">Availed</th>
                  <th className="p-2 border">Balance</th>
                </tr>
              </thead>
              <tbody>
                {leaveBalance.map((leave, index) => (
                  <tr key={index} className="text-center border">
                    <td className="p-2 border">{leave.type}</td>
                    <td className="p-2 border">{leave.eligible}</td>
                    <td className="p-2 border">{leave.availed}</td>
                    <td className="p-2 border font-bold">
                      {leave.eligible - leave.availed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Content with separate scrolling */}
        <div className="flex-1 p-6 transition-all duration-300 overflow-y-auto h-full">
          <div className="mt-16 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {monthYear}
            </h1>

            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPreviousDate}
                className="text-2xl text-gray-600 hover:text-gray-800"
              >
                ←
              </button>

              <div className="flex flex-col items-center">
                <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg text-lg font-bold">
                  {parsedDate.toLocaleDateString("en-GB", { weekday: "long" })}
                </div>
                <div className="bg-blue-700 text-white px-6 py-4 text-4xl font-bold rounded-lg">
                  {parsedDate.getDate()}
                </div>
              </div>

              <button
                onClick={goToNextDate}
                className="text-2xl text-gray-600 hover:text-gray-800"
              >
                →
              </button>

              <div className="bg-white shadow-lg p-6 rounded-lg w-80 ml-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {formattedDate}
                </h2>

                {leaveInfo ? (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Leave Type: {leaveInfo.leaveType}
                    </h3>
                    <p>
                      <strong>Reason:</strong> {leaveInfo.reason}
                    </p>
                    <p>
                      <strong>From:</strong> {leaveInfo.fromDate} (
                      {leaveInfo.fromSession})
                    </p>
                    <p>
                      <strong>To:</strong> {leaveInfo.toDate} (
                      {leaveInfo.toSession})
                    </p>
                    {leaveInfo.document && (
                      <p>
                        <strong>Document:</strong>{" "}
                        <a
                          href="/path/to/document.pdf"
                          className="text-blue-600 underline"
                        >
                          {leaveInfo.document}
                        </a>
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">
                    No leave data available for this date.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetails;
