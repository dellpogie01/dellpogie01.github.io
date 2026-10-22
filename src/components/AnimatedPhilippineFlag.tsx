import React from 'react';

export const AnimatedPhilippineFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <div className={`relative inline-block ${className} flex-shrink-0 origin-left overflow-hidden rounded-[2px] shadow-md animate-flag-wave align-middle`}>
    <svg 
      className="w-full h-full block" 
      viewBox="0 0 30 20" 
      aria-label="Philippine Flag"
    >
      {/* Blue top band */}
      <rect width="30" height="10" fill="#0038A8" />
      {/* Red bottom band */}
      <rect y="10" width="30" height="10" fill="#CE1126" />
      {/* White equilateral triangle */}
      <polygon points="0,0 17.32,10 0,20" fill="#FFFFFF" />
      {/* Golden Sun */}
      <circle cx="5.8" cy="10" r="2.4" fill="#FCD116" />
      {/* 3 Golden Stars */}
      <circle cx="2.2" cy="3.2" r="0.75" fill="#FCD116" />
      <circle cx="2.2" cy="16.8" r="0.75" fill="#FCD116" />
      <circle cx="13.5" cy="10" r="0.75" fill="#FCD116" />
    </svg>
    {/* Dynamic cloth wave / wind shimmer light ripple overlay */}
    <div 
      className="absolute inset-0 pointer-events-none mix-blend-overlay animate-cloth-ripple" 
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 25%, rgba(0,0,0,0.35) 50%, rgba(255,255,255,0.45) 75%, rgba(255,255,255,0) 100%)',
        backgroundSize: '200% 100%'
      }}
    />
  </div>
);
