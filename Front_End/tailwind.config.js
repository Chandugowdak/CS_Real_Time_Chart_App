/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the extensions to fit your project
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // DaisyUI plugin
  ],
};
