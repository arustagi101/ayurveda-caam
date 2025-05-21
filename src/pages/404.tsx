import React from 'react';
import Layout from '../components/Layout';
import { CAAMButton } from '@/components/CAAMButton';

export default function Custom404() {
  return (
    <Layout title="Page Not Found" description="The page you are looking for does not exist">
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
        <div className="text-center max-w-3xl mx-auto">          
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Harmony Disrupted
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            The page you seek is not in balance with our digital ecosystem.
          </p>
          
          <div className="mt-8">
            <CAAMButton 
              href="/"
              variant="primary"
              size="md"
            >
              Return to Balance (Home)
            </CAAMButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}
