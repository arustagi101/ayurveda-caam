'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Add CSS to hide scrollbars across browsers - moved to a separate component
const ScrollbarStyles = () => (
  <style jsx global>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);

type SponsorLogoProps = {
  name: string;
  logo: string;
  url: string;
  size: 'sm' | 'md' | 'lg';
  className?: string;
};

const SponsorLogo: React.FC<SponsorLogoProps> = ({ name, logo, url, size, className = '' }) => {
  // Fixed dimensions for each card size
  const cardDimensions = {
    sm: 'w-44 h-44',
    md: 'w-56 h-56',
    lg: 'w-72 h-72'
  };
  
  // Image dimensions for each size
  const imageDimensions = {
    sm: { width: 120, height: 80 },
    md: { width: 160, height: 120 },
    lg: { width: 200, height: 160 }
  };

  const containerClasses = {
    sm: 'p-4 bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm hover:shadow border border-gray-100',
    md: 'p-6 bg-gradient-to-b from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-amber-100',
    lg: 'p-8 bg-gradient-to-b from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-amber-200'
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center transition-all duration-300 ${containerClasses[size]} ${cardDimensions[size]} ${className}`}
    >
      <div className="relative flex-1 w-full flex items-center justify-center">
        <Image 
          className="object-contain"
          src={logo} 
          alt={name} 
          width={imageDimensions[size].width}
          height={imageDimensions[size].height}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    </a>
  );
};

// Client-side only component for scrolling effect
const ClientOnlyScrollingLogos = ({ sponsors }: { sponsors: Array<{ name: string; logo: string; url: string }> }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const scroll = () => {
      if (!scrollRef.current) return;
      
      if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1;
      }
    };
    
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ScrollbarStyles />
      <div className="relative overflow-hidden w-full">
        <div 
          ref={scrollRef}
          className="flex space-x-8 py-6 overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'smooth', gap: '1.5rem' }}
        >
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="flex-shrink-0">
              <SponsorLogo
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="md"
                className="w-48"
              />
            </div>
          ))}
          {/* Duplicate sponsors for continuous scrolling effect */}
          {sponsors.map((sponsor) => (
            <div key={`${sponsor.name}-dup`} className="flex-shrink-0">
              <SponsorLogo
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="md"
                className="w-48"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// SSG-compatible wrapper for the scrolling logos
const ScrollingLogos = ({ sponsors }: { sponsors: Array<{ name: string; logo: string; url: string }> }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Static fallback for SSG
  if (!isClient) {
    return (
      <div className="relative overflow-hidden w-full">
        <div className="flex flex-wrap justify-center gap-6 py-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="flex-shrink-0">
              <SponsorLogo
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="md"
                className="w-48"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return <ClientOnlyScrollingLogos sponsors={sponsors} />;
};

export default function Sponsors() {
  const sponsors = {
    platinum: [
      { 
        name: 'Athreya', 
        logo: '/assets/sponsors/athreyalogo-png.png',
        url: 'https://athreya.com' 
      },
    ],
    bronze: [
      { 
        name: 'Seva Ayurveda Academy', 
        logo: '/assets/sponsors/seva-ayurveda-academy.png',
        url: 'https://sevaayurveda.org' 
      },
      { 
        name: 'Kerala Ayurveda', 
        logo: '/assets/sponsors/kaa-bronze-2023.png',
        url: 'https://www.keralaayurveda.us/' 
      },
      { 
        name: 'HUA', 
        logo: '/assets/logos/hua-logo.png',
        url: 'https://www.hua.edu' 
      },
      { 
        name: 'CCA', 
        logo: '/assets/logos/cca-logo.png',
        url: 'https://www.cca.edu' 
      },
      { 
        name: 'Banyan Botanicals', 
        logo: '/assets/sponsors/banyan-logo-duotone-print-(2).jpeg',
        url: 'https://www.banyanbotanicals.com/' 
      },
      { 
        name: 'SCU', 
        logo: '/assets/logos/scu-horizontal-logo-tagline-blue.png',
        url: 'https://www.scuhs.edu' 
      },
    ],
    community: [
      { 
        name: 'Ayurvedamrut', 
        logo: '/assets/sponsors/ayurvedamrutlogopng-500x500.png',
        url: 'https://ayurvedamrut.com' 
      },
    ],
  };

  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center">
          <h2 className="text-base text-emerald-700 font-semibold tracking-wide uppercase mb-2">
            Our Valued Partners & Sponsors
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-700 sm:mt-4">
            We are grateful for the support of our partners who help us promote and advance Ayurveda in California.
          </p>
          
          {/* Platinum Sponsors */}
          <div className="mt-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-0.5 w-16 bg-emerald-200 mr-4"></div>
              <h3 className="text-base text-emerald-700 font-semibold uppercase tracking-wide">Platinum</h3>
              <div className="h-0.5 w-16 bg-emerald-200 ml-4"></div>
            </div>
            <div className="mt-8 flex justify-center">
              {sponsors.platinum.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.name}
                  name={sponsor.name}
                  logo={sponsor.logo}
                  url={sponsor.url}
                  size="lg"
                />
              ))}
            </div>
          </div>

          {/* Bronze Sponsors - Horizontal Scrolling */}
          <div className="mt-20">
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-emerald-200 mr-3"></div>
              <h3 className="text-base text-emerald-700 font-semibold uppercase tracking-wide">Bronze</h3>
              <div className="h-0.5 w-12 bg-emerald-200 ml-3"></div>
            </div>
            <div className="mt-6">
              <ScrollingLogos sponsors={sponsors.bronze} />
            </div>
          </div>

          {/* Community Partners */}
          <div className="mt-16">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-8 bg-emerald-200 mr-3"></div>
              <h3 className="text-base text-emerald-700 font-semibold uppercase tracking-wide">Community</h3>
              <div className="h-0.5 w-8 bg-emerald-200 ml-3"></div>
            </div>
            <div className="mt-4 flex justify-center">
              {sponsors.community.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.name}
                  name={sponsor.name}
                  logo={sponsor.logo}
                  url={sponsor.url}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
