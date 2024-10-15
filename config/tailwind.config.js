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
        "dark-navy": "#001F4D",
      },
      "goldenrod": "#DAA520",
      "red": "#FF6961",
    },
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"]
    },
  },
  plugins: [],
}

