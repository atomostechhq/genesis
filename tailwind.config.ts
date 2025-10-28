import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backdrop: "rgba(0, 0, 0, 0.5)",

        // Primary Colors
        primary: {
          25: "var(--primary-25)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },

        // Gray Colors
        gray: {
          25: "var(--gray-25)",
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },

        // Error Colors
        error: {
          25: "var(--error-25)",
          50: "var(--error-50)",
          100: "var(--error-100)",
          200: "var(--error-200)",
          300: "var(--error-300)",
          400: "var(--error-400)",
          500: "var(--error-500)",
          600: "var(--error-600)",
          700: "var(--error-700)",
          800: "var(--error-800)",
          900: "var(--error-900)",
        },

        // Warning Colors
        warning: {
          25: "var(--warning-25)",
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          200: "var(--warning-200)",
          300: "var(--warning-300)",
          400: "var(--warning-400)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
          800: "var(--warning-800)",
          900: "var(--warning-900)",
        },

        // Success Colors
        success: {
          25: "var(--success-25)",
          50: "var(--success-50)",
          100: "var(--success-100)",
          200: "var(--success-200)",
          300: "var(--success-300)",
          400: "var(--success-400)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          700: "var(--success-700)",
          800: "var(--success-800)",
          900: "var(--success-900)",
        },
        blue: {
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
      },
      fontSize: {
        "display-2xl": "4.5rem", // 72px
        "display-xl": "3.75rem", // 60px
        "display-lg": "3rem", // 48px
        "display-md": "2.25rem", // 36px
        "display-sm": "1.875rem", // 30px
        "display-xs": "1.5rem", // 24px
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
        table: "inset -3px 0px 0px 0px #EAECF0",
        tableRight: "inset 3px 0px 0px 0px #EAECF0",
      },
      animation: {
        "slide-in-top": "slide-in-top 0.5s ease forwards",
        "slide-in-right": "slide-in-right 0.5s ease forwards",
        "spin-slow": "spin-slow 1.5s linear infinite",
      },
      keyframes: {
        "slide-in-top": {
          from: {
            transform: "translateY(-100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "slide-in-right": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
  // prefix: 'agcl-',
};
export default config;
