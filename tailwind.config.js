/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        theme_white: {
          900: "rgb(247, 248, 250, 1)",
        },

        theme_light_green: {
          900: "rgb(84, 160, 43, 1)",
          300: "rgb(84, 160, 43, 0.3)",
        },
        theme_dark_green: {
          900: "rgb(46, 131, 87, 1)",
          300: "rgb(46, 131, 87, 0.3)",
        },
        theme_indigo: {
          900: "rgb(42, 4, 52, 1)",
          300: "rgb(42, 4, 52, 0.3)",
        },
        theme_gold: {
          900: "rgb(177, 159, 50, 1)",
          300: "rgb(177, 159, 50, 0.3)",
        },
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        poppins: ["var(--font-poppins)"],
        patua: ["var(--font-patua)"],
        mulish: ["var(--font-mulish)"],
      },
    },
  },
  plugins: [],
});
