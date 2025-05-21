import Layout from '../components/Layout';
import Mission from '../components/Mission';
import Sponsors from '../components/Sponsors';
import { CAAMButton } from '../components/CAAMButton';
import Image from 'next/image';

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Matching ayurveda-caam.org exactly */}
      <section className="bg-[#24403a] !text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl !text-white md:text-5xl lg:text-6xl font-bold mb-6">
              California Association of Ayurvedic Medicine
            </h1>

            <p className="text-xl !text-white md:text-2xl mb-8">
              Promoting, Advancing and Safeguarding the Practice of Ayurveda in California
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <CAAMButton
                href="/membership"
                variant="secondary"
                size="md"
                className="bg-gold-light text-[#24403a] hover:bg-gold-lighter"
              >
                Become a Member
              </CAAMButton>

              <CAAMButton
                href="https://form.jotform.com/243210185545148"
                variant="secondary"
                size="md"
                external
                className="bg-gold-light text-[#24403a] hover:bg-gold-lighter"
              >
                Donate
              </CAAMButton>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
          <Image
            src="/assets/misc/hero.jpg"
            alt="Ayurveda background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="section-bg-secondary">
        <Mission />
      </section>
      <section className="section-bg-primary">
        <Sponsors />
      </section>
    </Layout>
  );
}
