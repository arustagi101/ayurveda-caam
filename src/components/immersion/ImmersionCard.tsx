'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ImmersionEvent } from '@/types/immersion';
import { CAAMButton } from "@/components/CAAMButton";
import { Calendar, Clock, User } from 'lucide-react';
import { EventDetails } from './EventDetailsModal';

interface ImmersionCardProps {
  event: ImmersionEvent;
  isFeatured?: boolean;
}

export function ImmersionCard({ event, isFeatured = false }: ImmersionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);
  
  useEffect(() => {
    setIsPastEvent(new Date(event.date) < new Date());
  }, [event.date]);
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (isFeatured) {
    return (
      <Card className="overflow-hidden">
        <EventDetails event={event} variant="inline" />
      </Card>
    );
  }

  return (
    <>
      <Card className="card h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.topic}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{event.topic}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-start">
                <User className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{event.presenter}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {event.link && (
              <CAAMButton 
                href={event.link}
                variant="primary"
                size="md"
                className="w-full"
                showArrow
                external
              >
                {isPastEvent ? 'Watch Recording' : 'Register Now'}
              </CAAMButton>
            )}
            <CAAMButton 
              variant="outline" 
              size="md"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              View Details
            </CAAMButton>
          </div>
        </div>
      </Card>
      
      {isModalOpen && (
        <EventDetails 
          event={event}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
