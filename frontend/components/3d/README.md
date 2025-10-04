# 3D Space Station Animation

This directory contains the 3D animation components for the Starlab Space Station with autonomous repair drones.

## Components

### SpaceScene.tsx

Main scene component that orchestrates the entire 3D environment:

- Sets up the Three.js Canvas with proper camera and lighting
- Manages 6 autonomous repair drones with different colors and paths
- Includes star field background for immersive space atmosphere
- Provides orbit controls for user interaction
- Displays UI overlay with station information

### SpaceStation.tsx

Detailed 3D model of a modular space station featuring:

- Central spherical hub with connection rings
- Laboratory modules (top and bottom)
- Side modules with communication antennas
- Large solar panel arrays on both sides
- Communication dish and docking port
- Realistic materials with metallic and emissive properties
- Ambient lighting from various module lights
- Slow rotation animation

### RepairDrone.tsx

Autonomous micro-drone/robot component with:

- Quadcopter-style design with 4 spinning propellers
- Camera/sensor "eye" in the front
- Repair tool arm extending from the bottom
- Smooth curved path navigation using Catmull-Rom splines
- Pulsing lights and emissive materials
- Configurable start/end positions, colors, speeds, and delays
- Realistic bobbing motion during flight

## Features

- **Interactive Camera**: Click and drag to rotate, scroll to zoom, right-click to pan
- **Auto-rotation**: Scene slowly rotates automatically for continuous viewing
- **Multiple Drones**: 6 drones simultaneously navigate to different repair points
- **Realistic Materials**: Metallic surfaces, emissive lights, and proper reflections
- **Performance Optimized**: Uses React Three Fiber for efficient rendering
- **Responsive**: Full-screen canvas that adapts to window size

## Customization

### Add More Drones

Edit `SpaceScene.tsx` and add more entries to the `repairPoints` array:

```typescript
const repairPoints = [
  {
    start: [x, y, z],
    target: [x, y, z],
    color: "#hexcolor",
    speed: 0.5,
    delay: 0,
  },
  // Add more...
];
```

### Modify Station Structure

Edit `SpaceStation.tsx` to add/remove modules, change colors, or adjust positions.

### Adjust Drone Behavior

Edit `RepairDrone.tsx` to change:

- Propeller speed (line 46)
- Movement curve complexity (lines 28-38)
- Visual appearance and materials

## Technologies Used

- **Three.js**: 3D graphics library
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers (OrbitControls, Stars)
- **Next.js 15**: React framework with dynamic imports for SSR handling
