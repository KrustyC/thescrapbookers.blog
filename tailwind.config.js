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
        primary: "#21F8EC",
        black: "#1E1E1E",
      },
      fontSize: {
        "10xl": "10rem",
      },
      screens: {
        "3xl": "1600px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
    },
  },
  plugins: [],
};
