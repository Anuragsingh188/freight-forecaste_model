# AETHER FREIGHT // AI Freight Forecasting & Autonomous Booking OS

> *"See the freight market before it moves."*

A production-grade, 60fps 3D scroll-driven freight forecasting web application built with **React**, **Three.js** (`@react-three/fiber` & `@react-three/drei`), **GSAP**, and **Tailwind CSS**.

Featuring a deep space aesthetic (`#0b0b0d`), warm copper 3D wireframe art (`#e8805a`), electric blue accents (`#3b82f6`), and signal greens (`#1fb573`). Includes low-power / reduced-motion fallback, interactive 3D globe with great-circle trade lanes, multi-modal booking animation (crane, highway truck, ocean megaship, air cargo jet), and a Sable Checkout 3D tilting payment card experience.

---

## 🌟 Key Features

### 1. Landing & 3D Scroll Story (`/`)
- **Interactive 3D Globe**: Custom wireframe sphere with continental point clusters, latitude/longitude rings, and an atmospheric Fresnel rim glow shader.
- **Dynamic Trade Lanes**: Great-circle Bézier arcs with pulsating animated dashes connecting global trade hubs (Shanghai, Rotterdam, Los Angeles, Singapore, Dubai, Hamburg).
- **Vehicle Tokens**: Mini 3D container ships, air cargo aircraft, and highway haulers moving along lane trajectories.
- **Scroll Story**:
  - **Hero**: Monospace telemetry, live spot rate ticker, central 30s product demo modal, and alpha waitlist modal.
  - **Section 1 (Demand)**: Heat-colored lane saturation indicators and committed capacity utilization gauges.
  - **Section 2 (Rates)**: 3D extruded terrain / bar chart visualizing volatility across 7d, 30d, and 90d time horizons with Bayesian confidence bands.
  - **Section 3 (Risk)**: Climate anomalies (typhoon warnings, canal draft restrictions, terminal congestion) with delay impacts and automated reroute telemetry.
  - **Section 4 (Book)**: Camera docks right in front of a 3D shipping container whose doors open, inviting users into the instant booking flow.
- **Low-Power 2D Fallback Mode**: Toggleable anytime via the navbar or automatically triggered for mobile and `prefers-reduced-motion` users, rendering high-performance 2D canvas/SVG vector graphics.

### 2. Login Page with Wireframe Hand Motif (`/login`)
- Recreates the dark space wireframe motif with an articulated copper 3D hand and floating particle dust.
- Minimalist glassmorphic authentication card with Google SSO, email/password inputs, and a cinematic camera push-through warp transition into the dashboard.

### 3. Booking Experience & Logistics Showcase (`/book`)
- **Video Sequence Reproduction**:
  1. Port reach stacker crane lifting a 40ft High-Cube container onto an articulated truck chassis.
  2. Top-down aerial highway view tracking the truck as it rounds a curve at 68 MPH.
  3. Megaship container vessel cutting through oceanic swell with wake effects.
  4. B777-F cargo aircraft cruising at FL380 with flight telemetry.
- **Dynamic Booking Wizard**:
  - Multi-step flow: `Route → Cargo Specs → Lock Quote → Payment`.
  - Real-time rate calculation engine across Ocean, Air, and Road.
  - AI "Book Now vs Wait" intelligence band with percentage savings, confidence scores (94%), and optimal booking windows.

### 4. Sable 3D Payment Checkout (`/pay`)
- Recreates the Sable Checkout animation reference:
  - 3D tilting card reacting to mouse movements with specular light reflections, EMV chip, and contactless icon.
  - Auto-formatting for card numbers (`XXXX XXXX XXXX XXXX`), card brand detection (`VISA`, `Mastercard`, `Amex`).
  - Smooth 180° 3D card flip revealing the signature strip and CVC code when the CVC field is focused.
  - Authentic spread-shadow box glows:
    - `4242 4242 4242 4242` triggers approval state with green halo: `box-shadow: 0 0 26px 4px #1fb573, 0 0 62px 18px #1fb573`.
    - `4000 0000 0000 0002` triggers decline state with red halo: `box-shadow: 0 0 26px 4px #ef4444, 0 0 62px 18px #ef4444`.
  - Itemized freight invoice ($1,248.00) and security badges (PCI-DSS Level 1, 256-bit TLS).
  - Code inspection drawer (`index.html`, `style.css`, `app.js`).

### 5. Freight Fleet Dashboard (`/dashboard`)
- Key metrics: Active freight under management ($42,840), model accuracy (94.2%), timing savings ($4,120), active TEU in transit (148 TEU).
- Interactive predictive lane table with spot vs contract deltas.
- Active voyage tracker with live mini-3D globe showing container coordinates and speed in knots.
- Real-time maritime advisory feed.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation**: GSAP (ScrollTrigger), CSS 3D transforms, canvas-confetti
- **Styling**: Tailwind CSS with custom monospace typography (`JetBrains Mono`, `Inter`)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0 (Tested on Node v24.13.0)
- npm >= 9.0

### Installation
```bash
# Clone or navigate to the project directory
cd "c:/Users/BIT PATNA/OneDrive/Desktop/paypal demo"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📡 API Architecture (`src/services/mockApi.ts`)

The project is structured with a modular service layer ready to swap with a real ML Python / FastAPI backend:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/forecast/rates` | `GET` | Historical and Bayesian forecast points with 95% confidence intervals |
| `/forecast/demand` | `GET` | Lane demand velocity and capacity utilization indices |
| `/lanes` | `GET` | Global trade corridor metadata, carriers, and transit ETAs |
| `/bookings` | `POST` | Instant slot reservation and EDI Bill of Lading generation |

---

## ♿ Accessibility & Performance

- **Target 60 FPS**: Render loops use delta time interpolation and lightweight instanced / buffer geometries.
- **Low-Power Mode**: Switchable button in the navbar (or auto-detected via `prefers-reduced-motion`) toggles 2D canvas/SVG mode.
- **ARIA & Keyboard Nav**: Form inputs, modals, and navigation buttons have full focus states and ARIA labels.
- **Contrast Checked**: Meets WCAG AA contrast standards across dark mode surfaces.
