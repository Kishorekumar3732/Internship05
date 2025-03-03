import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LeavePage from "./pages/LeavePage";
import LeaveStatus from "./pages/LeaveStatus";
import ApplyOverTime from "./pages/ApplyOverTime";
import DateDetails from "./pages/DateDetails";
import ResignationPage from "./pages/ResignationPage";
import ResignationStatus from "./pages/ResignationStatus";
import SettingsPage from "./pages/SettingsPage"; // Import SettingsPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/leave-status" element={<LeaveStatus />} />
        <Route path="/apply-overtime" element={<ApplyOverTime />} />
        <Route path="/date/:date" element={<DateDetails />} />
        <Route path="/resignation" element={<ResignationPage />} />
        <Route path="/resignation-status" element={<ResignationStatus />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
