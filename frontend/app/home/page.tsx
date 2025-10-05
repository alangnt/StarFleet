'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import SpaceHero from '@/components/SpaceHero';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Advanced Three.js Hero Section with GSAP Animations */}
      <SpaceHero />

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-black via-black to-blue-950/10 relative">
        <div className="absolute inset-0 mesh-gradient opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-static">Our Impact</h2>
            <p className="text-gray-400 text-lg">Making space research accessible to everyone</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group card-premium rounded-2xl p-10 hover:scale-105 transition-all duration-300 animate-slide-in-left" style={{animationDelay: '0.1s'}}>
              <div className="text-5xl md:text-6xl font-bold gradient-text-static mb-3 transition-transform duration-300 group-hover:scale-110">
                $12.4M
              </div>
              <div className="text-gray-300 text-lg font-medium mb-2">Total Funded</div>
              <div className="divider-gradient my-4"></div>
              <div className="text-sm text-gray-400">Across 70+ research initiatives</div>
            </div>
            <div className="group card-premium rounded-2xl p-10 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-5xl md:text-6xl font-bold gradient-text-static mb-3 transition-transform duration-300 group-hover:scale-110">
                47
              </div>
              <div className="text-gray-300 text-lg font-medium mb-2">Active Projects</div>
              <div className="divider-gradient my-4"></div>
              <div className="text-sm text-gray-400">Ongoing research worldwide</div>
            </div>
            <div className="group card-premium rounded-2xl p-10 hover:scale-105 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
              <div className="text-5xl md:text-6xl font-bold gradient-text-static mb-3 transition-transform duration-300 group-hover:scale-110">
                15K+
              </div>
              <div className="text-gray-300 text-lg font-medium mb-2">Backers</div>
              <div className="divider-gradient my-4"></div>
              <div className="text-sm text-gray-400">Supporting space innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-static">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">Join thousands in funding the future of space</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="card-premium p-8 rounded-2xl h-full hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-110 transition-all duration-300">
                    1
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Discover Projects</h3>
                <p className="text-gray-400 leading-relaxed text-center">
                  Browse cutting-edge space research projects seeking funding from researchers and institutions worldwide.
                </p>
              </div>
              {/* Connecting line - hidden on mobile */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
            </div>
            
            <div className="relative group">
              <div className="card-premium p-8 rounded-2xl h-full hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl shadow-purple-500/50 group-hover:shadow-purple-500/70 group-hover:scale-110 transition-all duration-300">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Support Research</h3>
                <p className="text-gray-400 leading-relaxed text-center">
                  Contribute to projects that inspire you and help advance humanity&apos;s reach into space.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-transparent"></div>
            </div>
            
            <div className="relative group">
              <div className="card-premium p-8 rounded-2xl h-full hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl shadow-pink-500/50 group-hover:shadow-pink-500/70 group-hover:scale-110 transition-all duration-300">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Track Progress</h3>
                <p className="text-gray-400 leading-relaxed text-center">
                  Follow your supported projects with regular updates and see your impact on space exploration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project CTA */}
      <section className="py-32 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-90"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-3xl p-12 md:p-16 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 backdrop-blur-xl">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="badge-premium px-6 py-2 rounded-full text-sm font-semibold">
                  ⭐ Featured Project
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-static">
                Starlab Space Station
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Experience autonomous repair drones maintaining a commercial space station. 
                Witness the future of orbital infrastructure in stunning interactive 3D.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/starlab-station"
                  className="group px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 btn-glow relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>View Interactive Demo</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-xl gradient-text-static">$2.4M</div>
                    <div className="text-gray-400">Raised</div>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div className="text-center">
                    <div className="font-bold text-xl gradient-text-static">1.2K</div>
                    <div className="text-gray-400">Backers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .stars-bg {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 60px 70px, white, transparent),
            radial-gradient(1px 1px at 50px 50px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 90px 10px, white, transparent);
          background-size: 200px 200px;
          background-repeat: repeat;
          opacity: 0.5;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
