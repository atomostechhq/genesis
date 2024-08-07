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

## Step 3: Set Up Theme Container

Wrap your application content within a `theme-brand` class to ensure consistent theming across your app. Add this snippet to your root or base page:

```typescript
<div className="theme-brand">{children}</div>
```

## Step 4: Configure Tailwind

You can set up the Tailwind CSS configuration by following the instructions provided [here](tailwind.config.ts).

## Step 5: Define Global Styles

Add the following CSS to your `global.css` file to define the theme variables and styles:

You can check the css file [here](app/globals.css)

```css
@layer base {
  :root {
    .theme-brand {
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
    .theme-bluegray {
      --primary-25: #fcfcfd;
      --primary-50: #f8f9fc;
      --primary-100: #eaecf5;
      --primary-200: #d5d9eb;
      --primary-300: #afb5d9;
      --primary-400: #717bbc;
      --primary-500: #4e5ba6;
      --primary-600: #3e4784;
      --primary-700: #363f72;
      --primary-800: #293056;
      --primary-900: #101323;
    }
    .theme-bluelight {
      --primary-25: #f5fbff;
      --primary-50: #f0f9ff;
      --primary-100: #e0f2fe;
      --primary-200: #b9e6fe;
      --primary-300: #7cd4fd;
      --primary-400: #36bffa;
      --primary-500: #0ba5ec;
      --primary-600: #0086c9;
      --primary-700: #026aa2;
      --primary-800: #065986;
      --primary-900: #0b4a6f;
    }
    .theme-indigo {
      --primary-25: #f5f8ff;
      --primary-50: #eef4ff;
      --primary-100: #e0eaff;
      --primary-200: #c7d7fe;
      --primary-300: #a4bcfd;
      --primary-400: #8098f9;
      --primary-500: #6172f3;
      --primary-600: #444ce7;
      --primary-700: #3538cd;
      --primary-800: #2d31a6;
      --primary-900: #2d3282;
    }
    .theme-purple {
      --primary-25: #fafaff;
      --primary-50: #f4f3ff;
      --primary-100: #ebe9fe;
      --primary-200: #d9d6fe;
      --primary-300: #bdb4fe;
      --primary-400: #9b8afb;
      --primary-500: #7a5af8;
      --primary-600: #6938ef;
      --primary-700: #5925dc;
      --primary-800: #4a1fb8;
      --primary-900: #3e1c96;
    }
    .theme-violet {
      --primary-25: #fcfaff;
      --primary-50: #f9f5ff;
      --primary-100: #f4ebff;
      --primary-200: #e9d7fe;
      --primary-300: #d6bbfb;
      --primary-400: #b692f6;
      --primary-500: #9e77ed;
      --primary-600: #7f56d9;
      --primary-700: #6941c6;
      --primary-800: #53389e;
      --primary-900: #42307d;
    }
    .theme-pink {
      --primary-25: #fef6fb;
      --primary-50: #fdf2fa;
      --primary-100: #fce7f6;
      --primary-200: #fcceee;
      --primary-300: #faa7e0;
      --primary-400: #f670c7;
      --primary-500: #ee46bc;
      --primary-600: #dd2590;
      --primary-700: #c11574;
      --primary-800: #9e165f;
      --primary-900: #851651;
    }
    .theme-rose {
      --primary-25: #fff5f6;
      --primary-50: #fff1f3;
      --primary-100: #ffe4e8;
      --primary-200: #fecdd6;
      --primary-300: #fea3b4;
      --primary-400: #fd6f8e;
      --primary-500: #f63d68;
      --primary-600: #e31b54;
      --primary-700: #c01048;
      --primary-800: #a11043;
      --primary-900: #89123e;
    }
    .theme-orange {
      --primary-25: #fffaf5;
      --primary-50: #fff6ed;
      --primary-100: #ffead5;
      --primary-200: #fddcab;
      --primary-300: #feb273;
      --primary-400: #fd853a;
      --primary-500: #fb6514;
      --primary-600: #ec4a0a;
      --primary-700: #c4320a;
      --primary-800: #9c2a10;
      --primary-900: #7e2410;
    }
    .rdp {
      --rdp-cell-size: 28px;
      --rdp-caption-font-size: 15px;
    }
  }
}

.skeleton {
  border-radius: 2px;
  display: inline-block;
  line-height: 100%;
  width: 100%;
  background-color: #fff;
  background-size: 1000px 1000px;
  background-image: linear-gradient(
    100deg,
    #e8e8e8 20%,
    #fafafa 50%,
    #e8e8e8 60%
  );
  animation: placeholderShimmer 1.5s linear infinite forwards;
}

/* Skeleton animation*/
@keyframes placeholderShimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

.skeleton.circle {
  border-radius: 50%;
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
