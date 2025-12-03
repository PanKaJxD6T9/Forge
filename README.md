# Forge - Backend Component Library Website

A modern, interactive website for the Forge backend component library featuring dark mode, smooth animations, and a beautiful UI.

## Features

- 🎨 **Modern Dark Mode UI** - Clean, professional design with dark theme
- ✨ **Smooth Animations** - Powered by Framer Motion for fluid interactions
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🚀 **Fast Performance** - Built with Next.js 14 for optimal speed
- 🎯 **Interactive Elements** - Hover effects, transitions, and micro-interactions

## Pages

- **Landing Page** (`/`) - Hero section, features showcase, and call-to-action
- **Components** (`/components`) - Browseable component library with search and filtering
- **Pricing** (`/pricing`) - Interactive pricing plans with feature comparison
- **Get Started** (`/get-started`) - Installation guide and quick start examples

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Project Structure

```
Forge/
├── app/
│   ├── components/     # Components page
│   ├── get-started/    # Get started page
│   ├── pricing/        # Pricing page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── package.json        # Dependencies
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme. The primary gradient colors are defined in the `colors.primary` section.

### Animations

Animations are configured in `tailwind.config.js` under the `keyframes` and `animation` sections. Framer Motion animations are defined inline in components.

## License

MIT
