'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

// Dynamic import to prevent SSR issues with Three.js
const ScrollAssemblyScene = dynamic(() => import('@/components/3d/ScrollAssemblyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading StarFleet Mission...</div>
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
      
      {/* Project Info Overlay - fades out when reaching detailed section */}
      <div 
        className="fixed top-20 left-4 z-40 pointer-events-none backdrop-blur-xs transition-opacity duration-300 max-md:hidden"
        style={{ opacity: scrollProgress >= 0.65 ? 0 : 1 }}
      >
        <div className="card-premium p-7 pointer-events-auto max-w-md border border-white/10 rounded overflow-hidden">
            <div className="inline-flex items-center gap-2 badge-premium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span>Autonomous Robotics</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text" style={{letterSpacing: '-0.01em'}}>
              StarFleet Micro-Robots
            </h1>
            <p className="text-gray-300 mb-5 text-sm leading-relaxed">
              Swarm of autonomous micro-robots for on-orbit satellite maintenance and debris reduction
            </p>
            
            {/* Funding Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-sm mb-2.5">
                <span className="text-gray-400 font-medium">Funded</span>
                <span className="text-white font-bold">$2.4M / $5M</span>
              </div>
              <div className="relative w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 h-3 rounded-full transition-all duration-500 glow-pulse"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text-static">1,247</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Backers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text-static">$1,924</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">Avg. Pledge</div>
              </div>
            </div>
            
            <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-slate-600 hover:via-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 btn-glow overflow-hidden">
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
      
      {/* Scrollable content - this creates the scroll space */}
      <div className="relative" style={{ height: '400vh' }}></div>

      {/* Detailed Project Information */}
      <div className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Project Overview Card */}
          <section className="mb-24">
            <div className="max-w-4xl mx-auto">
              <div className="card-premium p-10 border border-white/10 rounded-2xl">
                <div className="inline-flex items-center gap-2 badge-premium mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span>Autonomous Robotics</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{letterSpacing: '-0.01em'}}>
                  StarFleet Micro-Robots
                </h1>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Swarm of autonomous micro-robots for on-orbit satellite maintenance and debris reduction
                </p>
                
                {/* Funding Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-400 font-medium">Funded</span>
                    <span className="text-white font-bold text-lg">$2.4M / $5M</span>
                  </div>
                  <div className="relative w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 h-4 rounded-full transition-all duration-500 glow-pulse"
                      style={{ width: '48%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-3 text-gray-400 font-medium">
                    <span className="text-purple-400">48% funded</span>
                    <span className="text-orange-400">15 days left</span>
                  </div>
                </div>
                
                <div className="divider-gradient mb-8"></div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold gradient-text-static">1,247</div>
                    <div className="text-sm text-gray-400 mt-2 font-medium">Backers</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold gradient-text-static">$1,924</div>
                    <div className="text-sm text-gray-400 mt-2 font-medium">Avg. Pledge</div>
                  </div>
                </div>
                
                <button className="group relative w-full px-8 py-5 bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-slate-600 hover:via-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 btn-glow overflow-hidden text-lg">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Back This Project
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </section>

          {/* Project Story */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">The Challenge</h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Every year, satellites worth billions of dollars fail not because of catastrophic malfunctions, but from minor, fixable issues: a loose solar panel, a stuck antenna, or accumulated debris on critical surfaces.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Current solutions? Send astronauts on dangerous spacewalks, or abandon the asset entirely. Both options are expensive, risky, and unsustainable as we launch thousands more satellites into orbit.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We&apos;re building something different: a fleet of autonomous micro-robots that can perform repairs, maintenance, and debris collection around Starlab Space Station—and eventually, anywhere in orbit.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-white">How StarFleet Works</h2>
              
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Deploy from Starlab</h3>
                    <p className="text-gray-400">Micro-robots launch from the station&apos;s airlock, using GNSS and UWB positioning to locate their target satellite or debris.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Swarm Coordination</h3>
                    <p className="text-gray-400">Using UHF mesh networking, robots communicate and coordinate in real-time, sharing data and dividing tasks autonomously.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Precision Repair</h3>
                    <p className="text-gray-400">Stereo vision and LIDAR enable sub-millimeter positioning. Modular tools perform repairs: tightening bolts, cleaning panels, applying patches.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Return & Refuel</h3>
                    <p className="text-gray-400">After completing their mission, robots autonomously dock back at Starlab to recharge, swap tools, and prepare for the next task.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Capabilities */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">Key Capabilities</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Modular Tool System</h3>
                  <p className="text-gray-400 mb-4">Each robot carries interchangeable tools for different tasks. Quick-swap mechanism allows tool changes in under 30 seconds.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      Micro grippers for bolt manipulation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      Cleaning brushes for solar panel debris
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      UV resin applicator for micro-patches
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">Swarm Communication</h3>
                  <p className="text-gray-400 mb-4">Decentralized mesh network enables real-time coordination without relying on ground control for every decision.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      UHF radio for inter-robot messaging
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      Earth uplink for mission updates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      Autonomous fallback routines
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-400">Precision Navigation</h3>
                  <p className="text-gray-400 mb-4">Multi-sensor fusion provides sub-millimeter positioning accuracy, critical for delicate repair operations.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      Stereo cameras for depth perception
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      LIDAR for 3D environment mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      IMU for attitude stabilization
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-pink-400">Space-Hardened Design</h3>
                  <p className="text-gray-400 mb-4">Built to survive the harsh environment of space with radiation protection and thermal management systems.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                      5-10mm aluminum radiation shielding
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                      Multi-layer insulation blankets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                      Redundant critical systems
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">Why This Matters</h2>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8 mb-6">
                <p className="text-lg text-gray-300 mb-4">
                  The orbital debris problem is accelerating. At current rates, we&apos;ll face a Kessler Syndrome scenario within decades—where collisions create more debris, triggering a cascade that makes certain orbits unusable.
                </p>
                <p className="text-lg text-gray-300">
                  StarFleet robots don&apos;t just fix satellites. They fundamentally change how we think about space sustainability. Instead of launching new replacements, we extend existing assets. Instead of creating more debris, we actively clean it up.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">60%</div>
                  <div className="text-sm text-gray-400">Lower cost than traditional satellite servicing missions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">5+ years</div>
                  <div className="text-sm text-gray-400">Extended operational life for serviced satellites</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Zero</div>
                  <div className="text-sm text-gray-400">Human EVA risk for routine maintenance tasks</div>
                </div>
              </div>
            </div>
          </section>

          {/* Development Roadmap */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">Development Roadmap</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-green-400 to-blue-400"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">Phase 1: Prototype Development</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/40">Complete</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Q2-Q3 2025</p>
                    <p className="text-gray-400">Initial proof-of-concept robots tested in lab conditions. Swarm communication protocols validated.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">Phase 2: Ground Testing</h3>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/40">In Progress</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Q4 2025 - Q1 2026</p>
                    <p className="text-gray-400">Air-bearing simulators replicate microgravity. Tool systems refined. Navigation algorithms stress-tested.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-purple-400 to-pink-400"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">Phase 3: ISS Mission</h3>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/40">Upcoming</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Q2 2026</p>
                    <p className="text-gray-400">Demonstration mission on ISS external platform. Real-world validation of autonomous docking and basic repairs.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">Phase 4: Starlab Deployment</h3>
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full border border-gray-500/40">Planned</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Q4 2026</p>
                    <p className="text-gray-400">Full fleet deployment around Starlab Space Station. Begin commercial servicing operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">ClearSpace Partnership</h2>
                <p className="text-gray-300 mb-4">
                  We&apos;re collaborating with ClearSpace, the Swiss space debris removal company, to integrate their proven gripper technology into our micro-robots. Their expertise in orbital capture systems complements our autonomous swarm capabilities.
                </p>
                <p className="text-gray-400 text-sm">
                  This partnership accelerates development while ensuring our robots meet the highest standards for safety and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Challenges */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">Technical Challenges We&apos;re Solving</h2>
              <p className="text-gray-400 mb-8">Building autonomous robots for space isn&apos;t easy. Here&apos;s how we&apos;re tackling the hardest problems:</p>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">☢️</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Radiation Hardening</h3>
                      <p className="text-sm text-gray-400 mb-2">Challenge: Electronics fail rapidly in high-radiation environments</p>
                      <p className="text-sm text-gray-300">Solution: Radiation-tolerant components with 5-10mm aluminum shielding and redundant critical systems</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🎯</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Precision in Microgravity</h3>
                      <p className="text-sm text-gray-400 mb-2">Challenge: No friction or gravity reference makes positioning extremely difficult</p>
                      <p className="text-sm text-gray-300">Solution: Visual servoing combined with reaction wheels for attitude control, achieving sub-millimeter accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🔒</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Cybersecurity</h3>
                      <p className="text-sm text-gray-400 mb-2">Challenge: Autonomous systems could be compromised or hijacked</p>
                      <p className="text-sm text-gray-300">Solution: Blockchain-based authentication for all commands with multi-signature verification from ground control</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📡</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Communication Delays</h3>
                      <p className="text-sm text-gray-400 mb-2">Challenge: Real-time control from Earth is impossible due to signal latency</p>
                      <p className="text-sm text-gray-300">Solution: Onboard AI enables autonomous decision-making with periodic check-ins to ground stations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Team */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Who We Are</h2>
              <p className="text-lg text-gray-400 mb-8">
                A team of aerospace engineers, roboticists, and space enthusiasts from across Europe, united by a shared vision of sustainable space operations. We met at the NASA Space Apps Challenge and decided to turn our hackathon prototype into reality.
              </p>
              <a 
                href="/about" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
              >
                Meet the Team
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </section>

          {/* Final CTA */}
          <section>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Help Us Build the Future
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Your support brings us one step closer to making orbital maintenance sustainable, affordable, and safe. Back StarFleet today.
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                Back This Project
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
