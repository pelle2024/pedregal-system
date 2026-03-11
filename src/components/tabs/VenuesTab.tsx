'use client';

import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '@/store';
import { MapPin, ChevronRight, Package } from 'lucide-react';

export function VenuesTab() {
  const venues = useAppStore(useShallow(s => s.getVenuesForBusiness()));
  const drillIntoVenue = useAppStore(s => s.drillIntoVenue);
  const offers = useAppStore(s => s.offers);
  const menus = useAppStore(s => s.menus);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Venues</h2>
          <p className="mt-1 text-sm text-gray-500">
            {venues.length} venue{venues.length !== 1 ? 's' : ''} in this business
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map(v => {
          const venueOffers = offers.filter(o => o.venueId === v.id);
          const venueMenus = menus.filter(m => m.sharedToVenueIds.includes(v.id) || m.venueId === v.id);
          const activeCount = venueOffers.filter(o => o.status === 'active').length;
          const pausedCount = venueOffers.filter(o => o.status === 'paused').length;

          return (
            <button
              key={v.id}
              onClick={() => drillIntoVenue(v.id)}
              className="group rounded-lg border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-400 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{v.name}</h3>
                  <p className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    {v.address}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  {venueOffers.length} items
                </span>
                <span className="text-green-600">{activeCount} active</span>
                {pausedCount > 0 && (
                  <span className="text-amber-600">{pausedCount} paused</span>
                )}
                {venueMenus.length > 0 && (
                  <span>{venueMenus.length} menu{venueMenus.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
