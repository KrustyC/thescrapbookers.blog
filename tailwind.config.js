/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "title-appear":
          "scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1)",
        "text-appear":
          "fade-in 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0)",
      },
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
      keyframes: {
        scale: {
          "100%": {
            transform: "scale(1)",
          },
        },
        "fade-in": {
          "100%": {
            opacity: 1,
            filter: "blur(0)",
          },
        },
      },
      screens: {
        "3xl": "1600px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
      width: {
        max: "1240px",
      },
    },
  },
  plugins: [],
};
