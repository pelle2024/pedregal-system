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

export function ShareToVenuesModal() {
  const open = useAppStore(s => s.modalOpen === 'share-to-venues');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const venues = useAppStore(useShallow(s => s.getVenuesForBusiness()));
  const menus = useAppStore(s => s.menus);
  const updateMenu = useAppStore(s => s.updateMenu);

  const menuId = data?.menuId as string | undefined;
  const menu = menus.find(m => m.id === menuId);

  const [selectedVenueIds, setSelectedVenueIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (menu) {
      setSelectedVenueIds(new Set(menu.sharedToVenueIds));
    }
  }, [menu, open]);

  const toggle = (venueId: string) => {
    setSelectedVenueIds(prev => {
      const next = new Set(prev);
      if (next.has(venueId)) next.delete(venueId);
      else next.add(venueId);
      return next;
    });
  };

  const selectAll = () => setSelectedVenueIds(new Set(venues.map(v => v.id)));
  const deselectAll = () => setSelectedVenueIds(new Set());

  const handleSave = () => {
    if (menu) {
      updateMenu(menu.id, {
        isShared: selectedVenueIds.size > 0,
        sharedToVenueIds: Array.from(selectedVenueIds),
      });
    }
    closeModal();
  };

  if (!menu) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{menu.name}" to Venues</DialogTitle>
          <DialogDescription>
            Select which venues should receive this menu. Venues get a read-only copy of the menu structure but can override prices and item status.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <div className="flex gap-2 text-xs">
            <button onClick={selectAll} className="text-blue-600 hover:underline">Select all</button>
            <span className="text-gray-300">·</span>
            <button onClick={deselectAll} className="text-gray-500 hover:underline">Deselect all</button>
          </div>
          {venues.map(v => (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-colors',
                selectedVenueIds.has(v.id)
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <div className="text-left">
                  <span className="font-medium text-gray-900">{v.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{v.address}</span>
                </div>
              </div>
              {selectedVenueIds.has(v.id) && <Check className="h-4 w-4 text-gray-900" />}
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSave}>
            Share to {selectedVenueIds.size} venue{selectedVenueIds.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
