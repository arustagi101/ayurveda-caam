// src/components/directory/SearchForm.tsx
import { useState, forwardRef, useImperativeHandle } from 'react';
import { MultiSelect } from '../ui/multi-select';
import { X } from 'lucide-react';

// Define a type for the ref methods
export interface SearchFormRef {
  resetForm: () => void;
}

interface SearchFormProps {
  onSearch: (filters: { speciality: string[]; language: string[]; city: string[]; state: string[] }) => void;
  specialities: string[];
  languages: string[];
  cities: string[];
  states: string[];
  onReset?: () => void; // Optional callback for reset action
}

const SearchFormComponent = forwardRef<SearchFormRef, SearchFormProps>((
  { onSearch, onReset, specialities, languages, cities, states }, 
  ref
) => {
  const [filters, setFilters] = useState({
    speciality: [] as string[],
    language: [] as string[],
    city: [] as string[],
    state: [] as string[]
  });

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setFilters({
        speciality: [],
        language: [],
        city: [],
        state: []
      });
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };
  
  const resetFilters = () => {
    setFilters({
      speciality: [],
      language: [],
      city: [],
      state: []
    });
    onSearch({
      speciality: [],
      language: [],
      city: [],
      state: []
    });
    
    // Call the onReset callback if provided
    if (onReset) {
      onReset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MultiSelect
            label="Speciality"
            options={specialities}
            selected={filters.speciality}
            onChange={(selected) => setFilters({ ...filters, speciality: selected })}
            placeholder="Select specialities..."
          />
        </div>
        
        <div>
          <MultiSelect
            label="Language"
            options={languages}
            selected={filters.language}
            onChange={(selected) => setFilters({ ...filters, language: selected })}
            placeholder="Select languages..."
          />
        </div>
        
        <div>
          <MultiSelect
            label="City"
            options={cities}
            selected={filters.city}
            onChange={(selected) => setFilters({ ...filters, city: selected })}
            placeholder="Select cities..."
          />
        </div>
        
        <div>
          <MultiSelect
            label="State"
            options={states}
            selected={filters.state}
            onChange={(selected) => setFilters({ ...filters, state: selected })}
            placeholder="Select states..."
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center text-medium-gray hover:text-dark-gray"
        >
          <X className="h-4 w-4 mr-1" />
          Reset Filters
        </button>
        
        <button
          type="submit"
          className="btn btn-primary"
        >
          Search
        </button>
      </div>
    </form>
  );
});

// Add display name to fix the react/display-name warning
SearchFormComponent.displayName = 'SearchForm';

export { SearchFormComponent as SearchForm };