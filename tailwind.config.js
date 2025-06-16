module.exports = {
  darkMode: "class", // or 'media' or 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
