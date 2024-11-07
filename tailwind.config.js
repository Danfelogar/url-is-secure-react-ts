/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lab: '#f2f2f2',
        snow: '#fefefe',
        alpes: '#f4f6fc',
        malva: '#aec3d4',
        palo: '#c7d9e0',
        cobrizo: '#939393',
        gold: '#caaa39',
      },
    },
  },
  plugins: [],
};
