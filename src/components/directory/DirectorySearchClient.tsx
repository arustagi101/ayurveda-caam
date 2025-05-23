'use client'
import { useRef, useState } from 'react';
import { Professional } from '@/types/directory';
import { SearchForm, SearchFormRef } from '@/components/directory/SearchForm';
import { ProfessionalCard } from '@/components/directory/ProfessionalCard';

interface DirectorySearchClientProps {
  professionals: Professional[];
  specialities: string[];
  languages: string[];
  cities: string[];
  states: string[];
}

export default function DirectorySearchClient({
  professionals,
  specialities,
  languages,
  cities,
  states,
}: DirectorySearchClientProps) {
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchFormRef = useRef<SearchFormRef>(null);

  const handleSearch = (filters: { speciality: string[]; language: string[]; city: string[]; state: string[] }) => {
    const hasFilters = (
      filters.speciality.length > 0 ||
      filters.language.length > 0 ||
      filters.city.length > 0 ||
      filters.state.length > 0
    );

    setHasSearched(true);

    if (!hasFilters) {
      setFilteredProfessionals([]);
      return;
    }

    let results = [...professionals];

    if (filters.speciality.length > 0) {
      results = results.filter(professional =>
        filters.speciality.some(spec => professional.speciality.includes(spec))
      );
    }

    if (filters.language.length > 0) {
      results = results.filter(professional =>
        filters.language.some(lang => professional.languages.includes(lang))
      );
    }

    if (filters.city.length > 0) {
      results = results.filter(professional => {
        if (filters.city.includes('Non-CA')) {
          const isNonCaState = professional.state.trim().toUpperCase() !== 'CA' &&
            professional.state.trim().toUpperCase() !== 'CALIFORNIA';
          const hasSpecificCity = filters.city.some(city =>
            city !== 'Non-CA' && professional.city === city
          );
          return hasSpecificCity || (isNonCaState && !hasSpecificCity);
        } else {
          return filters.city.includes(professional.city);
        }
      });
    }

    if (filters.state.length > 0) {
      results = results.filter(professional => {
        if (filters.state.includes('Non-CA')) {
          const isNonCaState = professional.state.trim().toUpperCase() !== 'CA' &&
            professional.state.trim().toUpperCase() !== 'CALIFORNIA';
          const isCaSelected = filters.state.includes('CA');
          if (isCaSelected) {
            return true;
          }
          return isNonCaState;
        } else if (filters.state.includes('CA')) {
          return professional.state.trim().toUpperCase() === 'CA' ||
            professional.state.trim().toUpperCase() === 'CALIFORNIA';
        }
        return filters.state.includes(professional.state);
      });
    }

    setFilteredProfessionals(results);
  };

  const resetFilters = () => {
    if (searchFormRef.current) {
      searchFormRef.current.resetForm();
    }
    setFilteredProfessionals([]);
    setHasSearched(false);
  };

  return (
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
  );
}
