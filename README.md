# Atomos Genesis Component Library

## Step 1: Installation

Begin by installing the Atomos Genesis Component Library via npm:

```bash
npm i @atomos_tech/genesis
```

## Step 2: Import CSS

Import the library's CSS in your root page to apply the default styles:

```typescript
import "@atomos_tech/genesis/style";
```

**Make sure to import it right above your global.css file to override the default colour palette!**

For example:

```typescript
import "@atomos_tech/genesis/style";
import "./globals.css";
```

## Step 3: Set Up Theme Container

Wrap your application content within a `theme-primary` class to ensure consistent theming across your app. Add this snippet to your root or base page:

```typescript
<div className="theme-primary">{children}</div>
```

## Step 4: Configure Tailwind

You can set up the Tailwind CSS configuration in your tailwind.config.ts or tailwind.config.js and copy the theme styling below:

```
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

```

## Step 5: Define Global Styles

Add the following CSS to your `global.css` file to define the theme variables and styles:

```css
@layer base {
  :root {
    /* Theme Primary Colors */
    .theme-primary {
      --primary-25: #f5faff;
      --primary-50: #eff8ff;
      --primary-100: #d1e9ff;
      --primary-200: #b2ddff;
      --primary-300: #84caff;
      --primary-400: #53b1fd;
      --primary-500: #2e90fa;
      --primary-600: #1570ef;
      --primary-700: #175cd3;
      --primary-800: #1849a9;
      --primary-900: #194185;
    }

    /* Gray Colors */
    --gray-25: #fff;
    --gray-50: #f9fafb;
    --gray-100: #f2f4f7;
    --gray-200: #eaecf0;
    --gray-300: #d0d5dd;
    --gray-400: #98a2b3;
    --gray-500: #667085;
    --gray-600: #475467;
    --gray-700: #344054;
    --gray-800: #1d2939;
    --gray-900: #101828;

    /* Error Colors */
    --error-25: #fffbfa;
    --error-50: #fef3f2;
    --error-100: #fee4e2;
    --error-200: #fecdca;
    --error-300: #fda29b;
    --error-400: #f97066;
    --error-500: #f04438;
    --error-600: #d92d20;
    --error-700: #b42318;
    --error-800: #912018;
    --error-900: #7a271a;

    /* Warning Colors */
    --warning-25: #fffdf5;
    --warning-50: #fffaeb;
    --warning-100: #fef0c7;
    --warning-200: #fedf89;
    --warning-300: #fec84b;
    --warning-400: #fdb022;
    --warning-500: #f79009;
    --warning-600: #dc6803;
    --warning-700: #b54708;
    --warning-800: #93370d;
    --warning-900: #7a2e0e;

    /* Success Colors */
    --success-25: #f6fef9;
    --success-50: #ecfdf3;
    --success-100: #d1fadf;
    --success-200: #a6f4c5;
    --success-300: #6ce9a6;
    --success-400: #32d583;
    --success-500: #12b76a;
    --success-600: #039855;
    --success-700: #027a48;
    --success-800: #05603a;
    --success-900: #054f31;
  }
  /* RDP Styles */
  .rdp {
    --rdp-cell-size: 28px;
    --rdp-caption-font-size: 15px;
  }
}
```

## Step 6: Usage

With the library set up, you can start using the provided components. Below are examples of how to implement the Button and Chip components.

### Import Components

Import the required components from the `@atomos_tech/genesis` package:

```typescript
import { Button, Chip } from "@atomos_tech/genesis";
```

### Example Usage

Here is how you can integrate the Button and Chip into your page:

```typescript
<Button variant="filled" intent="primary">
    Primary
</Button>
<Chip intent="primary" size="lg">
    Primary
</Chip>
```

## Example Page

Here's an example of how you might set up a simple page using the library:

```typescript
import { Button, Chip } from "@atomos_tech/genesis";

export default function ExamplePage() {
  return (
    <div className="theme-brand p-4">
      <h1 className="text-2xl font-bold mb-4">Atomos Genesis Example</h1>
      <div className="mb-4">
        <Button variant="filled" intent="primary">
          Primary Button
        </Button>
      </div>
      <div>
        <Chip intent="primary" size="lg">
          Primary Chip
        </Chip>
      </div>
    </div>
  );
}
```

## Adding Interactivity

You can enhance the user experience by adding more interactive components and styles. Here's an example with a form and some interactive elements:

```typescript
import { Button, Chip } from "@atomos_tech/genesis";
import { useState } from "react";

export default function InteractivePage() {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <div className="theme-brand p-4">
      <h1 className="text-2xl font-bold mb-4">
        Interactive Atomos Genesis Example
      </h1>

      <div className="mb-4">
        <Button
          variant="filled"
          intent="primary"
          onClick={() => setButtonClicked(!buttonClicked)}
        >
          {buttonClicked ? "Clicked!" : "Click Me"}
        </Button>
      </div>

      <div className="mb-4">
        <Chip intent="primary" size="lg">
          {buttonClicked ? "Active Chip" : "Inactive Chip"}
        </Chip>
      </div>
    </div>
  );
}
```

These instructions will help you effectively integrate and utilize the `@atomos_tech/genesis` library in your web applications, providing a consistent and visually appealing user interface.
