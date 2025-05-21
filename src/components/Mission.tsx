
import { Leaf, Users, ShieldCheck } from 'lucide-react';
import { CAAMButton } from "./CAAMButton";

type Feature = {
  name: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    name: 'Connect & Empower',
    description:
      'CAAM brings together Ayurveda professionals, institutions, students, and enthusiasts across California, creating a united community dedicated to lasting change. We envision a world where people take action to heal and transform—globally, locally, and within themselves.',
    icon: Leaf
  },
  {
    name: 'Transform Communities',
    description:
      'CAAM is a dynamic network of professionals, leaders, and change-makers committed to bringing holistic healing to the world. We work together to drive impactful change, promoting well-being and harmony in our communities and beyond.',
    icon: Users
  },
  {
    name: 'Drive Solutions',
    description:
      'For over 22 years, CAAM has championed the Ayurvedic community, embodying the principles of Ayurveda while advancing it as an independent profession. We protect the right to practice Ayurveda, ensuring its integrity and supporting its growth to serve humanity.',
    icon: ShieldCheck
  },
];

export default function Mission() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-base text-emerald-700 font-semibold tracking-wide uppercase mb-2">Our Mission</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-700">
            Join us in our mission to advance Ayurveda in California and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-3 rounded-md bg-emerald-100 text-emerald-800 mb-5">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{feature.name}</h4>
                <p className="leading-relaxed text-gray-800">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <CAAMButton
          variant="outline"
            href="/history"
            size="md"
          >
            Learn more about our history
          </CAAMButton>
        </div>
      </div>
    </div>
  );
}
