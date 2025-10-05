'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    id: 1,
    title: "StarFleet Micro-Robots",
    description: "Swarm of autonomous micro-robots for satellite repair and maintenance. Coordinated fleet reduces space debris and extends satellite operational life.",
    category: "Autonomous Robotics",
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
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Detect when filter bar becomes sticky with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section'); // First section (hero)
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 64; // 64px for nav height
        setIsSticky(scrollPosition >= heroBottom);
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchBlur = () => {
    // Add a small delay to prevent the freeze/flicker when clicking
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 150);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 mb-8 animate-fade-in backdrop-blur-sm">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Funding the Future of Space
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in" style={{letterSpacing: '-0.03em'}}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Explore
              </span>
              <br />
              <span className="text-white">Space Projects</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up leading-relaxed">
              Support groundbreaking space research and be part of humanity&apos;s journey beyond Earth
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">
                  ${(projects.reduce((sum, p) => sum + p.fundedAmount, 0) / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-400">Total Funded</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">
                  {projects.reduce((sum, p) => sum + p.backers, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Backers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section id="filter-section" className={`sticky top-16 z-30 backdrop-blur-xl bg-black/80 border-y border-white/10 transition-all duration-300 ${
        isSticky ? 'py-4' : 'py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Using max-w-2xl always to prevent layout shift */}
          <div className={`transition-all duration-500 ease-out ${
            isSticky ? 'mb-3' : 'mb-6'
          }`}>
            <div className="relative max-w-2xl mx-auto">
              {/* Inner container that scales */}
              <div className={`relative transition-all duration-500 ease-out ${
                isSticky && !isSearchFocused 
                  ? 'scale-75 origin-center' 
                  : 'scale-100'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-opacity duration-500 ${
                  isSticky && !isSearchFocused ? 'opacity-0' : 'opacity-100'
                }`}></div>
                <input
                  type="text"
                  placeholder={isSticky && !isSearchFocused ? "Search..." : "Search projects by name or description..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={handleSearchBlur}
                  className={`relative w-full px-6 pl-14 bg-white/5 text-white rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder:text-gray-500 backdrop-blur-sm ${
                    isSticky && !isSearchFocused ? 'py-2.5 text-sm' : 'py-4 text-base'
                  }`}
                />
                <svg className={`absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 transition-all duration-300 ${
                  isSticky && !isSearchFocused ? 'w-4 h-4' : 'w-5 h-5'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${
                      isSticky && !isSearchFocused ? 'w-6 h-6' : 'w-8 h-8'
                    }`}
                    aria-label="Clear search"
                  >
                    <svg className={`transition-all duration-200 ${
                      isSticky && !isSearchFocused ? 'w-3 h-3' : 'w-4 h-4'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Category Filter */}
            <div className={`flex flex-wrap transition-all duration-300 ${
              isSticky ? 'gap-1.5' : 'gap-2'
            }`}>
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl font-semibold transition-all duration-300 animate-fade-in ${
                    isSticky 
                      ? 'px-3 py-1.5 text-xs' 
                      : 'px-4 py-2 text-sm'
                  } ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <span className={`text-gray-400 font-medium whitespace-nowrap transition-all duration-300 ${
                isSticky ? 'text-xs' : 'text-sm'
              }`}>Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "trending" | "ending" | "funded")}
                className={`bg-white/5 border border-white/10 text-white rounded-xl px-4 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer hover:bg-white/10 transition-all duration-300 backdrop-blur-sm ${
                  isSticky ? 'py-1.5 text-xs' : 'py-2 text-sm'
                }`}
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
      <section className="py-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              Showing <span className="text-white font-bold text-lg">{sortedProjects.length}</span> project{sortedProjects.length !== 1 ? 's' : ''}
              {selectedCategory !== "All Projects" && (
                <span className="ml-2 text-purple-400">in {selectedCategory}</span>
              )}
            </div>
            {searchQuery && (
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search: <span className="text-purple-400 font-medium">&ldquo;{searchQuery}&rdquo;</span>
              </div>
            )}
          </div>
          
          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProjects.map((project, index) => (
                <Link 
                  key={project.id} 
                  href={project.id === 1 ? "/starlab-station" : "#"}
                  className="animate-fade-in-up hover:z-10"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProjectCard {...project} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gray-200">No projects found</h3>
              <p className="text-gray-400 mb-8 text-lg">
                {searchQuery 
                  ? `No projects match "${searchQuery}"` 
                  : `No projects in ${selectedCategory}`
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Projects");
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl"></div>
            <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-12 md:p-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 mb-6 backdrop-blur-sm">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Launch Your Vision
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6" style={{letterSpacing: '-0.02em'}}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Have a Space Research
                </span>
                <br />
                <span className="text-white">Project Idea?</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join myStarlab and connect with thousands of backers passionate about pushing the boundaries of space exploration
              </p>
              
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Submit Your Project
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
