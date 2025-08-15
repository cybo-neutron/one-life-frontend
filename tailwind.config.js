import { purple, zinc } from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ...purple,
        },
        secondary: {
          ...zinc,
        },
      },
    },
  },
};
