import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Edit3 } from "lucide-react";

const SettingsPage = () => {
  // Load dark mode from localStorage
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode class when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-96">
        {/* General Settings */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-gray-200">
              General Settings
            </h2>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-all duration-300"
              >
                {isDarkMode ? (
                  <Sun className="text-yellow-500" />
                ) : (
                  <Moon className="text-gray-700" />
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Personal Settings */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer mt-4 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-gray-200">
              Personal Settings
            </h2>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <button className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300">
                <Edit3 />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
