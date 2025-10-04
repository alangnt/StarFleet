'use client';

import Image from 'next/image';

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
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] ${featured ? 'ring-2 ring-purple-500' : ''}`}>
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900/40 to-purple-900/40 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">🚀</div>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white font-semibold">{formatCurrency(fundedAmount)}</span>
            <span className="text-gray-400">of {formatCurrency(goalAmount)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${fundingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-white font-semibold">{backers.toLocaleString()}</span>
            <span className="text-gray-400"> backers</span>
          </div>
          <div className="text-gray-400">
            {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
          </div>
        </div>
      </div>
    </div>
  );
}
