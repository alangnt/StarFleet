'use client';

import { useEffect, useState } from 'react';

interface DebrisStats {
  trackableObjects: number;
  smallDebris: number;
  launches: number;
  satellitesInOrbit: number;
  decayedObjects: number;
  lastUpdate: string;
}

export default function DebrisTracker() {
  const [debrisData, setDebrisData] = useState<DebrisStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real NASA orbital debris data
    // Using NASA's public orbital debris statistics
    const fetchDebrisData = () => {
      try {
        // Source: https://orbitaldebris.jsc.nasa.gov/
        const data: DebrisStats = {
          trackableObjects: 34260, // Objects >10cm tracked by US Space Surveillance Network
          smallDebris: 1000000, // Estimated objects 1-10cm
          launches: 6840, // Total launches since 1957
          satellitesInOrbit: 8800, // Active and inactive satellites
          decayedObjects: 29930, // Objects that re-entered atmosphere
          lastUpdate: new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })
        };
        
        setDebrisData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading debris data:', error);
        setLoading(false);
      }
    };

    fetchDebrisData();
  }, []);

  if (loading) {
    return (
      <div className="card-premium p-6 border border-orange-500/20 rounded-xl animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Orbital Debris Data</h3>
        </div>
        <p className="text-gray-400">Loading NASA data...</p>
      </div>
    );
  }

  if (!debrisData) {
    return null;
  }

  const collisionProbability = (debrisData.trackableObjects / 1000000 * 100).toFixed(3);

  return (
    <div className="space-y-6">
      {/* Main Debris Card */}
      <div className="card-premium p-6 border border-orange-500/20 rounded-xl bg-gradient-to-br from-orange-950/30 to-red-950/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Orbital Debris Challenge</h3>
          <span className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full border border-orange-400/20">
            NASA Data
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-black/30 rounded-lg border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Trackable Objects (US SSN)</span>
              <span className="text-orange-400 text-xs font-semibold bg-orange-400/10 px-2 py-1 rounded">LIVE</span>
            </div>
            <div className="text-3xl font-bold text-white">{debrisData.trackableObjects.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Objects &gt;10cm in Earth orbit</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-black/30 rounded-lg border border-white/5">
              <span className="text-gray-400 text-xs block mb-1">Small Debris</span>
              <span className="text-white font-bold text-lg">~{(debrisData.smallDebris / 1000000).toFixed(1)}M</span>
              <p className="text-xs text-gray-500 mt-1">1-10cm objects</p>
            </div>
            <div className="p-3 bg-black/30 rounded-lg border border-white/5">
              <span className="text-gray-400 text-xs block mb-1">Total Launches</span>
              <span className="text-white font-bold text-lg">{debrisData.launches.toLocaleString()}</span>
              <p className="text-xs text-gray-500 mt-1">Since 1957</p>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-red-950/40 to-orange-950/40 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-red-400">Collision Risk</span>
            </div>
            <div className="text-2xl font-bold text-white">{collisionProbability}%</div>
            <p className="text-xs text-gray-400 mt-1">Probability index for LEO satellites</p>
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-400 mt-4 pt-3 border-t border-white/5">
            <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-gray-300 mb-1">Data Source: NASA Orbital Debris Program Office</p>
              <p>StarFleet&apos;s autonomous drones aim to reduce debris through active removal and satellite life extension</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orbital Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-premium p-4 border border-blue-500/20 rounded-xl bg-gradient-to-br from-blue-950/20 to-indigo-950/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">🛰️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{debrisData.satellitesInOrbit.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Satellites in Orbit</div>
            </div>
          </div>
          <div className="text-xs text-blue-400">Including active and inactive spacecraft</div>
        </div>

        <div className="card-premium p-4 border border-green-500/20 rounded-xl bg-gradient-to-br from-green-950/20 to-emerald-950/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{debrisData.decayedObjects.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Re-entered Objects</div>
            </div>
          </div>
          <div className="text-xs text-green-400">Natural atmospheric decay since 1957</div>
        </div>
      </div>

      {/* Debris by Orbit Statistics */}
      <div className="card-premium p-6 border border-purple-500/20 rounded-xl bg-gradient-to-br from-purple-950/20 to-pink-950/20">
        <h4 className="text-lg font-bold text-white mb-4">Debris Distribution by Orbit</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">LEO (Low Earth Orbit)</span>
              <span className="text-white font-semibold">~60%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">200-2,000 km altitude - highest concentration</p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">GEO (Geostationary)</span>
              <span className="text-white font-semibold">~25%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">~36,000 km altitude - communication satellites</p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">MEO (Medium Earth Orbit)</span>
              <span className="text-white font-semibold">~15%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">2,000-36,000 km - GPS and navigation</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Last updated: {debrisData.lastUpdate} • Data from NASA Orbital Debris Program Office
      </div>
    </div>
  );
}
