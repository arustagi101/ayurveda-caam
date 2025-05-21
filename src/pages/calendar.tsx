import Layout from '../components/Layout';
import { ImmersionEvent } from '@/types/immersion';
import { getImmersionEvents } from '@/utils/fetchSheetData';
import { PageHero } from '@/components/PageHero';
import { Calendar } from '@/components/calendar/Calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ImmersionCard } from '@/components/immersion';

interface CalendarPageProps {
  events: ImmersionEvent[];
}

export default function CalendarPage({ events }: CalendarPageProps) {
  
  // Group events by month and year for the calendar view
  const eventsByDate = events.reduce<Record<string, ImmersionEvent[]>>((acc, event) => {
    const date = new Date(event.date);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <Layout
      title="Event Calendar | CAAM"
      description="View all upcoming and past Ayurvedic clinical immersion programs and events from the California Association of Ayurvedic Medicine."
    >
      <PageHero
        title="Event Calendar"
        description="Browse all our upcoming and past clinical immersion programs and events."
      >
        <p>Stay up-to-date with all CAAM events, including our popular clinical immersion programs, workshops, and educational sessions. Use the calendar view to plan ahead or browse the list view to see all events at a glance.</p>
      </PageHero>

      <section className="py-16 section-bg-primary">
        <div className="container">
          <Tabs defaultValue="calendar" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger 
                  value="calendar" 
                  className="px-8"
                >
                  Calendar View
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  className="px-8"
                >
                  List View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="calendar" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <Calendar events={events} eventsByDate={eventsByDate} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <ImmersionCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const sheetId = process.env.IMMERSION_SHEET_ID!;
    const events = await getImmersionEvents(sheetId);

    // Sort events by date (newest first)
    const sortedEvents = [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return {
      props: {
        events: sortedEvents,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        events: [],
      },
    };
  }
};
