import React from 'react';
import { Professional } from '@/types/directory';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ProfessionalModalProps {
  professional: Professional;
  onClose: () => void;
}

function ProfessionalModalComponent({ professional, onClose }: ProfessionalModalProps) {
  // Function to get initials from name
  const getInitials = () => {
    const first = professional.firstName.charAt(0);
    const last = professional.lastName.charAt(0);
    return (first + last).toUpperCase();
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
        
        <div className="relative w-full max-w-4xl card">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-medium-gray hover:text-dark-gray focus:outline-none z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="p-8">
            {/* Header with name on left, image on right */}
            <div className="flex flex-row justify-between items-start">
              {/* Left side: Name, Location, Website */}
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-dark-green">
                  {professional.firstName} {professional.lastName}
                </h2>
                
                <p className="text-md text-dark-gray mt-1 mb-2">
                  {professional.city}, {professional.state}
                </p>
                
                {professional.website && (
                  <p className="text-sm">
                    <a 
                      href={professional.website.startsWith('http') ? professional.website : `https://${professional.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {professional.website}
                    </a>
                  </p>
                )}
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
            
            {/* Specialties section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-dark-green">Specialties</h3>
              <p className="mt-1 text-sm text-dark-gray">
                {professional.speciality.length > 0 ? professional.speciality.join(', ') : 'Not specified'}
              </p>
            </div>

            {/* Services section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-dark-green">Services</h3>
              <p className="mt-1 text-sm text-dark-gray">
                {professional.services.length > 0 ? professional.services.join(', ') : 'No services listed'}
              </p>
            </div>

            {/* Languages section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-dark-green">Languages Spoken</h3>
              <p className="mt-1 text-sm text-dark-gray">
                {professional.languages.length > 0 ? professional.languages.join(', ') : 'Not specified'}
              </p>
            </div>

            {/* Membership section */}
            {professional.membershipLevel && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-semibold text-dark-green">CAAM Membership</h3>
                <p className="mt-1 text-sm text-dark-gray">{professional.membershipLevel}</p>
              </div>
            )}

            {/* Certifications section */}
            {professional.certificates && professional.certificates.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-semibold text-dark-green">Certifications</h3>
                <p className="mt-1 text-sm text-dark-gray">
                  {professional.certificates.join(', ')}
                </p>
              </div>
            )}
            
            {/* About section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-dark-green">About</h3>
              <p className="mt-1 text-sm text-dark-gray whitespace-pre-line">
                {professional.description || 'No additional information provided.'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const ProfessionalModal = React.memo(ProfessionalModalComponent);