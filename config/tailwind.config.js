/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      "gray": {
        "light": "#F5F5F5",
        "medium": "#E0E0E0",
        "dark": "#333333"
      },
      "navy": {
        DEFAULT: "#002B5B",
        "dark": "#001F4D",
      },
      "goldenrod": "#DAA520",
      "red": "#CC0000",
    },
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"]
    },
    screens: {
      "ms": "320px",
      "mm": "375px",
      "ml": "425px",
      "tab": "768px",
      "ls": "1024px",
      "lm": "1280px",
      "ll": "1440px",
      "fhd": "1920px",
      "4k": "3840px",
    },
    "boxShadow": {
      DEFAULT: "0 4px 4px rgba(0, 0, 0, 0.25)"
    }
  },
  plugins: [],
}

