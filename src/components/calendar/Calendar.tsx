'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImmersionEvent } from '@/types/immersion';
import { Button } from '@/components/ui/button';
import { EventDetails } from '@/components/immersion/EventDetailsModal';

interface CalendarProps {
  events: ImmersionEvent[];
  eventsByDate: Record<string, ImmersionEvent[]>;
}

export function Calendar({ events, eventsByDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ImmersionEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset to current month when events change
  useEffect(() => {
    setCurrentDate(new Date());
  }, [events]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Calendar array to hold all days that will be displayed
    const calendarDays = [];
    
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      const dateKey = formatDateKey(date);
      
      calendarDays.push({
        date,
        day,
        currentMonth: false,
        events: eventsByDate[dateKey] || [],
        dateKey
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = formatDateKey(date);
      
      calendarDays.push({
        date,
        day,
        currentMonth: true,
        events: eventsByDate[dateKey] || [],
        dateKey,
        isToday: isToday(date)
      });
    }
    
    // Add days from the next month to complete the last week
    const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateKey = formatDateKey(date);
      
      calendarDays.push({
        date,
        day,
        currentMonth: false,
        events: eventsByDate[dateKey] || [],
        dateKey
      });
    }
    
    return calendarDays;
  };

  // Format date as YYYY-MM-DD for lookup in eventsByDate
  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Handle event click
  const handleEventClick = (event: ImmersionEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-dark-green">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToToday}
            className="text-dark-green border-dark-green hover:bg-emerald-50"
          >
            Today
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            className="text-dark-green border-dark-green hover:bg-emerald-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="text-dark-green border-dark-green hover:bg-emerald-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((day) => (
            <div 
              key={day} 
              className="text-center font-semibold py-2 text-dark-green"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayInfo, index) => (
            <div
              key={index}
              className={`
                min-h-[100px] p-1 border rounded-md
                ${dayInfo.currentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${dayInfo.isToday ? 'border-amber-500 border-2' : 'border-gray-200'}
                ${isPastDate(dayInfo.date) && dayInfo.currentMonth ? 'bg-gray-50/50' : ''}
              `}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-medium ${dayInfo.isToday ? 'text-amber-600' : ''}`}>
                  {dayInfo.day}
                </span>
                {dayInfo.events.length > 0 && (
                  <span className="text-xs bg-emerald-100 text-dark-green px-1.5 py-0.5 rounded-full">
                    {dayInfo.events.length}
                  </span>
                )}
              </div>
              
              {/* Events for this day */}
              <div className="space-y-1">
                {dayInfo.events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-emerald-50 text-dark-green p-1 rounded cursor-pointer hover:bg-emerald-100 truncate"
                    onClick={() => handleEventClick(event)}
                  >
                    {event.time && <span className="font-medium">{event.time}</span>} {event.topic}
                  </div>
                ))}
                {dayInfo.events.length > 2 && (
                  <div className="text-xs text-dark-green text-center">
                    +{dayInfo.events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <EventDetails 
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
