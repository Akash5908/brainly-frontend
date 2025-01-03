import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(h|bg|text|px|pt|rounded)-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          300: "#e0e7ff",
          500: "#716bda",
          700: "#5045e5",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          " -ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".content-auto": {
          "content-visibility": "auto",
        },
        ".content-hidden": {
          "content-visibility": "hidden",
        },
        ".content-visible": {
          "content-visibility": "visible",
        },
      });
    }),
  ],
} satisfies Config;
