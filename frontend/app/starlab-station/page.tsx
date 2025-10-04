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
      <div className="fixed top-20 left-4 z-40 pointer-events-none backdrop-blur-xs">
        <div className="card-premium p-7 pointer-events-auto max-w-md border border-white/10 rounded overflow-hidden">
            <div className="inline-flex items-center gap-2 badge-premium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span>Orbital Infrastructure</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text" style={{letterSpacing: '-0.01em'}}>
              Starlab Space Station
            </h1>
            <p className="text-gray-300 mb-5 text-sm leading-relaxed">
              Autonomous Repair Drone System for next-generation orbital maintenance
            </p>
            
            {/* Funding Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-sm mb-2.5">
                <span className="text-gray-400 font-medium">Funded</span>
                <span className="text-white font-bold">$2.4M / $5M</span>
              </div>
              <div className="relative w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 h-3 rounded-full transition-all duration-500 glow-pulse"
                  style={{ width: '48%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-2 text-gray-400 font-medium">
                <span className="text-purple-400">48% funded</span>
                <span className="text-orange-400">15 days left</span>
              </div>
            </div>
            
            <div className="divider-gradient mb-5"></div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text-static">1,247</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Backers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text-static">$1,924</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Avg. Pledge</div>
              </div>
            </div>
            
            <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 btn-glow overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Back This Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
      </div>

      {/* Fixed 3D Scene */}
      <ScrollAssemblyScene scrollProgress={scrollProgress} />
      
      {/* Scrollable content */}
      <div className="relative pointer-events-none" style={{ height: '1000vh' }}>
        {/* Drones operations info */}
        {scrollProgress < 0.92 && (
          <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="glass-strong border border-white/10 rounded-2xl p-6 inline-block">
                <div className="inline-flex items-center gap-2 badge-premium mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                  </svg>
                  <span>Autonomous Operations</span>
                </div>
                <p className="text-white text-xl font-bold mb-2">
                  Autonomous Repair Drones in Action
                </p>
                <p className="text-gray-400 text-sm font-medium">
                  Scroll to explore the station and watch drones appear • {Math.round(scrollProgress * 100)}% explored
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Completion */}
        {scrollProgress >= 0.92 && (
          <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="card-premium border border-white/10 p-8 inline-block pointer-events-auto">
                <div className="inline-flex items-center gap-2 badge-premium mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mission Complete</span>
                </div>
                <p className="text-white text-3xl font-bold mb-3 gradient-text">
                  Experience Complete! 🚀
                </p>
                <p className="text-gray-300 mb-6 text-lg">
                  Help make autonomous space maintenance a reality
                </p>
                <button className="group relative px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 btn-glow overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Support This Project
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
