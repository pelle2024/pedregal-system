'use client';

import { useAppStore } from '@/store';
import { AllItemsVenueLevel } from '../items/AllItemsVenueLevel';
import { AllItemsBusinessLevel } from '../items/AllItemsBusinessLevel';

export function AllItemsTab() {
  const level = useAppStore(s => s.context.level);

  if (level === 'business') {
    return <AllItemsBusinessLevel />;
  }

  return <AllItemsVenueLevel />;
}
