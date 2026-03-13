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
import { Input } from '@/components/ui/input';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Check, MapPin } from 'lucide-react';

export function AddToVenuesModal() {
  const open = useAppStore(s => s.modalOpen === 'add-to-venues');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const venues = useAppStore(useShallow(s => s.getVenuesForBusiness()));
  const offers = useAppStore(s => s.offers);
  const products = useAppStore(s => s.products);
  const addOffer = useAppStore(s => s.addOffer);

  const productId = data?.productId as string | undefined;
  const product = products.find(p => p.id === productId);

  const venuesWithOffer = useMemo(() => {
    if (!productId) return new Set<string>();
    return new Set(offers.filter(o => o.productId === productId).map(o => o.venueId));
  }, [productId, offers]);

  const venuesWithoutOffer = venues.filter(v => !venuesWithOffer.has(v.id));

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState('');

  useEffect(() => {
    setSelectedIds(new Set());
    const existingOffer = offers.find(o => o.productId === productId);
    setPrice(existingOffer ? existingOffer.price.toFixed(2) : '');
  }, [productId, offers, open]);

  const toggle = (venueId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(venueId)) next.delete(venueId);
      else next.add(venueId);
      return next;
    });
  };

  const handleSave = () => {
    if (!productId) return;
    const existingOffer = offers.find(o => o.productId === productId);
    selectedIds.forEach(venueId => {
      addOffer({
        id: `o-${Date.now()}-${venueId}`,
        venueId,
        productId,
        price: parseFloat(price) || existingOffer?.price || 0,
        currency: existingOffer?.currency ?? '$',
        status: 'active',
        pausedUntil: null,
        availabilitySchedule: null,
        priceOverridden: false,
        source: 'direct',
        sourceId: null,
      });
    });
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add "{product?.title}" to Venues</DialogTitle>
          <DialogDescription>
            Select venues where this product should be sold. Already assigned: {venuesWithOffer.size} venue{venuesWithOffer.size !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        {venuesWithoutOffer.length > 0 ? (
          <div className="space-y-3 py-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Price for new venues</label>
              <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" type="number" step="0.01" />
            </div>
            <div className="space-y-1.5">
              {venuesWithoutOffer.map(v => (
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
          </div>
        ) : (
          <p className="py-4 text-center text-sm text-gray-500">This product is already in all venues.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSave} disabled={selectedIds.size === 0}>
            Add to {selectedIds.size} venue{selectedIds.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
