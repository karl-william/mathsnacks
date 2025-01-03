import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["emerald"],
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
  }
};
