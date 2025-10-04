'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    id: 1,
    title: "Starlab Space Station",
    description: "Autonomous repair drone system for commercial space stations. Advanced AI-powered drones maintain and repair orbital infrastructure.",
    category: "Orbital Infrastructure",
    fundedAmount: 2400000,
    goalAmount: 5000000,
    backers: 1247,
    daysLeft: 15,
    featured: true
  },
  {
    id: 2,
    title: "Lunar Ice Mining Robot",
    description: "Autonomous excavation system for extracting water ice from lunar craters to support future moon bases.",
    category: "Lunar Exploration",
    fundedAmount: 890000,
    goalAmount: 2000000,
    backers: 542,
    daysLeft: 23
  },
  {
    id: 3,
    title: "Deep Space Communication Array",
    description: "Next-generation satellite network for ultra-long-range space communications beyond the solar system.",
    category: "Communications",
    fundedAmount: 3200000,
    goalAmount: 4000000,
    backers: 1823,
    daysLeft: 8
  },
  {
    id: 4,
    title: "Martian Soil Analysis Lab",
    description: "Compact laboratory module for analyzing Martian soil composition and detecting potential biosignatures.",
    category: "Mars Research",
    fundedAmount: 1100000,
    goalAmount: 3500000,
    backers: 678,
    daysLeft: 31
  },
  {
    id: 5,
    title: "Asteroid Deflection System",
    description: "Kinetic impactor technology for planetary defense against potentially hazardous near-Earth objects.",
    category: "Planetary Defense",
    fundedAmount: 4500000,
    goalAmount: 10000000,
    backers: 2341,
    daysLeft: 45
  },
  {
    id: 6,
    title: "Space Debris Removal Net",
    description: "Orbital cleanup system using advanced capture nets and deorbiting technology to remove space junk.",
    category: "Orbital Cleanup",
    fundedAmount: 650000,
    goalAmount: 1500000,
    backers: 432,
    daysLeft: 12
  },
  {
    id: 7,
    title: "Exoplanet Atmosphere Scanner",
    description: "High-precision spectroscopy instrument for detecting atmospheric composition of distant exoplanets.",
    category: "Astronomy",
    fundedAmount: 2800000,
    goalAmount: 6000000,
    backers: 1456,
    daysLeft: 27
  },
  {
    id: 8,
    title: "Zero-G Manufacturing Module",
    description: "Experimental facility for testing advanced materials manufacturing in microgravity conditions.",
    category: "Manufacturing",
    fundedAmount: 1900000,
    goalAmount: 4500000,
    backers: 891,
    daysLeft: 19
  },
  {
    id: 9,
    title: "Solar Sail Propulsion Test",
    description: "Demonstration mission for ultra-lightweight solar sail technology enabling fuel-free space travel.",
    category: "Propulsion",
    fundedAmount: 780000,
    goalAmount: 2500000,
    backers: 523,
    daysLeft: 36
  }
];

const categories = [
  "All Projects",
  "Orbital Infrastructure",
  "Lunar Exploration",
  "Mars Research",
  "Communications",
  "Planetary Defense",
  "Astronomy",
  "Manufacturing",
  "Propulsion",
  "Orbital Cleanup"
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [sortBy, setSortBy] = useState<"trending" | "ending" | "funded">("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All Projects" || project.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "ending") {
      return a.daysLeft - b.daysLeft;
    } else if (sortBy === "funded") {
      return (b.fundedAmount / b.goalAmount) - (a.fundedAmount / a.goalAmount);
    }
    // trending (default) - by backers
    return b.backers - a.backers;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 badge-premium mb-6 animate-fade-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span>Funding Space Innovation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-fade-in" style={{letterSpacing: '-0.02em'}}>
            Explore Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl animate-fade-in-up leading-relaxed">
            Support cutting-edge space research and be part of humanity&apos;s journey to the stars
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-14 glass-strong text-white rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg placeholder:text-gray-500"
              />
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 animate-fade-in ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/40 scale-105 btn-glow'
                      : 'glass-strong hover:bg-white/10 text-gray-300 hover:text-white hover:scale-105'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm font-medium">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "trending" | "ending" | "funded")}
                className="glass-strong border border-white/10 text-white rounded-xl px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <option value="trending" className="bg-gray-900">🔥 Trending</option>
                <option value="ending" className="bg-gray-900">⏰ Ending Soon</option>
                <option value="funded" className="bg-gray-900">💰 Most Funded</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-black min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-400">
              Showing <span className="text-white font-semibold">{sortedProjects.length}</span> project{sortedProjects.length !== 1 ? 's' : ''}
            </div>
            {searchQuery && (
              <div className="text-sm text-gray-400">
                Search results for: <span className="text-purple-400 font-medium">&ldquo;{searchQuery}&rdquo;</span>
              </div>
            )}
          </div>
          
          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <Link 
                  key={project.id} 
                  href={project.id === 1 ? "/starlab-station" : "#"}
                  className="animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProjectCard {...project} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-300">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `No projects match &ldquo;${searchQuery}&rdquo;` 
                  : `No projects in ${selectedCategory}`
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Projects");
                }}
                className="px-6 py-3 glass glass-hover rounded-lg text-white font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="card-premium p-10 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 badge-premium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Launch Your Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text" style={{letterSpacing: '-0.02em'}}>
                Have a Space Research Project?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join myStarlab and connect with thousands of backers passionate about space exploration
              </p>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-lg font-bold rounded-2xl hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 btn-glow overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Submit Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
