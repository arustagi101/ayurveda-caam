// src/pages/professional-directory.tsx
import { GetStaticProps } from 'next';
import { Professional } from '@/types/directory';
import { fetchDirectoryData } from '@/utils/fetchDirectoryData';
import { PageHero } from '@/components/PageHero';
import { SearchForm, SearchFormRef } from '@/components/directory/SearchForm';
import { ProfessionalCard } from '@/components/directory/ProfessionalCard';
import { useState, useRef } from 'react';
import Layout from '../components/Layout';

interface ProfessionalDirectoryProps {
  professionals: Professional[];
  specialities: string[];
  languages: string[];
  cities: string[];
  states: string[];
}

export default function ProfessionalDirectory({ professionals, specialities, languages, cities, states }: ProfessionalDirectoryProps) {
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchFormRef = useRef<SearchFormRef>(null);

  const handleSearch = (filters: { speciality: string[]; language: string[]; city: string[]; state: string[] }) => {
    // Check if any filters are applied
    const hasFilters = (
      filters.speciality.length > 0 || 
      filters.language.length > 0 || 
      filters.city.length > 0 || 
      filters.state.length > 0
    );
    
    // Set that a search has been performed
    setHasSearched(true);
    
    // If no filters are applied, show no results
    if (!hasFilters) {
      setFilteredProfessionals([]);
      return;
    }
    
    // Otherwise, apply filters
    let results = [...professionals];

    // Filter by speciality
    if (filters.speciality.length > 0) {
      results = results.filter(professional => 
        filters.speciality.some(spec => professional.speciality.includes(spec))
      );
    }

    // Filter by language
    if (filters.language.length > 0) {
      results = results.filter(professional => 
        filters.language.some(lang => professional.languages.includes(lang))
      );
    }

    // Filter by city
    if (filters.city.length > 0) {
      results = results.filter(professional => {
        // Handle the special 'Non-CA' city option
        if (filters.city.includes('Non-CA')) {
          // If 'Non-CA' is selected, include professionals from non-CA cities
          const isNonCaState = professional.state.trim().toUpperCase() !== 'CA' && 
                              professional.state.trim().toUpperCase() !== 'CALIFORNIA';
          
          // Check if any specific city is also selected
          const hasSpecificCity = filters.city.some(city => 
            city !== 'Non-CA' && professional.city === city
          );
          
          return hasSpecificCity || (isNonCaState && !hasSpecificCity);
        } else {
          // Regular city filtering
          return filters.city.includes(professional.city);
        }
      });
    }

    // Filter by state
    if (filters.state.length > 0) {
      results = results.filter(professional => {
        // Handle the special 'Non-CA' state option
        if (filters.state.includes('Non-CA')) {
          const isNonCaState = professional.state.trim().toUpperCase() !== 'CA' && 
                              professional.state.trim().toUpperCase() !== 'CALIFORNIA';
          
          // Check if CA is also selected
          const isCaSelected = filters.state.includes('CA');
          
          // If both CA and Non-CA are selected, include all professionals
          if (isCaSelected) {
            return true;
          }
          
          // Otherwise, only include non-CA professionals
          return isNonCaState;
        } else if (filters.state.includes('CA')) {
          // Include professionals from CA
          return professional.state.trim().toUpperCase() === 'CA' || 
                 professional.state.trim().toUpperCase() === 'CALIFORNIA';
        }
        
        // Fallback to exact state matching
        return filters.state.includes(professional.state);
      });
    }

    setFilteredProfessionals(results);
  };
  
  // Reset filters function to clear results
  const resetFilters = () => {
    if (searchFormRef.current) {
      searchFormRef.current.resetForm();
    }
    setFilteredProfessionals([]);
    setHasSearched(false);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <PageHero 
          title="Find an Ayurvedic Professional"
          description="Ayurveda's core principle is empowering you to embody your inner healer and sometimes we all need a bit of support. CAAM offers listings of qualified Ayurvedic Professionals all across the state of California as well as outside of CA, at all levels of practice. Each practitioner on this list is a member of CAAM. As long as they offer tele-health sessions, you can work with these practitioners from wherever you live; you do not have to reside in California. You can find practitioners in various locations, with various levels of practice, or specialties."
        />
        
        <section className="section-bg-secondary">
          <div className="container py-12">
          <SearchForm 
            ref={searchFormRef}
            onSearch={handleSearch} 
            onReset={resetFilters}
            specialities={specialities}
            languages={languages}
            cities={cities}
            states={states}
          />
          <div className="container py-6"></div>
          {filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              {/* Show different message based on whether search was performed */}
              {hasSearched ? (
                <>
                  <p className="text-lg text-gray-600">No professionals found matching your criteria.</p>
                  <button onClick={resetFilters} className="mt-4 btn btn-outline">
                    Reset Filters
                  </button>
                </>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-dark-green mb-4">Find an Ayurvedic Professional</h3>
                  <p className="text-gray-600 mb-6">Use the search filters above to find Ayurvedic professionals by specialty, language, location, or other criteria.</p>
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                    <p className="text-dark-green">Select at least one search criteria to view professionals in our directory.</p>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sheetId = process.env.MEMBERS_SHEET_ID!;
  const professionals = await fetchDirectoryData(sheetId);
  
  // Extract unique values for filters
  const specialities = Array.from(
    new Set(
      professionals.flatMap((p: Professional) => p.speciality)
    )
  ).sort();
  
  const languages = Array.from(
    new Set(
      professionals.flatMap((p: Professional) => p.languages)
    )
  ).sort();

  // Separate CA cities and non-CA cities
  const caCities: string[] = [];
  const nonCaCities: string[] = [];
  
  professionals.forEach((p: Professional) => {
    const city = p.city.trim();
    if (city) {
      if (p.state.trim().toUpperCase() === 'CA' || p.state.trim().toUpperCase() === 'CALIFORNIA') {
        if (!caCities.includes(city)) {
          caCities.push(city);
        }
      } else {
        if (!nonCaCities.includes(city)) {
          nonCaCities.push(city);
        }
      }
    }
  });
  
  // Sort CA cities alphabetically
  caCities.sort();
  
  // Create the final cities array with CA cities first, then a "Non-CA" option
  const cities = [...caCities];
  if (nonCaCities.length > 0) {
    cities.push('Non-CA');
  }

  // Simplify states to just "CA" and "Non-CA" if there are non-CA professionals
  const hasNonCaProfessionals = professionals.some(
    (p: Professional) => p.state.trim().toUpperCase() !== 'CA' && p.state.trim().toUpperCase() !== 'CALIFORNIA'
  );
  
  const states = ['CA'];
  if (hasNonCaProfessionals) {
    states.push('Non-CA');
  }

  return {
    props: {
      professionals: JSON.parse(JSON.stringify(professionals)), // Ensure serialization
      specialities,
      languages,
      cities,
      states,
    },
  };
};