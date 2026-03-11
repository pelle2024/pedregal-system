'use client';

import { useAppStore } from '@/store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layers, Trash2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export function BundleEditorSlideOver() {
  const open = useAppStore(s => s.slideOverOpen && s.slideOverContent === 'bundle-editor');
  const data = useAppStore(s => s.slideOverData);
  const closeSlideOver = useAppStore(s => s.closeSlideOver);
  const bundles = useAppStore(s => s.bundles);
  const offers = useAppStore(s => s.offers);
  const products = useAppStore(s => s.products);
  const venueId = useAppStore(s => s.context.currentVenueId);
  const business = useAppStore(s => s.getCurrentBusiness());
  const addBundle = useAppStore(s => s.addBundle);
  const updateBundle = useAppStore(s => s.updateBundle);

  const mode = data?.mode as 'create' | 'edit' | undefined;
  const bundleId = data?.bundleId as string | undefined;
  const existingBundle = bundles.find(b => b.id === bundleId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('active');
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>([]);

  useEffect(() => {
    if (mode === 'edit' && existingBundle) {
      setName(existingBundle.name);
      setDescription(existingBundle.description);
      setPrice(existingBundle.price.toFixed(2));
      setStatus(existingBundle.status);
      setSelectedOfferIds(existingBundle.offerIds);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setStatus('active');
      setSelectedOfferIds([]);
    }
  }, [mode, existingBundle, open]);

  const venueOffers = useMemo(() => {
    return offers.filter(o => o.venueId === venueId || !venueId);
  }, [offers, venueId]);

  const availableOffers = venueOffers.filter(o => !selectedOfferIds.includes(o.id));

  const addOffer = (offerId: string) => {
    setSelectedOfferIds(prev => [...prev, offerId]);
  };

  const removeOffer = (offerId: string) => {
    setSelectedOfferIds(prev => prev.filter(id => id !== offerId));
  };

  const handleSave = () => {
    if (!name.trim() || !business) return;

    if (mode === 'create') {
      addBundle({
        id: `bun-${Date.now()}`,
        businessId: business.id,
        venueId: venueId,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price) || 0,
        status: status as 'active' | 'inactive' | 'paused' | 'out_of_stock',
        offerIds: selectedOfferIds,
      });
    } else if (existingBundle) {
      updateBundle(existingBundle.id, {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price) || 0,
        status: status as 'active' | 'inactive' | 'paused' | 'out_of_stock',
        offerIds: selectedOfferIds,
      });
    }
    closeSlideOver();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && closeSlideOver()}>
      <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            {mode === 'create' ? 'Create Bundle' : 'Edit Bundle'}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Bundle Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Lunch Combo" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the bundle" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Bundle Price</label>
              <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" type="number" step="0.01" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Items in Bundle</label>
            {selectedOfferIds.length > 0 ? (
              <div className="space-y-1.5">
                {selectedOfferIds.map(offerId => {
                  const offer = offers.find(o => o.id === offerId);
                  const product = offer ? products.find(p => p.id === offer.productId) : null;
                  if (!product || !offer) return null;
                  return (
                    <div key={offerId} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{product.title}</span>
                        <span className="ml-2 text-xs text-gray-500">{offer.currency}{offer.price.toFixed(2)}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-600" onClick={() => removeOffer(offerId)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No items added yet</p>
            )}

            {availableOffers.length > 0 && (
              <div className="mt-3">
                <label className="mb-1.5 block text-xs text-gray-500">Add an item</label>
                <Select onValueChange={addOffer}>
                  <SelectTrigger><SelectValue placeholder="Select an item" /></SelectTrigger>
                  <SelectContent>
                    {availableOffers.map(o => {
                      const p = products.find(pr => pr.id === o.productId);
                      return (
                        <SelectItem key={o.id} value={o.id}>
                          {p?.title ?? 'Unknown'} — {o.currency}{o.price.toFixed(2)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={!name.trim()}>
              {mode === 'create' ? 'Create Bundle' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={closeSlideOver}>Cancel</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
