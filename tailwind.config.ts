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
        table: "inset -3px 0px 0px 0px #EAECF0",
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
