'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'rounded-full',
            activeCategory === category.id
              ? 'bg-ocean-600 text-white hover:bg-ocean-700'
              : 'border-sand-300 text-driftwood-500 hover:border-ocean-300 hover:text-ocean-600'
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
