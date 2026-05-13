/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#121212",
          page: "#121212",
          sidebar: "#181818",
          card: "#1F1F1F",
          cardHover: "#242424",
          elevated: "#181818",
          card2: "#242424",
          border: "#303030",
          softBorder: "#262626",
          text: "#F5F5F5",
          subtext: "#C7C7C7",
          muted: "#8A8A8A",
          track: "#303030",
          orange: "#F47B3F",
          orangeDark: "#D65A2E",
          orangeSoft: "#FF925C",
        },
      },
      boxShadow: {
        "app-card": "0 24px 70px rgba(0, 0, 0, 0.32)",
        "app-glow": "0 0 24px rgba(244, 123, 63, 0.22)",
        "app-glow-sm": "0 0 18px rgba(244, 123, 63, 0.18)",
      },
    },
  },
  plugins: [],
};
