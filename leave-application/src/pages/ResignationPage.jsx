import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ResignationPage = () => {
  const [resignationData, setResignationData] = useState({
    name: "John Doe",
    empId: "12345",
    designation: "Software Engineer",
    reason: "",
    noticeFromDate: new Date(),
    noticeToDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    fromSession: "",
    toSession: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResignationData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle date changes
  const handleDateChange = (field, date) => {
    setResignationData((prevData) => ({ ...prevData, [field]: date }));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Resignation Instructions Sidebar */}
        <div className="p-5 bg-gray-100 border-r mt-20 w-1/4">
          <h3 className="text-lg font-semibold mb-4">Resignation Guidelines</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Submit your resignation form in advance.</li>
            <li>Serve the notice period as per company policy.</li>
            <li>Ensure a smooth knowledge transfer.</li>
            <li>Return all company assets before leaving.</li>
            <li>Maintain professionalism during the notice period.</li>
            <li>Avoid unapproved leaves during the notice period.</li>
            <li>Clear any pending dues before your last working day.</li>
          </ul>
        </div>

        {/* Main Content - Resignation Form */}
        <div className="flex-1 p-6">
          <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Resignation Application</h2>

            <form>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={resignationData.name}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Employee ID */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Employee ID</label>
                <input
                  type="text"
                  value={resignationData.empId}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Designation */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Designation</label>
                <input
                  type="text"
                  value={resignationData.designation}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Reason for Resignation */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Reason for Resignation</label>
                <textarea
                  name="reason"
                  value={resignationData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  rows="4"
                  placeholder="Provide a reason for resignation..."
                ></textarea>
              </div>

              {/* Notice Period */}
              <h3 className="text-lg font-semibold mb-4">Notice Period</h3>

              {/* From Date and Session */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">From Date</label>
                  <DatePicker
                    selected={resignationData.noticeFromDate}
                    onChange={(date) => handleDateChange("noticeFromDate", date)}
                    className="w-full px-4 py-2 border rounded-md"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>

              {/* To Date and Session */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">To Date</label>
                  <DatePicker
                    selected={resignationData.noticeToDate}
                    onChange={(date) => handleDateChange("noticeToDate", date)}
                    className="w-full px-4 py-2 border rounded-md"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 active:scale-95"
                >
                  Submit Resignation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResignationPage;
