import { CAAMButton } from './CAAMButton';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Client-side only animation component
const FloatingElements = () => {
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const elements = floatingElementsRef.current?.querySelectorAll('.floating-element');
    if (!elements) return;

    elements.forEach((el) => {
      // Random initial position within constraints
      const xPos = Math.random() * 60 - 30; // -30 to 30% (reduced range)
      const yPos = Math.random() * 60 - 30; // -30 to 30% (reduced range)
      const rotationDeg = Math.random() * 360;
      const duration = 20 + Math.random() * 30; // 20-50s (slower animation)
      const delay = Math.random() * -20; // Random start point in animation

      const htmlEl = el as HTMLElement;
      htmlEl.style.setProperty('--x-pos', `${xPos}%`);
      htmlEl.style.setProperty('--y-pos', `${yPos}%`);
      htmlEl.style.setProperty('--rotation', `${rotationDeg}deg`);
      htmlEl.style.setProperty('--duration', `${duration}s`);
      htmlEl.style.setProperty('--delay', `${delay}s`);
    });
  }, []);
  
  return (
    <div 
      ref={floatingElementsRef}
      className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none" // Further reduced opacity to 5%
      aria-hidden="true"
    >
      <div className="floating-element absolute w-16 h-16 bg-emerald-300 rounded-full blur-xl"></div>
      <div className="floating-element absolute w-20 h-20 bg-amber-300 rounded-full blur-xl"></div>
      <div className="floating-element absolute w-14 h-14 bg-emerald-400 rounded-full blur-lg"></div>
      <div className="floating-element absolute w-18 h-18 bg-amber-200 rounded-full blur-xl"></div>
      <div className="floating-element absolute w-16 h-16 bg-emerald-200 rounded-full blur-lg"></div>
      
      <style jsx>{`
        .floating-element {
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          transform: translate(var(--x-pos), var(--y-pos)) rotate(var(--rotation));
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(var(--x-pos), var(--y-pos)) rotate(var(--rotation));
          }
          50% {
            transform: translate(calc(var(--x-pos) * -0.7), calc(var(--y-pos) * -0.7)) rotate(calc(var(--rotation) + 180deg));
          }
        }
      `}</style>
    </div>
  );
};

// SSG-compatible Hero component
// Global CSS for the gradient animation and hero title override
const GlobalStyles = () => (
  <style jsx global>{`
    /* Ensure hero section fits the screen height */
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    
    /* Fix for mobile browsers with dynamic address bars */
    @media screen and (max-width: 768px) {
      .h-screen {
        height: 100vh; /* Use viewport height */
        height: -webkit-fill-available; /* For iOS Safari */
        min-height: -webkit-fill-available;
      }
    }
    
    @keyframes gradient-x {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
    .animate-gradient-x {
      background-size: 200% 100%;
      animation: gradient-x 15s ease infinite;
    }
    /* Override the global h1 styles specifically for the hero title */
    .hero-title {
      font-size: 2.5rem !important;
    }
    @media (min-width: 768px) {
      .hero-title {
        font-size: 3.4rem !important;
      }
    }
    @media (min-width: 1024px) {
      .hero-title {
        font-size: 5rem !important;
      }
    }
    
    /* Subtle pulse animation for the donate button */
    @keyframes pulse-subtle {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
    }
    
    .animate-pulse-subtle {
      animation: pulse-subtle 3s ease-in-out infinite;
    }
  `}</style>
);

export default function Hero() {
  // Track if we're on the client side for hydration-sensitive components
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden h-screen flex items-center">
      {/* Global styles for animations */}
      <GlobalStyles />
      {/* CAAMButton styles are included in the component */}
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image 
            src="/assets/misc/hero.jpg" 
            alt="Ayurveda background" 
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-amber-50/50 to-emerald-100/50"></div>
      </div>
      
      {/* Animated background elements - Only rendered on client side */}
      {isMounted && <FloatingElements />}

      <div className="container z-10">
        <div className="flex flex-col items-center justify-center text-center py-16 mt-2 md:-mt-36">
          <h2 className="hero-title text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700 animate-gradient-x">
              California Association of Ayurvedic Medicine
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="mission-text text-base md:text-xl lg:text-2xl bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              CAAM&apos;s mission is to advance and uphold the principles of Ayurveda through exceptional education, professional support, and industry-leading research. We are dedicated to raising public awareness and fostering sustainable health and well-being, establishing ourselves as the leading authority on Ayurveda in California.
            </p>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <CAAMButton
              href="/membership"
              variant="primary"
              size="md"
              external={true}
              showArrow={true}
            >
              Become a Member
            </CAAMButton>
            <CAAMButton 
              href="https://form.jotform.com/243210185545148"
              variant="secondary"
              size="md"
              external={true}
              className="animate-pulse-subtle"
            >
              Donate
            </CAAMButton>
          </div>
        </div>
      </div>
    </div>
  );
}
