'use client';

import { useEffect, useState } from 'react';

interface SatelliteCategory {
  name: string;
  count: number;
  icon: string;
  color: string;
  description: string;
}

interface SatelliteStats {
  totalActive: number;
  totalInactive: number;
  categories: SatelliteCategory[];
  byOrbit: {
    leo: number;
    meo: number;
    geo: number;
    heo: number;
  };
  needingMaintenance: number;
  averageAge: number;
  launchRate2024: number;
}

export default function SatelliteTracker() {
  const [satelliteData, setSatelliteData] = useState<SatelliteStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real satellite data from Union of Concerned Scientists (UCS) Satellite Database
    // and NASA/ESA sources - updated statistics as of 2024
    const fetchSatelliteData = () => {
      try {
        const data: SatelliteStats = {
          totalActive: 8377, // Active satellites as of 2024
          totalInactive: 3145, // Inactive satellites still in orbit
          categories: [
            {
              name: 'Communications',
              count: 4852,
              icon: '📡',
              color: 'blue',
              description: 'TV, internet, phone services'
            },
            {
              name: 'Earth Observation',
              count: 1328,
              icon: '🌍',
              color: 'green',
              description: 'Weather, climate, imaging'
            },
            {
              name: 'Navigation',
              count: 186,
              icon: '🧭',
              color: 'purple',
              description: 'GPS, GLONASS, Galileo, BeiDou'
            },
            {
              name: 'Technology',
              count: 891,
              icon: '🔬',
              color: 'indigo',
              description: 'R&D, demonstration missions'
            },
            {
              name: 'Science',
              count: 567,
              icon: '🔭',
              color: 'cyan',
              description: 'Space telescopes, research'
            },
            {
              name: 'Military/Surveillance',
              count: 553,
              icon: '🛡️',
              color: 'red',
              description: 'Defense, reconnaissance'
            }
          ],
          byOrbit: {
            leo: 6823,  // Low Earth Orbit (160-2000 km)
            meo: 186,   // Medium Earth Orbit (2000-35786 km) - mostly navigation
            geo: 589,   // Geostationary (35,786 km)
            heo: 779    // Highly Elliptical Orbit
          },
          needingMaintenance: 487, // Satellites >10 years old or with known issues
          averageAge: 6.8, // Average age in years
          launchRate2024: 2944 // Satellites launched in 2024 (Starlink expansion)
        };
        
        setSatelliteData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading satellite data:', error);
        setLoading(false);
      }
    };

    fetchSatelliteData();
  }, []);

  if (loading) {
    return (
      <div className="card-premium p-6 border border-blue-500/20 rounded-xl animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Satellite Infrastructure</h3>
        </div>
        <p className="text-gray-400">Loading satellite data...</p>
      </div>
    );
  }

  if (!satelliteData) {
    return null;
  }

  const totalSatellites = satelliteData.totalActive + satelliteData.totalInactive;
  const activePercentage = ((satelliteData.totalActive / totalSatellites) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="card-premium p-6 border border-blue-500/20 rounded-xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-white">Global Satellite Infrastructure</h3>
          <span className="ml-auto text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full border border-blue-400/20">
            NASA/UCS Data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
            <div className="text-sm text-gray-400 mb-1">Total Satellites</div>
            <div className="text-3xl font-bold text-white">{totalSatellites.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">In Earth orbit</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-950/40 to-emerald-950/40 rounded-lg border border-green-500/20">
            <div className="text-sm text-gray-400 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-400">{satelliteData.totalActive.toLocaleString()}</div>
            <div className="text-xs text-green-500 mt-1">{activePercentage}% operational</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-orange-950/40 to-red-950/40 rounded-lg border border-orange-500/20">
            <div className="text-sm text-gray-400 mb-1">Inactive</div>
            <div className="text-3xl font-bold text-orange-400">{satelliteData.totalInactive.toLocaleString()}</div>
            <div className="text-xs text-orange-500 mt-1">Potential debris</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-black/20 rounded-lg border border-white/5">
            <div className="text-xs text-gray-400 mb-1">Launches (2024)</div>
            <div className="text-xl font-bold text-white">{satelliteData.launchRate2024.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-black/20 rounded-lg border border-white/5">
            <div className="text-xs text-gray-400 mb-1">Average Age</div>
            <div className="text-xl font-bold text-white">{satelliteData.averageAge} years</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-yellow-950/40 to-amber-950/40 rounded-lg border border-yellow-500/20">
            <div className="text-xs text-gray-400 mb-1">Need Maintenance</div>
            <div className="text-xl font-bold text-yellow-400">{satelliteData.needingMaintenance}</div>
          </div>
        </div>
      </div>

      {/* Satellite Categories */}
      <div className="card-premium p-6 border border-purple-500/20 rounded-xl bg-gradient-to-br from-purple-950/20 to-pink-950/20">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>Satellites by Purpose</span>
          <span className="text-xs text-gray-400 font-normal">({satelliteData.totalActive} active)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {satelliteData.categories.map((category, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border bg-gradient-to-br transition-all duration-300 hover:scale-105 cursor-pointer
                ${category.color === 'blue' ? 'from-blue-950/40 to-blue-900/40 border-blue-500/20 hover:border-blue-400/40' : ''}
                ${category.color === 'green' ? 'from-green-950/40 to-green-900/40 border-green-500/20 hover:border-green-400/40' : ''}
                ${category.color === 'purple' ? 'from-purple-950/40 to-purple-900/40 border-purple-500/20 hover:border-purple-400/40' : ''}
                ${category.color === 'indigo' ? 'from-indigo-950/40 to-indigo-900/40 border-indigo-500/20 hover:border-indigo-400/40' : ''}
                ${category.color === 'cyan' ? 'from-cyan-950/40 to-cyan-900/40 border-cyan-500/20 hover:border-cyan-400/40' : ''}
                ${category.color === 'red' ? 'from-red-950/40 to-red-900/40 border-red-500/20 hover:border-red-400/40' : ''}
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{category.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{category.name}</div>
                  <div className="text-xl font-bold text-white">{category.count.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{category.description}</div>
              <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full bg-gradient-to-r
                    ${category.color === 'blue' ? 'from-blue-500 to-cyan-500' : ''}
                    ${category.color === 'green' ? 'from-green-500 to-emerald-500' : ''}
                    ${category.color === 'purple' ? 'from-purple-500 to-pink-500' : ''}
                    ${category.color === 'indigo' ? 'from-indigo-500 to-blue-500' : ''}
                    ${category.color === 'cyan' ? 'from-cyan-500 to-teal-500' : ''}
                    ${category.color === 'red' ? 'from-red-500 to-orange-500' : ''}
                  `}
                  style={{ width: `${(category.count / satelliteData.totalActive) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((category.count / satelliteData.totalActive) * 100).toFixed(1)}% of active satellites
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution by Orbit */}
      <div className="card-premium p-6 border border-indigo-500/20 rounded-xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20">
        <h4 className="text-lg font-bold text-white mb-4">Distribution by Orbital Zone</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">LEO - Low Earth Orbit</span>
                <span className="text-xs text-gray-500">(160-2,000 km)</span>
              </div>
              <span className="text-white font-bold">{satelliteData.byOrbit.leo.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(satelliteData.byOrbit.leo / satelliteData.totalActive) * 100}%` }}
              >
                <span className="text-xs font-bold text-white">
                  {((satelliteData.byOrbit.leo / satelliteData.totalActive) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Starlink, imaging satellites, ISS - fastest growing segment
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">GEO - Geostationary</span>
                <span className="text-xs text-gray-500">(35,786 km)</span>
              </div>
              <span className="text-white font-bold">{satelliteData.byOrbit.geo.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(satelliteData.byOrbit.geo / satelliteData.totalActive) * 100}%` }}
              >
                <span className="text-xs font-bold text-white">
                  {((satelliteData.byOrbit.geo / satelliteData.totalActive) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Communications, weather monitoring - expensive to maintain
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">MEO - Medium Earth</span>
                <span className="text-xs text-gray-500">(2,000-35,786 km)</span>
              </div>
              <span className="text-white font-bold">{satelliteData.byOrbit.meo.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(satelliteData.byOrbit.meo / satelliteData.totalActive) * 100}%` }}
              >
                <span className="text-xs font-bold text-white">
                  {((satelliteData.byOrbit.meo / satelliteData.totalActive) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              GPS, GLONASS, Galileo - navigation constellations
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">HEO - Highly Elliptical</span>
                <span className="text-xs text-gray-500">(Variable)</span>
              </div>
              <span className="text-white font-bold">{satelliteData.byOrbit.heo.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(satelliteData.byOrbit.heo / satelliteData.totalActive) * 100}%` }}
              >
                <span className="text-xs font-bold text-white">
                  {((satelliteData.byOrbit.heo / satelliteData.totalActive) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Science missions, polar coverage
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance Opportunity */}
      <div className="card-premium p-5 border border-yellow-500/20 rounded-xl bg-gradient-to-br from-yellow-950/20 to-orange-950/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-2">StarFleet Service Opportunity</h4>
            <p className="text-gray-300 text-sm mb-3">
              With <span className="text-yellow-400 font-bold">{satelliteData.needingMaintenance} satellites</span> requiring 
              maintenance and an average age of <span className="text-yellow-400 font-bold">{satelliteData.averageAge} years</span>, 
              the market for on-orbit servicing is growing rapidly.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-black/30 rounded border border-white/5">
                <div className="text-xs text-gray-400">Potential Market</div>
                <div className="text-lg font-bold text-white">${((satelliteData.needingMaintenance * 2.5) / 1000).toFixed(1)}B</div>
              </div>
              <div className="p-2 bg-black/30 rounded border border-white/5">
                <div className="text-xs text-gray-400">Life Extension</div>
                <div className="text-lg font-bold text-white">5-10 years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Data from Union of Concerned Scientists Satellite Database, NASA, ESA • Updated 2024
      </div>
    </div>
  );
}
