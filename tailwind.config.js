module.exports = {
  darkMode: "class", // or 'media' or 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"], // Kept for future use
        geistMono: ["Geist Mono", "monospace"],
        geist: ["Geist", "sans-serif"],
        code: ["var(--font-jetbrains)", "monospace"],
        sans: ["Geist Mono", "monospace"], // Default sans-serif now uses Geist Mono
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
