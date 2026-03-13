'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Plus, Package, MapPin } from 'lucide-react';

export function CollectionList() {
  const collections = useAppStore(s => s.collections);
  const products = useAppStore(s => s.products);
  const business = useAppStore(s => s.getCurrentBusiness());
  const setActiveCollectionId = useAppStore(s => s.setActiveCollectionId);
  const openModal = useAppStore(s => s.openModal);

  const bizCollections = collections.filter(c => c.businessId === business?.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Collections</h2>
          <p className="mt-1 text-sm text-gray-500">
            {bizCollections.length} collection{bizCollections.length !== 1 ? 's' : ''} · Named assortments shared to venues
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => openModal('create-collection')}>
          <Plus className="h-4 w-4" />
          Create Collection
        </Button>
      </div>

      <div className="space-y-3">
        {bizCollections.map(col => {
          const productCount = col.productIds.length;
          const venueCount = col.sharedToVenueIds.length;

          return (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-400 hover:shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{col.name}</h3>
                  <StatusBadge status={col.status} />
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    {productCount} product{productCount !== 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {venueCount} venue{venueCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          );
        })}

        {bizCollections.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
            <p className="text-sm text-gray-500">No collections yet</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openModal('create-collection')}
            >
              <Plus className="h-4 w-4" />
              Create your first collection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Inactive</Badge>;
    default:
      return null;
  }
}
