import Layout from '../components/Layout';
import { ImmersionEvent } from '@/types/immersion';
import { getImmersionEvents } from '@/utils/fetchSheetData';
import { ImmersionCard } from '@/components/immersion';
import { PageHero } from '@/components/PageHero';

interface ClinicalImmersionProps {
  upcomingEvents: ImmersionEvent[];
  pastEvents: ImmersionEvent[];
  nextEvent?: ImmersionEvent;
}

export default function ClinicalImmersion({ upcomingEvents, pastEvents, nextEvent }: ClinicalImmersionProps) {
  return (
    <Layout
      title="Clinical Immersion Programs"
      description="Join our quarterly clinical immersion programs to deepen your Ayurvedic practice through real-world clinical experience with seasoned professionals."
    >
      <PageHero
        title="Clinical Immersion Programs"
        description=""
        buttonText="Become a Member"
        buttonHref="/membership"
        showButtonArrow={true}
      >
        <p>CAAM is thrilled to offer an exclusive quarterly Clinical Immersion Program designed specifically for our community. This hands-on series provides you with a unique opportunity to deepen your Ayurvedic practice through real-world clinical experience, guided by seasoned professionals in the field.</p>
          <p className="mt-4">Whether you&apos;re looking to advance your skills, gain valuable insights, or connect with experts and peers, this immersive program will empower you to take your learning to the next level. Join us each quarter and experience the transformative power of Ayurveda in action!</p>
      </PageHero>

      {/* Next Upcoming Event */}
      {nextEvent && (
        <section className="py-16 section-bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Next Immersion Program</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            </div>
            <div className="max-w-5xl mx-auto">
              <ImmersionCard event={nextEvent} isFeatured={true} />
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 section-bg-primary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Upcoming Programs</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <ImmersionCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 section-bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Past Programs</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Browse through our previous immersion programs and stay tuned for future sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <ImmersionCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}


    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const sheetId = process.env.IMMERSION_SHEET_ID!;
    const events = await getImmersionEvents(sheetId);

    // Separate upcoming and past events
    const now = new Date();
    const allUpcomingEvents = events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Get the next event (first upcoming event)
    const nextEvent = allUpcomingEvents[0] || null;
    
    // Filter out the next event from the upcoming events list
    const upcomingEvents = nextEvent 
      ? allUpcomingEvents.filter(event => event.id !== nextEvent.id)
      : [];

    const pastEvents = events
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      props: {
        upcomingEvents,
        pastEvents,
        nextEvent,
      }
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        upcomingEvents: [],
        pastEvents: [],
        nextEvent: null,
      }
    };
  }
};