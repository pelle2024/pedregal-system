'use client';

import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2 } from 'lucide-react';

export function VenueSwitcher() {
  const context = useAppStore(s => s.context);
  const venues = useAppStore(useShallow(s => s.getVenuesForBusiness()));
  const switchVenue = useAppStore(s => s.switchVenue);
  const business = useAppStore(s => s.getCurrentBusiness());

  const value = context.level === 'business' ? 'business' : (context.currentVenueId ?? 'business');

  return (
    <Select value={value} onValueChange={switchVenue}>
      <SelectTrigger className="w-52">
        <Building2 className="mr-2 h-4 w-4 text-gray-400" />
        <SelectValue placeholder="Select venue" />
      </SelectTrigger>
      <SelectContent>
        {venues.length > 1 && (
          <SelectItem value="business">
            {business?.name ?? 'All venues'} (Business)
          </SelectItem>
        )}
        {venues.map(v => (
          <SelectItem key={v.id} value={v.id}>
            {v.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
