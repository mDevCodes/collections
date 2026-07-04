/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        dt: "720px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        faint: "var(--faint)",
        border: "var(--border)",
        "pill-border": "var(--pill-border)",
        accent: "var(--accent)",
        "accent-text": "var(--accent-text)",
        field: "var(--field)",
        "field-border": "var(--field-border)",
        "nav-border": "var(--nav-border)",
        divider: "var(--divider)",
        "status-bg": "var(--status-bg)",
        "toggle-bg": "var(--toggle-bg)",
        "toggle-active": "var(--toggle-active)",
      },
      boxShadow: {
        cover: "var(--cover-shadow)",
        "toggle-active": "var(--toggle-active-shadow)",
      },
    },
  },
  plugins: [],
};
