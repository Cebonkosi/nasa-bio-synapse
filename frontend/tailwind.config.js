/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nasa-blue': '#0B3D91',
        'nasa-red': '#FC3D21',
        'nasa-gold': '#FFD700',
        'nasa-cyan': '#00F5FF',
        'space-black': '#000013',
        'space-blue': '#001233',
        'deep-space': '#00072D',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #000013 0%, #001233 50%, #00072D 100%)',
        'nebula': 'radial-gradient(circle at 20% 80%, rgba(11, 61, 145, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(252, 61, 33, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 245, 255, 0.1) 0%, transparent 50%)',
      }
    },
  },
  plugins: [],
}