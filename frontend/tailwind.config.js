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
        xxs: "330px",
        xs: "450px",
      },
    },
  },

  plugins: [],
};
