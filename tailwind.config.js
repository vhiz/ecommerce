import { withAnimations } from "animated-tailwindcss";

/** @type {import('tailwindcss').Config} */
export default withAnimations({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    themes: ["winter", "business"],
    logs: false,
  },
});
