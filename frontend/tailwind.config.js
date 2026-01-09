export default {
  content: ['index.html', 'src/**/*.{js,jsx,svg}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      current: 'currentColor',
      transparent: 'transparent',
      gray: {
        light: '#F5F5F5',
        medium: '#E0E0E0',
        dark: '#333333',
      },
      navy: {
        DEFAULT: '#002B5B',
        dark: '#001F4D',
      },
      goldenrod: '#DAA520',
      red: {
        light: '#FF5C5C',
        dark: '#CC0000',
      },
      green: {
        light: '#03C03C',
        dark: '#008000',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    screens: {
      ms: '320px',
      mm: '375px',
      ml: '425px',
      tab: '768px',
      ls: '1024px',
      lm: '1280px',
      ll: '1440px',
      fhd: '1920px',
      '4k': '2560px',
    },
    boxShadow: {
      DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
    },
  },
  plugins: [],
}
