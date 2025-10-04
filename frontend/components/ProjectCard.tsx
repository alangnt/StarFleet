'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  fundedAmount: number;
  goalAmount: number;
  backers: number;
  daysLeft: number;
  imageUrl?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  category,
  fundedAmount,
  goalAmount,
  backers,
  daysLeft,
  imageUrl,
  featured = false
}: ProjectCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fundingPercentage = Math.min((fundedAmount / goalAmount) * 100, 100);
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  return (
    <div className={`group relative card-premium rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl ${
      featured 
        ? 'ring-2 ring-purple-500/50 hover:ring-purple-400/60 shadow-purple-500/20' 
        : 'hover:shadow-purple-500/10'
    }`}>
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-blue-950/50 via-purple-950/50 to-pink-950/50 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className={`object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <div className="text-7xl opacity-30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🚀</div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="badge-premium px-4 py-1.5 text-xs font-semibold rounded-full backdrop-blur-xl">
            {category}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
            className="glass-strong p-2.5 rounded-full backdrop-blur-xl hover:scale-110 transition-all duration-200"
            aria-label="Bookmark project"
          >
            <svg 
              className={`w-4 h-4 transition-all duration-200 ${
                isBookmarked ? 'fill-purple-400 text-purple-400' : 'fill-none text-white'
              }`}
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
              />
            </svg>
          </button>
        </div>
        
        {featured && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="badge-premium px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-xl flex items-center gap-1.5 animate-pulse-glow">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Featured</span>
            </div>
          </div>
        )}
        
        {/* Progress indicator on image */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 relative overflow-hidden"
            style={{ width: `${fundingPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:gradient-text-static transition-all duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold gradient-text-static">{formatCurrency(fundedAmount)}</span>
            <span className="text-sm text-gray-400">of {formatCurrency(goalAmount)}</span>
          </div>
          <div className="text-xs font-medium text-purple-400">
            {Math.round(fundingPercentage)}% funded
          </div>
        </div>

        <div className="divider-gradient"></div>

        {/* Stats Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">{backers.toLocaleString()}</div>
              <div className="text-xs text-gray-400">backers</div>
            </div>
          </div>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
            daysLeft <= 7 ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/10 text-blue-400'
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold">
              {daysLeft > 0 ? `${daysLeft} days` : 'Ended'}
            </span>
          </div>
        </div>
      </div>

      {/* Hover CTA Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
          <span>View Details</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

