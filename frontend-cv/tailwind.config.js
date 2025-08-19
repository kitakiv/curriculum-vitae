/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg100: "var(--color-bg-100)",
        bg33: "var(--color-bg-33)",
        bg0: "var(--color-bg-0)",
        rn100: "var(--color-round-100)",
        rn0: "var(--color-round-0)",
        txSecond: "var(--color-tx-second)",
        txFirst100: "var(--color-tx-first-100)",
        txFirst0: "var(--color-tx-first-0)",
        light: "var(--color-light)",
        black: "var(--color-black)",
      },
      keyframes: {
        'gradient-shift': {
          '0%': { 'background-position': '0% 33%' },
          '33%': { 'background-position': '100% 33%' },
          '100%': { 'background-position': '0% 33%' },
        },
        'gradient-shift-reverse': {
          '0%': { 'background-position': '100% 0%' },
          '100%': { 'background-position': '0% 100%' },
        }
      },
      animation: {
        'gradient-animate': 'gradient-shift 10s ease-in-out infinite alternate',
        'gradient-animate-reverse': 'gradient-shift-reverse 3s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
}

