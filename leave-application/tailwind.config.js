/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1e3a8a', // Dark blue for today's date
        'blue-300': '#93c5fd', // Light blue for current month dates
        'blue-900': '#1e3a8a', // Blue for current month dates
        'red-600': '#e11d48', // Dark red for Sundays in the current month
        'red-200': '#fca5a5', // Light red for Sundays in previous/next month
      },
    },
  },
  plugins: [],
}

