import React, { useState } from 'react';
import { Professional } from '@/types/directory';
import { ProfessionalModal } from './ProfessionalModal';
import Image from 'next/image';
import { CAAMButton } from '@/components/CAAMButton';

interface ProfessionalCardProps {
  professional: Professional;
}

function ProfessionalCardComponent({ professional }: ProfessionalCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get initials from name
  const getInitials = () => {
    const first = professional.firstName.charAt(0);
    const last = professional.lastName.charAt(0);
    return (first + last).toUpperCase();
  };

  return (
    <>
      <div className="card h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <div className="p-6 flex-1 flex flex-col">
          {/* Top section with content on left, image on right */}
          <div className="flex flex-row justify-between mb-4">
            {/* Left side: Name and Location */}
            <div className="flex-1 pr-4">
              {/* Name */}
              <h3 className="text-xl font-bold text-dark-green mb-1">
                {professional.firstName} {professional.lastName}
              </h3>
              
              {/* Location - directly below name */}
              <p className="text-sm text-dark-gray mb-3">
                {professional.city}, {professional.state}
              </p>
              
              {/* Specialties */}
              <div>
                <p className="text-sm text-dark-gray font-medium">{professional.speciality.join(', ')}</p>
              </div>
            </div>
            
            {/* Right side: Image */}
            <div className="flex-shrink-0">
              {professional.image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold-light">
                  <Image 
                    src={professional.image} 
                    alt={`${professional.firstName} ${professional.lastName}`}
                    fill
                    unoptimized={!professional.image?.startsWith('http')}
                    className="object-cover"
                    onError={(e) => {
                      // If image fails to load, replace with initials
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement?.classList.add('bg-emerald-100', 'flex', 'items-center', 'justify-center');
                      const initialsEl = document.createElement('span');
                      initialsEl.className = 'text-dark-green font-bold text-xl';
                      initialsEl.textContent = getInitials();
                      target.parentElement?.appendChild(initialsEl);
                    }}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-gold-light">
                  <span className="text-dark-green font-bold text-xl">{getInitials()}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>
          
          {/* View Details Button */}
          <div className="mt-4">
            <CAAMButton 
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="md"
              className="w-full"
              showArrow
            >
              View Details
            </CAAMButton>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfessionalModal
          professional={professional}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const ProfessionalCard = React.memo(ProfessionalCardComponent);