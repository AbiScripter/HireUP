/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add new colors
      colors: {
        "custom-purple": "#902bf5",
        "custom-black": "#222222",
      },
    },
  },
  plugins: [],
};
