import path from 'path';

export default {
  plugins: {
    tailwindcss: { config: 'config/tailwind.config.js' },
    autoprefixer: {},
    // "postcss-modules": {
    //   resolve: (file, importer) => {
    //     return path.resolve(
    //       path.dirname(importer),
    //       file.replace(/^@/, "src") 
    //     );
    //   },
    // },
  },
};
