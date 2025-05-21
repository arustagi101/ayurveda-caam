import React from 'react';
import { CAAMButton } from './CAAMButton';

interface PageHeroProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  backgroundClass?: string;
  showButtonArrow?: boolean;
}

export function PageHero({
  title,
  description,
  children,
  buttonText = 'Learn More',
  buttonHref,
  backgroundClass = 'bg-white',
  showButtonArrow = false,
}: PageHeroProps) {
  return (
    <section className={`PageHero relative overflow-hidden ${backgroundClass} py-20 md:py-28`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {title}
          </h1>
          
          {(description || children) && (
            <div className="mt-6 max-w-3xl mx-auto">
              {children || (
                <p className="hero-description">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {buttonHref && (
            <div className="mt-10 flex justify-center">
              <CAAMButton
                href={buttonHref}
                size="md"
                showArrow={showButtonArrow}
              >
                {buttonText}
              </CAAMButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
