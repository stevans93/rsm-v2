/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
    colors: {
      main: "#222477",
      secondMain: "#111139",
      primary: "#222477",
      secondary: "#1B1F23",
      red: "rgb(220 38 38)",
      grey: "#A8A8A8",
      lightGray: "#F8F8F8",
      spanGray: "#9E9E9E",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
