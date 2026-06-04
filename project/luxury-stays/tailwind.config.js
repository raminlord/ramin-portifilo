/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        amber: { 400: '#fbbf24', 500: '#f59e0b' },
        slate: { 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
      },
    },
  },
  plugins: [],
}
