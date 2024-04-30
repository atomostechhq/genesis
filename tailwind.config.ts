import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-25": "var(--primary-25)",
        "primary-50": "var(--primary-50)",
        "primary-100": "var(--primary-100)",
        "primary-200": "var(--primary-200)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "primary-500": "var(--primary-500)",
        "primary-600": "var(--primary-600)",
        "primary-700": "var(--primary-700)",
        "primary-800": "var(--primary-800)",
        "primary-900": "var(--primary-900)",

        brand: {
          25: "#f5faff",
          50: "#eff8ff",
          100: "#d1e9ff",
          200: "#b2ddff",
          300: "#84caff",
          400: "#53b1fd",
          500: "#2e90fa",
          600: "#1570ef",
          700: "#175cd3",
          800: "#1849a9",
          900: "#194185",
        },

        bluegray: {
          25: "#fcfcfd",
          50: "#f8f9fc",
          100: "#eaecf5",
          200: "#d5d9eb",
          300: "#afb5d9",
          400: "#717bbc",
          500: "#4e5ba6",
          600: "#3e4784",
          700: "#363f72",
          800: "#293056",
          900: "#101323",
        },

        bluelight: {
          25: "#f5fbff",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e6fe",
          300: "#7cd4fd",
          400: "#36bffa",
          500: "#0ba5ec",
          600: "#0086c9",
          700: "#026aa2",
          800: "#065986",
          900: "#0b4a6f",
        },

        indigo: {
          25: "#f5f8ff",
          50: "#eef4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8098f9",
          500: "#6172f3",
          600: "#444ce7",
          700: "#3538cd",
          800: "#2d31a6",
          900: "#2d3282",
        },

        purple: {
          25: "#fafaff",
          50: "#f4f3ff",
          100: "#ebe9fe",
          200: "#d9d6fe",
          300: "#bdb4fe",
          400: "#9b8afb",
          500: "#7a5af8",
          600: "#6938ef",
          700: "#5925dc",
          800: "#4a1fb8",
          900: "#3e1c96",
        },

        violet: {
          25: "#fcfaff",
          50: "#f9f5ff",
          100: "#f4ebff",
          200: "#e9d7fe",
          300: "#d6bbfb",
          400: "#b692f6",
          500: "#9e77ed",
          600: "#7f56d9",
          700: "#6941c6",
          800: "#53389e",
          900: "#42307d",
        },

        pink: {
          25: "#fef6fb",
          50: "#fdf2fa",
          100: "#fce7f6",
          200: "#fcceee",
          300: "#faa7e0",
          400: "#f670c7",
          500: "#ee46bc",
          600: "#dd2590",
          700: "#c11574",
          800: "#9e165f",
          900: "#851651",
        },

        rose: {
          25: " #fff5f6",
          50: "#fff1f3",
          100: "#ffe4e8",
          200: "#fecdd6",
          300: "#fea3b4",
          400: "#fd6f8e",
          500: "#f63d68",
          600: "#e31b54",
          700: "#c01048",
          800: "#a11043",
          900: "#89123e",
        },

        orange: {
          25: "#fffaf5",
          50: "#fff6ed",
          100: "#ffead5",
          200: "#fddcab",
          300: "#feb273",
          400: "#fd853a",
          500: "#fb6514",
          600: "#ec4a0a",
          700: "#c4320a",
          800: "#9c2a10",
          900: "#7e2410",
        },

        gray: {
          25: "#fff",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },
      },
      fontSize: {
        "display-2xl": "4.5rem", // 72px
        "display-xl": "3.75rem", // 60px
        "display-lg": "3rem", // 48px
        "display-md": "2.25rem", // 36px
        "display-sm": "1.875rem", // 30px
        "display-xs": "1.5rem", // 24px
        "text-xl": "1.25rem", // 20px
        "text-lg": "1.125rem", // 18px
        "text-md": "1rem", // 16px
        "text-sm": "0.875rem", // 14px
        "text-xs": "0.75rem", // 12px
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
        md: "1px 2px 12px 0px rgba(112, 112, 112, 0.25)",
        lg: "0px 4px 12px 0px rgba(16, 24, 40, 0.25)",
        table:"inset -4px 0px 0px 0px #D0D5DD"
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.5s ease backwards',
        'slide-in-right': 'slide-in-right 0.5s ease backwards',
      },
      keyframes: {
        'slide-in-top': {
          from: {
            transform: 'translateY(-100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        'slide-in-right': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
