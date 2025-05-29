import { Leaf, Shield, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { CAAMButton } from './CAAMButton';

interface MissionPillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

const missionPillars: MissionPillar[] = [
  {
    title: 'Honoring Tradition',
    description: 'Preserving and advancing Ayurveda\'s authentic principles while establishing rigorous professional standards that elevate the practice to its rightful place in modern healthcare.',
    icon: Leaf,
  },
  {
    title: 'Empowering Practitioners',
    description: 'Building a protected framework for Ayurvedic professionals through advocacy, standardized education, ethical guidelines, and the pursuit of state-recognized licensure.',
    icon: Shield,
  },
  {
    title: 'Uniting Community',
    description: 'Cultivating a collaborative ecosystem of professionals, educators, and enthusiasts to strengthen Ayurveda\'s voice and expand its reach throughout California.',
    icon: Users,
  },
];

const missionStatement = 'CAAM exists to establish Ayurveda as a recognized healthcare profession in California, preserving its authentic wisdom while making its transformative benefits accessible to all.';

export default function Mission() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'var(--off-white)' }}>
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: 'var(--brand-gold)' }}></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: 'var(--dark-green)' }}></div>
      
      <div className="container relative z-10 mx-auto">
        {/* Mission Headline */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight" style={{ color: 'var(--dark-green)' }}>
            Our Mission
          </h2>
          
          {/* Mission Statement */}
          <div className="mx-auto max-w-3xl mb-10 px-6 py-8 rounded-lg relative" style={{ backgroundColor: 'var(--white)', borderLeft: '4px solid var(--brand-gold)' }}>
            <p className="text-xl md:text-2xl italic font-medium leading-relaxed" style={{ color: 'var(--dark-green)' }}>
              {missionStatement}
            </p>
          </div>
          
          {/* Vision Statement */}
          <p className="text-lg md:text-xl max-w-4xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We envision a California where Ayurveda is an integral part of the healthcare landscape, honored for its wisdom in fostering holistic well-being and recognized as a profession that harmonizes body, mind, and spirit with nature.
          </p>
        </div>

        {/* Mission Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mt-16">
          {missionPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden transition-all duration-300 ease-in-out"
              >
                {/* Card */}
                <div className="bg-white rounded-lg p-8 h-full flex flex-col relative z-10 shadow-md group-hover:shadow-xl transition-all duration-300 ease-in-out">
                  {/* Icon and Title Row */}
                  <div className="flex items-center mb-5" style={{ alignItems: 'center' }}>
                    {/* Icon */}
                    <div className="flex-shrink-0 mr-3 rounded-full" style={{ background: 'rgba(201, 175, 76, 0.15)', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent style={{ color: 'var(--brand-gold)', width: '24px', height: '24px' }} />
                    </div>
                    
                    {/* Title */}
                    <h3 style={{ color: 'var(--dark-green)', fontSize: '1.25rem', fontWeight: '600', margin: 0, padding: 0, lineHeight: 1 }}>
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed flex-grow text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
                    {pillar.description}
                  </p>
                  
                  {/* Bottom Border */}
                  <div 
                    className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: 'var(--brand-gold)' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Conclusion Statement */}
        <div className="mt-20 text-center">
          <p className="text-lg md:text-xl font-medium max-w-4xl mx-auto mb-8" style={{ color: 'var(--accent-primary)' }}>
            Join us in shaping the future of Ayurveda in California.
          </p>
          
          <div className="flex justify-center">
            <CAAMButton
              href="/membership"
              variant="primary"
              size="md"
              showArrow={true}
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Become a Member Today
            </CAAMButton>
          </div>
        </div>
      </div>
    </section>
  );
}
