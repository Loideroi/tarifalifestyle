'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search products...',
  className,
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
      }
    },
    [query, onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-driftwood-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-driftwood-400 hover:text-driftwood-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700">
        Search
      </Button>
    </form>
  );
}
