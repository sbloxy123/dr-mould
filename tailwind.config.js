/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Design tokens: see redesign/HANDOVER.md section 2.
      colors: {
        forest: {
          900: "#16372A", // top bar, dark bands, footer, headings
          700: "#1E4A38", // primary buttons, quote panel, icon tiles, links
        },
        leaf: {
          600: "#2E8357", // eyebrows, active nav, link hover, check icons
        },
        logo: "#347D2E",
        sage: {
          50: "#F2F7F1", // photo upload drop zone
          100: "#E4EEDF", // chips, icon backgrounds, step circles
        },
        linen: "#F7F3EA", // page background
        paper: "#FFFDF8", // header, cards, form panels
        sand: {
          100: "#EFE9DC", // inactive filter badge
          200: "#E6DFCF", // card and header borders
          rule: "#E0D8C6", // gallery filter toolbar rule
          300: "#D9D0BC", // FAQ and list dividers
          400: "#CFC6B2", // input borders
        },
        ink: {
          900: "#1F2A24", // primary text
          700: "#3D4A43", // body copy
          500: "#5A6660", // muted and caption text
        },
        gold: {
          400: "#E3B55B", // "After" tags, eyebrows and icons on dark
          600: "#B7832F", // step numbers (large text only)
        },
        amber: {
          50: "#FBF1DC", // health note background
          700: "#8A5A12", // health note icon
          900: "#5C3B08", // health note text
        },
        mist: {
          200: "#D5E0D8", // text on dark green
          300: "#A9BDB0", // muted text on dark green
        },
        danger: "#B42318", // form errors
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
      },
    },
  },
  plugins: [],
};
