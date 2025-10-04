'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamic import to prevent SSR issues with Three.js
const ScrollAssemblyScene = dynamic(() => import('@/components/3d/ScrollAssemblyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading Starlab Station...</div>
    </div>
  ),
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      
      setScrollProgress(progress);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Fixed 3D Scene */}
      <ScrollAssemblyScene scrollProgress={scrollProgress} />
      
      {/* Scrollable content (invisible but creates scroll height) */}
      <div className="relative pointer-events-none" style={{ height: '1000vh' }}>
        {/* This creates the scrollable area - 10x viewport height for slower animation */}
      </div>
    </div>
  );
}
