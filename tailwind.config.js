/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx}", "./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'gotravel-primary': {
          100: "#ccf2f4",
          200: "#99e4e9",
          300: "#66d7df",
          400: "#33c9d4",
          500: "#00bcc9",
          600: "#0096a1",
          700: "#007179",
          800: "#004b50",
          900: "#002628"
        },
        'gotravel-secondary': {
          100: "#fbe9e0",
          200: "#f6d3c1",
          300: "#f2bea3",
          400: "#eda884",
          500: "#e99265",
          600: "#ba7551",
          700: "#8c583d",
          800: "#5d3a28",
          900: "#2f1d14"
        },
        'gotravel-black': {
          100: "#d4d5db",
          200: "#aaaab7",
          300: "#7f8093",
          400: "#55556f",
          500: "#2a2b4b",
          600: "#22223c",
          700: "#191a2d",
          800: "#11111e",
          900: "#08090f"
        },
      }
    },
  },
  plugins: [],
};
