'use client';

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
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

export function OverrideConfirmationModal() {
  const open = useAppStore(s => s.modalOpen === 'override-confirmation');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const offers = useAppStore(s => s.offers);
  const venues = useAppStore(s => s.venues);
  const updateOfferPrice = useAppStore(s => s.updateOfferPrice);

  const productId = data?.productId as string | undefined;
  const newPrice = data?.newPrice as number | undefined;

  const overriddenOffers = useMemo(() => {
    if (!productId) return [];
    return offers
      .filter(o => o.productId === productId && o.priceOverridden)
      .map(o => {
        const venue = venues.find(v => v.id === o.venueId);
        return { offer: o, venue };
      });
  }, [productId, offers, venues]);

  const [selectedForOverwrite, setSelectedForOverwrite] = useState<Set<string>>(new Set());

  const toggle = (offerId: string) => {
    setSelectedForOverwrite(prev => {
      const next = new Set(prev);
      if (next.has(offerId)) next.delete(offerId);
      else next.add(offerId);
      return next;
    });
  };

  const handleConfirm = () => {
    if (newPrice !== undefined) {
      selectedForOverwrite.forEach(offerId => {
        updateOfferPrice(offerId, newPrice);
      });
    }
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Override Confirmation
          </DialogTitle>
          <DialogDescription>
            {overriddenOffers.length} venue{overriddenOffers.length !== 1 ? 's have' : ' has'} overridden the price for this item. Select which venues should be updated to the new price.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {overriddenOffers.map(({ offer, venue }) => (
            <button
              key={offer.id}
              onClick={() => toggle(offer.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-colors',
                selectedForOverwrite.has(offer.id)
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-medium text-gray-900">{venue?.name ?? 'Unknown'}</span>
                <Badge variant="outline" className="text-xs">
                  Current: {offer.currency}{offer.price.toFixed(2)}
                </Badge>
              </div>
              {selectedForOverwrite.has(offer.id) && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
                  Will update
                </Badge>
              )}
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Skip (keep overrides)
          </Button>
          <Button onClick={handleConfirm} disabled={selectedForOverwrite.size === 0}>
            Update {selectedForOverwrite.size} venue{selectedForOverwrite.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
