import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApplyOverTime = () => {
  const [overtimeData, setOvertimeData] = useState({
    name: "John Doe",
    empId: "12345",
    date: null,
    inTime: "",
    outTime: "",
    reason: "",
  });

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOvertimeData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setOvertimeData((prev) => ({ ...prev, date }));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Apply for Over Time</h2>

            <form>
              {/* Name & Employee ID */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={overtimeData.name}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Employee ID</label>
                <input
                  type="text"
                  value={overtimeData.empId}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Date</label>
                <DatePicker
                  selected={overtimeData.date}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 border rounded-md"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                />
              </div>

              {/* In-Time & Out-Time */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">In-Time</label>
                  <input
                    type="time"
                    name="inTime"
                    value={overtimeData.inTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold">Out-Time</label>
                  <input
                    type="time"
                    name="outTime"
                    value={overtimeData.outTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Reason</label>
                <textarea
                  name="reason"
                  value={overtimeData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyOverTime;
