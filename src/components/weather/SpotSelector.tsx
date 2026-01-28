'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { WINDGURU_SPOTS } from '@/lib/weather/types';

interface SpotSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function SpotSelector({ value, onValueChange, className }: SpotSelectorProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-ocean-500" />
            <SelectValue placeholder="Select spot" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {WINDGURU_SPOTS.map((spot) => (
            <SelectItem key={spot.id} value={spot.nameKey}>
              {spot.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
