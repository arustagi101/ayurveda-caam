import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Sponsors from '@/components/Sponsors';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "California Association of Ayurvedic Medicine | CAAM",
    description: "Promoting, Advancing and Safeguarding the Practice of Ayurveda in California",
};

export default function Home() {
    return (
        <>
            <Hero />
            <section className="section-bg-secondary">
                <Mission />
            </section>
            <section className="section-bg-primary">
                <Sponsors />
            </section>
        </>
    );
}