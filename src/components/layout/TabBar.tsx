'use client';

import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const TAB_LABELS: Record<string, string> = {
  venues: 'Venues',
  catalog: 'Catalog',
  'all-items': 'All Items',
  menus: 'Menus',
  modifiers: 'Modifiers',
  bundles: 'Bundles',
  categories: 'Categories',
  collections: 'Collections',
};

export function TabBar() {
  const level = useAppStore(s => s.context.level);
  const currentVenueId = useAppStore(s => s.context.currentVenueId);
  const venueVertical = useAppStore(s => {
    if (s.context.currentVenueId) {
      const venue = s.venues.find(v => v.id === s.context.currentVenueId);
      if (venue) return venue.verticalType;
    }
    return null;
  });
  const bizVertical = useAppStore(s => s.businesses[0]?.verticalType ?? 'restaurant');
  const isMultiVenue = useAppStore(s => s.isMultiVenue());
  const activeTab = useAppStore(s => s.context.activeTab);
  const setActiveTab = useAppStore(s => s.setActiveTab);

  const tabs = useMemo(() => {
    const vertical = (level === 'venue' && venueVertical) ? venueVertical : bizVertical;
    if (level === 'business') {
      switch (vertical) {
        case 'restaurant': return ['venues', 'catalog', 'all-items', 'menus', 'modifiers', 'bundles'];
        case 'hybrid': return ['venues', 'catalog', 'all-items', 'menus', 'collections', 'modifiers', 'bundles'];
        default: return ['venues', 'catalog', 'all-items', 'collections', 'modifiers'];
      }
    }
    switch (vertical) {
      case 'restaurant': return isMultiVenue
        ? ['menus', 'all-items', 'modifiers', 'bundles']
        : ['menus', 'modifiers', 'bundles'];
      case 'hybrid': return ['all-items', 'menus', 'categories', 'modifiers', 'bundles'];
      default: return ['all-items', 'categories', 'modifiers'];
    }
  }, [level, venueVertical, bizVertical, isMultiVenue]);

  return (
    <div className="border-b border-gray-200 bg-white px-6">
      <nav className="-mb-px flex gap-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            {TAB_LABELS[tab] ?? tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
