/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        cream: "#FFF8EE",
        "cream-dark": "#181729",
        card: "#FFFFFF",
        "card-dark": "#22213B",
        // Accent / ink
        ink: "#23214A",
        "ink-soft": "#33325E",
        gold: "#FFC145",
        "gold-fg": "#412402",
        // Text
        "text-primary": "#23214A",
        "text-primary-dark": "#F1EFE8",
        "text-secondary": "#888780",
        "text-secondary-dark": "#B4B2A9",
        // Semantic income/expense
        income: "#0F6E56",
        "income-dark": "#5DCAA5",
        expense: "#993C1D",
        "expense-dark": "#F0997B",
      },
      fontFamily: {
        display: ["Fredoka_500Medium"],
        body: ["BeVietnamPro_400Regular"],
        "body-medium": ["BeVietnamPro_500Medium"],
      },
    },
  },
  darkMode: "media", // follows the system color scheme automatically
  plugins: [],
};
