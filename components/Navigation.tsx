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
          <Link href="/home" className="flex items-center group">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-slate-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent group-hover:from-slate-200 group-hover:via-indigo-200 group-hover:to-violet-200 transition-all duration-300" style={{letterSpacing: '-0.02em'}}>
                MyStarlab
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
            <Link href="/space-ops" className={navLinkClass('/space-ops')}>
              <span className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Space Ops
              </span>
              {isActive('/space-ops') && (
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
              <span className="relative z-10 flex items-center">
                Newest project
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
              href="/space-ops" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive('/space-ops') 
                  ? 'bg-gradient-to-r from-slate-500/20 to-indigo-500/20 text-white font-semibold border border-indigo-500/30' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Space Ops
              </span>
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
              <span className="flex items-center justify-center">
                Newest project
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
