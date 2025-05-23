
import { PageHero } from '@/components/PageHero';
import { Metadata } from 'next';
import { getDirectoryData } from '@/lib/fetchDirectoryData';
import DirectorySearchClient from '@/components/directory/DirectorySearchClient';

export const metadata: Metadata = {
    title: "Professional Directory | CAAM",
    description: "View all upcoming and past Ayurvedic clinical immersion programs and events from the California Association of Ayurvedic Medicine.",
};

export default async function ProfessionalDirectory() {
    const { professionals, specialities, languages, cities, states } = await getDirectoryData();

    return (
        <>
            <PageHero
                title="Find an Ayurvedic Professional"
                description="Ayurveda's core principle is empowering you to embody your inner healer and sometimes we all need a bit of support. CAAM offers listings of qualified Ayurvedic Professionals all across the state of California as well as outside of CA, at all levels of practice. Each practitioner on this list is a member of CAAM. As long as they offer tele-health sessions, you can work with these practitioners from wherever you live; you do not have to reside in California. You can find practitioners in various locations, with various levels of practice, or specialties."
            />
            <DirectorySearchClient 
                professionals={professionals}
                specialities={specialities}
                languages={languages}
                cities={cities}
                states={states}
            />
        </>
    );
}