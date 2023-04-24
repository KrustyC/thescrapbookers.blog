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
        primary: "#F7941D",
      },
    },
  },
  plugins: [],
};
