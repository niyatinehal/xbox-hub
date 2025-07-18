'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import GameGrid from '@/components/GameGrid';
import { Filters } from '@/lib/types';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    genre: '',
    platform: '',
    sort: '-rating',
  });

  return (
    <div className="min-h-screen bg-[#0f1a17] px-6 py-8">
      <SearchBar onSearch={(search: string) =>
        setFilters((f) => ({ ...f, search }))
      } />
      <FilterBar
        onFilterChange={(updated: Partial<Filters>) =>
          setFilters((f) => ({ ...f, ...updated }))
        }
      />
      <HeroSection/>
      <GameGrid filters={filters} />
    </div>
  );
}
