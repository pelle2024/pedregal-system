'use client';

import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, MapPin } from 'lucide-react';

export function ShareCollectionToVenuesModal() {
  const open = useAppStore(s => s.modalOpen === 'share-collection-to-venues');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const venues = useAppStore(useShallow(s => s.getVenuesForBusiness()));
  const collections = useAppStore(s => s.collections);
  const updateCollection = useAppStore(s => s.updateCollection);

  const collectionId = data?.collectionId as string | undefined;
  const collection = collections.find(c => c.id === collectionId);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (collection) {
      setSelectedIds(new Set(collection.sharedToVenueIds));
    }
  }, [collection, open]);

  const toggle = (venueId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(venueId)) next.delete(venueId);
      else next.add(venueId);
      return next;
    });
  };

  const handleSave = () => {
    if (collection) {
      updateCollection(collection.id, { sharedToVenueIds: Array.from(selectedIds) });
    }
    closeModal();
  };

  if (!collection) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{collection.name}" to Venues</DialogTitle>
          <DialogDescription>
            Select which venues should carry this collection's products.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5 py-2">
          {venues.map(v => (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-colors',
                selectedIds.has(v.id)
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-medium text-gray-900">{v.name}</span>
              </div>
              {selectedIds.has(v.id) && <Check className="h-4 w-4 text-gray-900" />}
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSave}>
            Share to {selectedIds.size} venue{selectedIds.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
