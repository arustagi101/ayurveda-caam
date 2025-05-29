'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import { CAAMButton } from './CAAMButton';
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
  // Proportional dimensions with clear hierarchy
  const cardDimensions = {
    sm: 'w-44 h-28',
    md: 'w-56 h-36',
    lg: 'w-72 h-48'
  };
  
  // Image dimensions with proper sizing
  const imageDimensions = {
    sm: { width: 100, height: 60 },
    md: { width: 140, height: 90 },
    lg: { width: 180, height: 120 }
  };

  const containerClasses = {
    sm: 'p-4 bg-white hover:bg-gray-50 rounded-md shadow-sm hover:shadow transition-all duration-300 border border-gray-100',
    md: 'p-5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100',
    lg: 'p-6 bg-white hover:bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center transition-all duration-300 ${containerClasses[size]} ${cardDimensions[size]} ${className}`}
    >
      <div className="relative flex-1 w-full flex items-center justify-center p-2">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Image 
            className="object-contain"
            src={logo} 
            alt={name} 
            width={imageDimensions[size].width}
            height={imageDimensions[size].height}
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%',
              objectFit: 'contain',
            }}
          />
        </div>
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
    <section className="py-20 relative" style={{ backgroundColor: 'var(--off-white)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: 'var(--brand-gold)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ backgroundColor: 'var(--dark-green)' }}></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: 'var(--dark-green)' }}>
            Our Partners
          </h2>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
            We're grateful to work with organizations that share our commitment to advancing Ayurveda in California.
          </p>
        </div>
        
        {/* All Partners in organized grid layout */}
        <div className="mb-16">
          {/* Platinum Partners */}
          <div className="mb-12 text-center">
            <h3 className="inline-block px-4 py-1 mb-8 text-sm font-semibold uppercase tracking-wide rounded-full" 
                style={{ backgroundColor: 'rgba(201, 175, 76, 0.15)', color: 'var(--accent-primary)' }}>
              Platinum Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {sponsors.platinum.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.name}
                  name={sponsor.name}
                  logo={sponsor.logo}
                  url={sponsor.url}
                  size="lg"
                  className="mx-2"
                />
              ))}
            </div>
          </div>

          {/* Bronze Partners */}
          <div className="mb-12 text-center">
            <h3 className="inline-block px-4 py-1 mb-8 text-sm font-semibold uppercase tracking-wide rounded-full" 
                style={{ backgroundColor: 'rgba(201, 175, 76, 0.15)', color: 'var(--accent-primary)' }}>
              Bronze Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {sponsors.bronze.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.name}
                  name={sponsor.name}
                  logo={sponsor.logo}
                  url={sponsor.url}
                  size="md"
                  className="mx-2"
                />
              ))}
            </div>
          </div>

          {/* Community Partners */}
          <div className="mb-8 text-center">
            <h3 className="inline-block px-4 py-1 mb-6 text-sm font-semibold uppercase tracking-wide rounded-full" 
                style={{ backgroundColor: 'rgba(201, 175, 76, 0.15)', color: 'var(--accent-primary)' }}>
              Community Allies
            </h3>
            <div className="flex flex-wrap justify-center gap-5">
              {sponsors.community.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.name}
                  name={sponsor.name}
                  logo={sponsor.logo}
                  url={sponsor.url}
                  size="sm"
                  className="mx-2"
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Partnership */}
        <div className="mt-16 text-center max-w-2xl mx-auto pt-10 border-t border-gray-200">
          <p className="text-lg font-medium mb-4" style={{ color: 'var(--accent-primary)' }}>
            Interested in partnering with CAAM?
          </p>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Join our growing network of organizations committed to advancing Ayurvedic medicine in California.
          </p>
          <div className="flex justify-center">
            <CAAMButton
              href="/contact"
              variant="primary"
              size="md"
              showArrow={true}
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Become a Partner
            </CAAMButton>
          </div>
        </div>
      </div>
    </section>
  );
}
