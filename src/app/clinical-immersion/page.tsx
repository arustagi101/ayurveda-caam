import { PageHero } from '@/components/PageHero';
import { ImmersionCard } from '@/components/immersion/ImmersionCard';
import { Metadata } from 'next';
import { getImmersionEventsWithDates } from '@/lib/fetchSheetData';

export const metadata: Metadata = {
    title: "Clinical Immersion | CAAM",
    description: "View all upcoming and past Ayurvedic clinical immersion programs and events from the California Association of Ayurvedic Medicine.",
};

export default async function ClinicalImmersionPage() {
    const { upcomingEvents, pastEvents, nextEvent } = await getImmersionEventsWithDates();
    return (
        <>
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
        </>
    )
}