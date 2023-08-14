/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "title-appear": "scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1)",
        "text-appear": "fade-in 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0)",
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
        "lg": [
          "1.125rem",
          {
            lineHeight: "1.6rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "xl": [
          "1.3rem",
          {
            lineHeight: "1.8rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "2xl": [
          "1.6rem",
          {
            lineHeight: "1.9rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "3xl": [
          "1.8rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "4xl": [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "5xl": [
          "2.8rem",
          {
            lineHeight: "3rem",
            letterSpacing: "0.025rem",
            fontWeight: "400",
          },
        ],
        "9xl": [
          "8rem",
          {
            lineHeight: "7.5rem",
            letterSpacing: "0.025rem",
            fontWeight: "500",
          },
        ],
        "10xl": [
          "10rem",
          {
            lineHeight: "9rem",
            letterSpacing: "0.025rem",
            fontWeight: "500",
          },
        ],
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
