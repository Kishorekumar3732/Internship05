import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeavePage = () => {
  const [leaveData, setLeaveData] = useState({
    name: "John Doe",
    empId: "12345",
    leaveType: "",
    fromDate: null,
    toDate: null,
    fromSession: "",
    toSession: "",
    reason: "",
    document: null,
    documentURL: null,
    errorMessage: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle date changes
  const handleDateChange = (field, date) => {
    setLeaveData((prevData) => ({ ...prevData, [field]: date }));
  };

  // Handle file upload and drag-and-drop
  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setLeaveData((prevData) => ({
        ...prevData,
        document: file,
        documentURL: url,
        errorMessage: "",
      }));
    } else {
      setLeaveData((prevData) => ({
        ...prevData,
        document: null,
        documentURL: null,
        errorMessage: "Please upload a valid PDF document.",
      }));
    }
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Leave Balance Sidebar */}
        <div className="p-5 bg-gray-100 border-r mt-20">
          <h3 className="text-lg font-semibold mb-4">Leave Balance</h3>
          <table className="w-full border-collapse border bg-white shadow-lg">
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

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Leave Application</h2>

            <form>
              {/* Name and Employee ID */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={leaveData.name}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Employee ID</label>
                <input
                  type="text"
                  value={leaveData.empId}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Leave Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Leave Type</label>
                <select
                  name="leaveType"
                  value={leaveData.leaveType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Leave Type</option>
                  {leaveBalance.map((leave, index) => (
                    <option key={index} value={leave.type}>
                      {leave.type}
                    </option>
                  ))}
                </select>
              </div>

               {/* From Date and Session */}
               <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">From Date</label>
                  <DatePicker
                    selected={leaveData.fromDate}
                    onChange={(date) => handleDateChange("fromDate", date)}
                    className="w-full px-4 py-2 border rounded-md"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select from date"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold">From Session</label>
                  <select
                    name="fromSession"
                    value={leaveData.fromSession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Session</option>
                    <option value="forenoon">Forenoon</option>
                    <option value="afternoon">Afternoon</option>
                  </select>
                </div>
              </div>

              {/* To Date and Session */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">To Date</label>
                  <DatePicker
                    selected={leaveData.toDate}
                    onChange={(date) => handleDateChange("toDate", date)}
                    className="w-full px-4 py-2 border rounded-md"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select to date"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold">To Session</label>
                  <select
                    name="toSession"
                    value={leaveData.toSession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Session</option>
                    <option value="forenoon">Forenoon</option>
                    <option value="afternoon">Afternoon</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Reason</label>
                <textarea
                  name="reason"
                  value={leaveData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  rows="4"
                ></textarea>
              </div>

              
              {/* Upload Document (Only for Sick Leave & On Duty Leave) */}
{(leaveData.leaveType === "Sick Leave" ||
  leaveData.leaveType === "On Duty Leave") && (
  <div className="mb-4">
    <label className="block text-sm font-semibold">
      Upload Document (PDF only)
    </label>
    <div
      className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-100"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
    >
      <p>Drag & drop your PDF here, or click to select</p>
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        onChange={onFileInputChange}
        className="hidden"
      />
    </div>
    {leaveData.document && (
      <div className="mt-2 flex items-center space-x-4">
        <p className="text-green-600">{leaveData.document.name}</p>
        <iframe
          src={leaveData.documentURL}
          className="w-20 h-20 border"
          title="Document Preview"
        ></iframe>
      </div>
    )}
    {leaveData.errorMessage && (
      <p className="text-red-500 text-sm">{leaveData.errorMessage}</p>
    )}
  </div>
)}


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

export default LeavePage;
