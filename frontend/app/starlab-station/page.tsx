'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

// Dynamic import to prevent SSR issues with Three.js
const ScrollAssemblyScene = dynamic(() => import('@/components/3d/ScrollAssemblyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading Starlab Station...</div>
    </div>
  ),
});

export default function StarlabStationPage() {
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
    <div className="relative bg-black">
      <Navigation />
      
      {/* Project Info Overlay */}
      <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-6 pointer-events-auto max-w-md">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Starlab Space Station
            </h1>
            <p className="text-gray-300 mb-4">
              Autonomous Repair Drone System
            </p>
            
            {/* Funding Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Funded</span>
                <span className="text-white font-semibold">$2.4M / $5M</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: '48%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-2 text-gray-400">
                <span>48% funded</span>
                <span>15 days left</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">1,247</div>
                <div className="text-xs text-gray-400">Backers</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">$1,924</div>
                <div className="text-xs text-gray-400">Avg. Pledge</div>
              </div>
            </div>
            
            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Back This Project
            </button>
          </div>
        </div>
      </div>

      {/* Fixed 3D Scene */}
      <ScrollAssemblyScene scrollProgress={scrollProgress} />
      
      {/* Scrollable content */}
      <div className="relative pointer-events-none" style={{ height: '1000vh' }}>
        {/* Assembly phase info */}
        {scrollProgress < 0.55 && (
          <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 inline-block">
                <p className="text-white text-lg font-semibold">
                  Scroll to see the station assembly
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Progress: {Math.round((scrollProgress / 0.55) * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Drones phase info */}
        {scrollProgress >= 0.55 && scrollProgress < 0.92 && (
          <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 inline-block">
                <p className="text-white text-lg font-semibold">
                  Autonomous repair drones activated
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Watch them navigate and maintain the station
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Completion */}
        {scrollProgress >= 0.92 && (
          <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-6 inline-block pointer-events-auto">
                <p className="text-white text-2xl font-bold mb-2">
                  Experience Complete! 🚀
                </p>
                <p className="text-gray-300 mb-4">
                  Help make autonomous space maintenance a reality
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  Support This Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
