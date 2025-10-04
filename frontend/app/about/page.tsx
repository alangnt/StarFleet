'use client';

import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About myStarlab
          </h1>
          <p className="text-xl text-gray-300">
            Democratizing space research funding, one project at a time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              myStarlab is a revolutionary crowdfunding platform dedicated to advancing space research and exploration. 
              We believe that groundbreaking discoveries shouldn&apos;t be limited by traditional funding constraints.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              By connecting passionate researchers with enthusiastic backers worldwide, we&apos;re creating a new model 
              for funding the future of space exploration. From autonomous repair drones to asteroid mining, from lunar 
              bases to deep space communications, every project brings us closer to becoming a truly spacefaring civilization.
            </p>
            <p className="text-lg text-gray-300">
              Join us in making space research accessible, transparent, and driven by the collective vision of people 
              who dare to dream beyond our planet.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-gray-400">
                We champion bold ideas and cutting-edge technology that push the boundaries of what&apos;s possible in space.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Global Collaboration</h3>
              <p className="text-gray-400">
                Space exploration is a human endeavor. We bring together researchers and backers from every corner of Earth.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-400">
                Every project includes detailed progress updates, financial reporting, and direct communication with researchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                $12.4M
              </div>
              <div className="text-gray-400">Total Funded</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                47
              </div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                15,247
              </div>
              <div className="text-gray-400">Backers</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                23
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
          <p className="text-lg text-gray-300 text-center mb-12">
            myStarlab was founded by a team of aerospace engineers, researchers, and technologists who believe 
            that the future of space exploration should be open to everyone. We combine decades of experience 
            in space systems, software development, and crowdfunding to create the premier platform for space research funding.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🛰️</div>
                <div>
                  <h4 className="font-semibold mb-1">Aerospace Engineering</h4>
                  <p className="text-sm text-gray-400">Deep expertise in orbital mechanics, propulsion, and space systems design</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔬</div>
                <div>
                  <h4 className="font-semibold mb-1">Research Collaboration</h4>
                  <p className="text-sm text-gray-400">Partnerships with leading universities and space agencies worldwide</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">💻</div>
                <div>
                  <h4 className="font-semibold mb-1">Technology Platform</h4>
                  <p className="text-sm text-gray-400">Secure, scalable infrastructure built for the space industry</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤝</div>
                <div>
                  <h4 className="font-semibold mb-1">Community Building</h4>
                  <p className="text-sm text-gray-400">Creating connections between researchers, backers, and space enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shape the Future of Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you&apos;re a researcher with a groundbreaking idea or a backer ready to support innovation, 
            myStarlab is your launchpad to the stars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Explore Projects
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
              Submit Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
