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

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All Projects" || project.category === selectedCategory
  );

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
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Explore Space Research Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Support cutting-edge space research and be part of humanity&apos;s journey to the stars
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "trending" | "ending" | "funded")}
                className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="trending">Trending</option>
                <option value="ending">Ending Soon</option>
                <option value="funded">Most Funded</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-gray-400">
            Showing {sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map(project => (
              <Link key={project.id} href={project.id === 1 ? "/starlab-station" : "#"}>
                <ProjectCard {...project} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Space Research Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join myStarlab and connect with backers passionate about space exploration
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Submit Your Project
          </button>
        </div>
      </section>
    </div>
  );
}
