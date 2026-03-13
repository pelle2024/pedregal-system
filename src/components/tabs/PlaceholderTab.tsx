'use client';

import { NavigationLevel } from '@/store/types';
import { Construction } from 'lucide-react';

interface PlaceholderTabProps {
  tab: string;
  level: NavigationLevel;
}

export function PlaceholderTab({ tab, level }: PlaceholderTabProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Construction className="mb-4 h-10 w-10 text-gray-300" />
      <h2 className="text-lg font-semibold text-gray-900">{tab}</h2>
      <p className="mt-1 text-sm text-gray-500">
        {level === 'business' ? 'Business' : 'Venue'} level — coming in next phase
      </p>
    </div>
  );
}
