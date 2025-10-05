# 🚀 myStarlab - Space Innovation Crowdfunding Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A next-generation crowdfunding platform for space research and innovation projects, featuring real-time NASA data integration and immersive 3D visualizations.

![MyStarlab Banner](https://img.shields.io/badge/Space-Innovation-purple?style=for-the-badge)

## 🌟 Overview

**myStarlab** is a crowdfunding platform specifically designed for space-related research projects, with a flagship project **StarFleet** - an autonomous drone fleet for on-orbit satellite maintenance and debris reduction. The platform integrates real-time data from NASA's Open Data APIs to provide credibility, educational value, and compelling visualizations of the space debris problem that our solutions address.

### Featured Project: StarFleet

StarFleet is a swarm of autonomous micro-robots designed for:

- 🛰️ **On-orbit satellite maintenance** - Extending satellite lifespans by 5-10 years
- 🗑️ **Space debris capture and removal** - Reducing orbital collision risks
- 💰 **Cost reduction** - Avoiding expensive satellite replacements
- 🌍 **Sustainable space operations** - Enabling long-term orbital infrastructure

## ✨ Key Features

### 🎯 Core Platform Features

- **Project Discovery** - Browse cutting-edge space research initiatives
- **Crowdfunding System** - Back projects with detailed funding progress tracking
- **Team Profiles** - Meet the researchers and engineers behind each project
- **Project Analytics** - Real-time statistics and impact metrics

### 🛰️ NASA Data Integration

- **Live ISS Tracking** - Real-time International Space Station position updates
- **Orbital Debris Statistics** - 34,000+ trackable objects tracked by NASA
- **Satellite Infrastructure** - 8,377+ active satellites categorized by purpose
- **Space Operations Dashboard** - Comprehensive view of orbital activities

### 🎨 3D Visualizations

- **Interactive 3D Space Station** - GLTF model with scroll-based animation
- **Autonomous Drone Fleet** - 12 repair drones (desktop) / 4 (mobile) with flight paths
- **Optimized Performance** - Mobile-responsive with device-specific rendering

### 📱 Responsive Design

- Fully responsive across desktop, tablet, and mobile
- Performance-optimized 3D rendering with mobile detection
- Adaptive layouts and touch-friendly navigation

## 🏗️ Project Structure

```
myStarlab/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Root redirect to /home
│   ├── home/                    # Homepage with NASA data section
│   ├── about/                   # Team information and mission
│   ├── projects/                # Project listing page
│   ├── starlab-station/         # 3D interactive demo
│   └── space-ops/               # Space Operations dashboard
├── components/                   # React components
│   ├── Navigation.tsx           # Main navigation with Space Ops link
│   ├── SpaceHero.tsx           # Hero section component
│   ├── ProjectCard.tsx          # Project card component
│   ├── DebrisTracker.tsx       # Orbital debris statistics
│   ├── SatelliteTracker.tsx    # Satellite infrastructure data
│   └── 3d/                     # Three.js 3D components
│       ├── ScrollAssemblyScene.tsx    # Main 3D scene orchestrator
│       ├── SpaceStationModel.tsx      # Space station GLTF loader
│       ├── DroneModel.tsx             # Drone GLTF with flight paths
│       ├── ScrollRepairDrone.tsx      # Legacy scroll animation
│       ├── SmallSatellite.tsx         # Satellite models
│       └── SplineStation.tsx          # Alternative station viewer
├── public/                      # Static assets
│   ├── space-station.gltf      # 3D space station model
│   ├── drone.gltf              # 3D drone model
│   └── members/                # Team member photos
├── globals.css                  # Global styles with Tailwind
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Riccardo-Maffei/NASA-Hackaton-Project---team-.git
   cd NASA-Hackaton-Project---team-
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🛰️ NASA Data Sources

The platform integrates multiple NASA and space agency data sources:


### Static Data Sources

- **[NASA Orbital Debris Program Office](https://orbitaldebris.jsc.nasa.gov/)** - Debris statistics and tracking data
- **[Union of Concerned Scientists Satellite Database](https://www.ucsusa.org/resources/satellite-database)** - Comprehensive satellite catalog
- **NASA/ESA Space Debris Office** - Collision avoidance statistics

## 🎮 3D Features

### Technology Stack

- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **@react-three/postprocessing** - Visual effects (Bloom, Chromatic Aberration)

### Models

- **Space Station** (`space-station.gltf`) - Main orbital facility
- **Repair Drones** (`drone.gltf`) - Autonomous maintenance robots

### Performance Optimizations

- **Mobile Detection** - Disables 3D on mobile for performance
- **Reduced Geometry** - 4 drones on mobile vs 12 on desktop
- **Disabled Effects** - No post-processing on mobile
- **Lower Quality** - Reduced shadows, stars, and DPR on mobile

## 📊 Key Statistics (NASA Data)

### Orbital Debris

- **34,260** trackable objects >10cm
- **~1 million** small debris (1-10cm)
- **~1,000** collision avoidance maneuvers/year
- **$3B+** annual cost of debris impact

### Active Satellites

- **8,377** active satellites
- **3,145** inactive satellites (potential debris)
- **2,944** launches in 2024
- **487** satellites needing maintenance

### Market Opportunity

- **$1.2B** potential market for satellite servicing
- **5-10 years** life extension per servicing
- **$10B+** avoided replacement costs (5-year projection)

## 🎨 Design System

### Color Palette

- **Primary**: Blue-Indigo-Violet gradient
- **Accents**: Orange (debris), Green (live data), Purple (stats)
- **Backgrounds**: Black with mesh gradients

### Typography

- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable sans-serif
- **Monospace**: For coordinates and technical data

### Components

- **Glassmorphic cards** with backdrop blur
- **Gradient borders** and glowing effects
- **Animated progress bars** and live indicators
- **Responsive grids** with Tailwind CSS

## 🧑‍💻 Team

### StarFleet Team Members

- **Riccardo Maffei** - Computer Science Student
- **Alan Geirnaert** - Full Stack Developer
- **Judith Van Cauter** - UX/UI Designer
- **Trami Nguyen** - Systems Engineering Student
- **Blandine Mandin** - Mechanical Engineering Student
- **Simon Ghyselinck** - Mechanical Engineering Student

## 📄 License

This project is part of the 2025 NASA Space Apps Challenge in Lucerne, Switzerland.

## 🙏 Acknowledgments

- **NASA** - For providing open data APIs and orbital debris statistics
- **Open Notify** - For ISS tracking and astronaut APIs
- **Union of Concerned Scientists** - For comprehensive satellite database
- **Three.js Community** - For 3D rendering tools and resources
- **Next.js Team** - For the amazing framework

## 🔗 Links

- **Project URL**: [Website](https://star-fleet-iota.vercel.app/home)
- **NASA Space Apps Challenge**: [Website](https://www.spaceappschallenge.org/2025/find-a-team/spacefleet/?tab=project)

## 📞 Contact

For questions or collaboration opportunities, please reach out through:

- GitHub Issues
- LinkedIn profiles (available on the About page)

---

**Built with ❤️ for the NASA Space Apps Challenge 2025**

_Making space research accessible to everyone through crowdfunding and real-time data visualization._
