import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

console.log("PostCSS config loaded");

export default {
  plugins: [
    tailwindcss,
    autoprefixer
  ]
};
