/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0a", // Near black background
        card: "#111111",   // Slightly lighter for cards
        brand: "#fbbf24",  // That vibrant gold/yellow (Amber 400)
        ink: "#ffffff",    // Pure white for headers
        muted: "#a1a1aa",  // Zinc 400 for body text
        border: "#1f2937", // Gray 800 for subtle lines
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // This design uses a clean sans-serif
      }
    },
  },
  plugins: [],
}