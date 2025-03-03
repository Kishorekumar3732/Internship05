import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CalendarComponent = ({ leaves = [] }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [direction, setDirection] = useState(0);

  const { firstDayOfMonth, firstCalendarDay, numWeeks } = useMemo(() => {
    const firstDayOfMonth = new Date(activeYear, activeMonth, 1);
    const firstCalendarDay = new Date(firstDayOfMonth);
    firstCalendarDay.setDate(
      firstCalendarDay.getDate() - (firstCalendarDay.getDay() === 0 ? 6 : firstCalendarDay.getDay() - 1)
    );
    const totalDays =
      (new Date(activeYear, activeMonth + 1, 0) - firstCalendarDay) / (1000 * 60 * 60 * 24) + 1;
    const numWeeks = Math.ceil(totalDays / 7);
    return { firstDayOfMonth, firstCalendarDay, numWeeks };
  }, [activeMonth, activeYear]);

  const handleMonthChange = ({ activeStartDate }) => {
    if (!activeStartDate) return;
    const newMonth = activeStartDate.getMonth();
    const newYear = activeStartDate.getFullYear();

    setDirection(newYear > activeYear || (newYear === activeYear && newMonth > activeMonth) ? 1 : -1);
    setActiveMonth(newMonth);
    setActiveYear(newYear);
    setDate(activeStartDate);
  };

  const isLeaveDate = (tileDate) => {
    if (!Array.isArray(leaves) || leaves.length === 0) return false;
    return leaves.some(({ from, to }) => {
      const fromDate = new Date(from).setHours(0, 0, 0, 0);
      const toDate = new Date(to).setHours(23, 59, 59, 999);
      const currentTile = tileDate.setHours(12, 0, 0, 0);
      return currentTile >= fromDate && currentTile <= toDate;
    });
  };

  const handleDateClick = (selectedDate) => {
    if (!(selectedDate instanceof Date)) return;
    
    // Only allow navigation if the selected date is within the current month
    if (selectedDate.getMonth() !== activeMonth || selectedDate.getFullYear() !== activeYear) return;

    // Move to the next date
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // If the next date moves to the next month, update the active month and year
    if (nextDate.getMonth() !== activeMonth || nextDate.getFullYear() !== activeYear) {
      setActiveMonth(nextDate.getMonth());
      setActiveYear(nextDate.getFullYear());
    }

    const formattedDate = nextDate.toISOString().split("T")[0]; // Converts to YYYY-MM-DD
    navigate(`/date/${formattedDate}`); // Passes the correct date
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full mt-[64px]">
      <div className="flex-1 overflow-auto px-4 pb-6 flex flex-col items-center">
        <motion.div
          key={`${activeYear}-${activeMonth}`}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-4xl"
        >
          <Calendar
            onClickDay={handleDateClick}
            value={date}
            onActiveStartDateChange={handleMonthChange}
            showNeighboringMonth={true}
            tileClassName={({ date: tileDate }) => {
              const tileMonth = tileDate.getMonth();
              const today = new Date().setHours(0, 0, 0, 0);
              const tileTime = tileDate.setHours(0, 0, 0, 0);

              let baseStyle = "relative w-16 h-16 flex items-center justify-center text-sm font-bold rounded-lg border border-gray-300";

              if (tileTime === today) return `${baseStyle} bg-blue-700 text-white`;
              if (tileDate.getDay() === 0) {
                return tileMonth === activeMonth
                  ? `${baseStyle} bg-red-600 text-white`
                  : `${baseStyle} bg-red-300 text-black`;
              }
              if (tileMonth !== activeMonth) return `${baseStyle} bg-blue-200 text-gray-700`;
              if (isLeaveDate(tileDate)) return `${baseStyle} bg-yellow-400 text-black`;

              return `${baseStyle} bg-blue-500 text-white`;
            }}
          />
        </motion.div>
      </div>

      <div className="mt-6 w-full max-w-2xl text-center flex justify-between text-lg font-semibold">
        <p className="text-green-600">Present: 20</p>
        <p className="text-yellow-600">Leave: 5</p>
        <p className="text-red-600">Absent: 2</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
