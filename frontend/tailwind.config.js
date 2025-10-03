/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nasa: {
          blue: '#0B3D91',
          red: '#FC3D21',
          dark: '#1a202c'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s linear infinite',
      }
    },
  },
  plugins: [],
}