'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import DebrisTracker from '@/components/DebrisTracker';
import SatelliteTracker from '@/components/SatelliteTracker';

interface AstronautData {
  number: number;
  people: Array<{
    name: string;
    craft: string;
  }>;
}

export default function SpaceOpsPage() {
  const [astronauts, setAstronauts] = useState<AstronautData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const res = await fetch('http://api.open-notify.org/astros.json');
        const data = await res.json();
        setAstronauts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching astronaut data:', error);
        setLoading(false);
      }
    };

    fetchAstronauts();
  }, []);

  const issAstronauts = astronauts?.people.filter(p => p.craft === 'ISS') || [];
  const otherAstronauts = astronauts?.people.filter(p => p.craft !== 'ISS') || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-premium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
              </svg>
              <span>Real-Time Data from NASA</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-static">
              Space Operations
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Live tracking and monitoring of orbital operations, debris, and space infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Live Data Dashboard */}
      <section className="py-16 bg-gradient-to-b from-black via-purple-950/10 to-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* NASA Orbital Debris Data */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text-static">Orbital Debris Situation</h2>
            <DebrisTracker />
          </div>

          {/* Satellite Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text-static">Active Satellite Infrastructure</h2>
            <SatelliteTracker />
          </div>

          {/* StarFleet Solution */}
          <div className="card-premium p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-blue-950/30 to-purple-950/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 badge-premium mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>The Solution</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 gradient-text-static">
                  How StarFleet Addresses These Challenges
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our autonomous drone fleet provides on-orbit maintenance, debris capture, and life extension 
                  services for satellites - reducing the need for expensive replacements and helping clean up 
                  Earth&apos;s orbital environment.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Extend satellite operational life by 5-10 years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Capture and deorbit dangerous debris objects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Reduce collision avoidance maneuvers and operational costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Enable sustainable orbital operations for future generations</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-green-950/40 to-blue-950/40 rounded-xl border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-2">Projected Impact (5 years)</div>
                  <div className="text-4xl font-bold text-white mb-1">2,500+</div>
                  <div className="text-sm text-green-400">Satellites serviced</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-950/40 to-purple-950/40 rounded-xl border border-blue-500/20">
                  <div className="text-sm text-gray-400 mb-2">Debris Reduction</div>
                  <div className="text-4xl font-bold text-white mb-1">1,000+</div>
                  <div className="text-sm text-blue-400">Objects captured and deorbited</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-950/40 to-pink-950/40 rounded-xl border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-2">Cost Savings</div>
                  <div className="text-4xl font-bold text-white mb-1">$10B+</div>
                  <div className="text-sm text-purple-400">Avoided replacement costs</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
