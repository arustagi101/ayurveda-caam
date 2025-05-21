import { X } from 'lucide-react';
import { ImmersionEvent } from '@/types/immersion';
import { CAAMButton } from '../CAAMButton';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface EventDetailsProps {
  event: ImmersionEvent;
  onClose?: () => void;
  variant?: 'modal' | 'inline';
}

export function EventDetails({ event, onClose, variant = 'modal' }: EventDetailsProps) {
  const [isPastEvent, setIsPastEvent] = useState(false);
  
  useEffect(() => {
    setIsPastEvent(new Date(event.date) < new Date());
  }, [event.date]);
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const content = (
    <div className={`${variant === 'modal' ? 'card' : ''}`}>
      {variant === 'modal' && onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-medium-gray hover:text-dark-gray focus:outline-none z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      )}
      
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
          <Image
            src={event.image}
            alt={event.topic}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-8 md:w-2/3">
          <h3 className="text-2xl font-bold mb-3">{event.topic}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2">
                <time dateTime={event.date}>{formattedDate}</time>
              </span>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2">
                {event.time}
              </span>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2">
                {event.presenter}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Event Details</h4>
            <p className="text-sm whitespace-pre-line">
              {event.details}
            </p>
          </div>
          
          {event.link && (
            <div className="mt-4">
              <CAAMButton 
                href={event.link}
                size="md" 
                showArrow
                external
                className="w-full"
              >
                {isPastEvent ? 'Watch Recording' : 'Register Now'}
              </CAAMButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-4xl">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
}
