/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "uk-flag": "url('/icons/uk.png')",
        "ita-flag": "url('/icons/ita.png')",
      },
      colors: {
        primary: "#FB7A7A",
        black: "#1E1E1E",
        cheatsheet: "#FF7A00",
      },
      fontSize: {
        "10xl": "10rem",
      },
      screens: {
        "3xl": "1600px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
      width: {
        "max": "1240px",
      }
    },
  },
  plugins: [],
};
