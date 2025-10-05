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
        className="fixed top-20 left-4 z-40 pointer-events-none backdrop-blur-xs transition-opacity duration-300"
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
      
      {/* Scrollable content */}
      <div className="relative pointer-events-none" style={{ height: '1000vh' }}></div>

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
                <div className="grid grid-cols-2 gap-6 mb-8">
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

          {/* Vision Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 mb-6 backdrop-blur-sm">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                </svg>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Our Vision
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6" style={{letterSpacing: '-0.02em'}}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  StarFleet:
                </span>
                <br />
                <span className="text-white">Autonomous Satellite Repair</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Deploy coordinated swarms of micro-robots to autonomously repair satellites, maintain orbital infrastructure, and reduce space debris—extending the operational life of critical space assets.
              </p>
            </div>
          </section>

          {/* The Problem */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Problem
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '👨‍🚀', title: 'Costly Spacewalks', desc: 'Space maintenance requires expensive, risky EVA missions that endanger astronaut lives' },
                { icon: '🛰️', title: 'Space Debris Crisis', desc: 'Damaged satellites become orbital debris, threatening operational spacecraft' },
                { icon: '💰', title: 'Millions Per Mission', desc: 'Traditional maintenance missions cost millions and require extensive planning' },
                { icon: '⚠️', title: 'Growing Threat', desc: 'Increasing orbital debris poses catastrophic collision risks' }
              ].map((problem, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-white">{problem.title}</h4>
                  <p className="text-gray-400">{problem.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Solution */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                StarFleet Solution: Swarm Intelligence
              </span>
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🤖',
                  title: 'Autonomous Maintenance',
                  features: ['Repair micro-scratches', 'Tighten bolts', 'Clean solar panels', 'Apply UV resin patches']
                },
                {
                  icon: '🔗',
                  title: 'Swarm Intelligence',
                  features: ['UWB radio positioning', 'UHF robot-to-robot mesh', 'GNSS navigation', 'Coordinated operations']
                },
                {
                  icon: '🎯',
                  title: 'Precision Navigation',
                  features: ['Stereo vision systems', 'LIDAR mapping', 'IMU stabilization', 'Sub-millimeter accuracy']
                }
              ].map((solution, i) => (
                <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-5xl mb-4">{solution.icon}</div>
                  <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {solution.title}
                  </h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-300">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Features */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Advanced Technology
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Advanced Sensors', items: ['Stereo cameras', 'Force sensors', 'Thermal imaging', 'LIDAR systems'] },
                { title: 'Micro-Propulsion', items: ['PID control systems', 'Reaction wheels', 'Cold gas thrusters', 'Precision maneuvering'] },
                { title: 'Radiation Protection', items: ['Hardened components', '5-10mm Al shielding', 'Multi-layer insulation', 'Thermal management'] },
                { title: 'Modular Tools', items: ['Micro grippers', 'Screwdrivers', 'Cleaning brushes', 'UV resin applicators'] },
                { title: 'Communication', items: ['UHF mesh network', 'Earth uplink/downlink', 'Inter-drone protocols', 'Autonomous routines'] },
                { title: 'Power Systems', items: ['Efficient batteries', 'Solar charging', 'Power management', 'Long-duration ops'] }
              ].map((tech, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <h4 className="text-lg font-bold mb-3 text-cyan-400">{tech.title}</h4>
                  <ul className="space-y-1.5 text-sm">
                    {tech.items.map((item, j) => (
                      <li key={j} className="text-gray-400 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Key Benefits
              </span>
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { metric: '60%', label: 'Cost Reduction', desc: 'vs. traditional missions', color: 'from-green-400 to-emerald-400' },
                { metric: '40%+', label: 'Debris Reduction', desc: 'Sustainable operations', color: 'from-blue-400 to-cyan-400' },
                { metric: '+5 Years', label: 'Extended Lifespan', desc: 'Satellite longevity', color: 'from-purple-400 to-pink-400' },
                { metric: '90%', label: 'Safer', desc: 'Reduced EVA risks', color: 'from-orange-400 to-red-400' }
              ].map((benefit, i) => (
                <div key={i} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition-all duration-300">
                  <div className={`text-5xl font-extrabold mb-2 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.metric}
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{benefit.label}</div>
                  <div className="text-sm text-gray-400">{benefit.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Target Market */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">Target Market</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🚀', name: 'Private Space Companies', examples: 'SpaceX, OneWeb, Blue Origin' },
                { icon: '🏛️', name: 'Government Agencies', examples: 'NASA, ESA, JAXA' },
                { icon: '📡', name: 'Satellite Operators', examples: 'Commercial & Defense' },
                { icon: '🛰️', name: 'Space Stations', examples: 'ISS, Starlab, Gateway' }
              ].map((market, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center hover:border-indigo-500/40 transition-all duration-300">
                  <div className="text-5xl mb-3">{market.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{market.name}</h4>
                  <p className="text-sm text-gray-400">{market.examples}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Challenges & Solutions
              </span>
            </h3>
            <div className="space-y-4">
              {[
                { challenge: 'Radiation Exposure', solution: 'Space-hardened components with multi-layer shielding', icon: '☢️' },
                { challenge: 'Cybersecurity Risks', solution: 'Blockchain authentication with multi-signature control', icon: '🔒' },
                { challenge: 'Zero-Gravity Positioning', solution: 'Visual servoing combined with reaction wheels', icon: '🎯' },
                { challenge: 'Communication Latency', solution: 'Predictive AI with autonomous operation modes', icon: '📡' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-6">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <span className="text-red-400 font-bold">Challenge:</span>
                      <span className="text-white">{item.challenge}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                      <span className="text-green-400 font-bold">Solution:</span>
                      <span className="text-gray-300">{item.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Partnership */}
          <section className="mb-24">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 mb-6 backdrop-blur-sm">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Strategic Partnership
                </span>
              </div>
              <h3 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ClearSpace Collaboration
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Partnering with ClearSpace to integrate their proven gripper technology for enhanced capture and manipulation capabilities
              </p>
            </div>
          </section>

          {/* Next Steps */}
          <section className="text-center">
            <h3 className="text-3xl font-bold mb-8 text-white">Next Steps</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { step: '01', title: 'Fund Development', desc: 'Complete R&D and prototype testing' },
                { step: '02', title: 'Earth Testing', desc: 'Air-bearing simulators and ground validation' },
                { step: '03', title: 'ISS Mission', desc: 'Space qualification and demonstration' }
              ].map((next, i) => (
                <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    {next.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{next.title}</h4>
                  <p className="text-gray-400">{next.desc}</p>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="relative rounded-3xl overflow-hidden p-12 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Join the Revolution
                  </span>
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Help us build the future of sustainable space operations
                </p>
                <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40">
                  <span className="relative z-10 flex items-center gap-3">
                    Back This Project Now
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
