'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' || path === '/home') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === path;
  };

  const navLinkClass = (path: string) => {
    const active = isActive(path);
    return `relative text-sm font-medium transition-all duration-200 ${
      active 
        ? 'text-white' 
        : 'text-gray-300 hover:text-white'
    } group`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-purple-500/10' 
        : 'bg-black/70 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-slate-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent group-hover:from-slate-200 group-hover:via-indigo-200 group-hover:to-violet-200 transition-all duration-300" style={{letterSpacing: '-0.02em'}}>
                myStarlab
              </div>
              <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Space Innovation</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/home" className={navLinkClass('/home')}>
              <span className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">Home</span>
              {isActive('/home') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 rounded-full glow-pulse"></span>
              )}
            </Link>
            <Link href="/projects" className={navLinkClass('/projects')}>
              <span className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">Projects</span>
              {isActive('/projects') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 rounded-full glow-pulse"></span>
              )}
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              <span className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">About</span>
              {isActive('/about') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-slate-400 via-indigo-400 to-violet-400 rounded-full glow-pulse"></span>
              )}
            </Link>
            <Link 
              href="/starlab-station" 
              className="group relative ml-4 px-6 py-2.5 bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500 text-white text-sm font-bold rounded-xl hover:from-slate-600 hover:via-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 btn-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
                Starlab Station
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10 animate-fade-in-up">
            <Link 
              href="/home" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive('/home') 
                  ? 'bg-gradient-to-r from-slate-500/20 to-indigo-500/20 text-white font-semibold border border-indigo-500/30' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive('/projects') 
                  ? 'bg-gradient-to-r from-slate-500/20 to-indigo-500/20 text-white font-semibold border border-indigo-500/30' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-slate-500/20 to-indigo-500/20 text-white font-semibold border border-indigo-500/30' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/starlab-station" 
              className="block px-4 py-3 bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-slate-600 hover:via-indigo-600 hover:to-violet-600 transition-all duration-300 text-center btn-glow"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
                Starlab Station
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
