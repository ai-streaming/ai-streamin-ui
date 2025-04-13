import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F8FAFC",
            foreground: "#0F172A",
            primary: {
              50: "#EFF6FF",
              100: "#DBEAFE",
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6",
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#2563EB",
              foreground: "#FFFFFF"
            }
          }
        },
        dark: {
          colors: {
            background: "#0F172A",
            foreground: "#F8FAFC",
            primary: {
              50: "#1E3A8A",
              100: "#1E40AF",
              200: "#1D4ED8",
              300: "#2563EB",
              400: "#3B82F6",
              500: "#60A5FA",
              600: "#93C5FD",
              700: "#BFDBFE",
              800: "#DBEAFE",
              900: "#EFF6FF",
              DEFAULT: "#60A5FA",
              foreground: "#0F172A"
            }
          }
        }
      }
    })
  ]
};
