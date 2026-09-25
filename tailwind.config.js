/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // ---- Redesign palette (see redesign/HANDOVER.md section 2) ----
        forest: {
          900: "#16372A",
          700: "#1E4A38",
        },
        leaf: {
          600: "#2E8357",
        },
        logo: "#347D2E",
        sage: {
          50: "#F2F7F1",
          100: "#E4EEDF",
        },
        linen: "#F7F3EA",
        paper: "#FFFDF8",
        sand: {
          100: "#EFE9DC",
          200: "#E6DFCF",
          rule: "#E0D8C6",
          300: "#D9D0BC",
          400: "#CFC6B2",
        },
        ink: {
          900: "#1F2A24",
          700: "#3D4A43",
          500: "#5A6660",
        },
        gold: {
          400: "#E3B55B",
          600: "#B7832F",
        },
        amber: {
          50: "#FBF1DC",
          700: "#8A5A12",
          900: "#5C3B08",
        },
        mist: {
          200: "#D5E0D8",
          300: "#A9BDB0",
        },
        danger: "#B42318",

        // ---- Legacy colours: remove in phase 7 once nothing uses them ----
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
      boxShadow: {
        hero: "0 1px 0 #E6DFCF, 0 24px 48px -24px rgba(22,55,42,0.35)",
        handle: "0 4px 14px rgba(22,55,42,0.35)",
        callbar: "0 -8px 24px -12px rgba(22,55,42,0.35)",
        soft: "0 12px 32px -12px rgba(22,55,42,0.28)",
      },
      maxWidth: {
        content: "1200px",
      },
      // Legacy breakpoints: remove in phase 7 if unused.
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
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        // Legacy font utilities: remove in phase 7.
        poppins: ["var(--font-poppins)"],
        patua: ["var(--font-patua)"],
        mulish: ["var(--font-mulish)"],
      },
    },
  },
  plugins: [],
});
