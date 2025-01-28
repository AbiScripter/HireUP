/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#902bf5",
        primaryhover: "#731bc3",
      },
      screens: {
        xs: "340px",
      },
    },
  },

  plugins: [],
};
