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
import { Pause, X, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ItemStatus } from '@/store/types';

export function ItemEditorSlideOver() {
  const open = useAppStore(s => s.slideOverOpen && s.slideOverContent === 'item-editor');
  const data = useAppStore(s => s.slideOverData);
  const closeSlideOver = useAppStore(s => s.closeSlideOver);
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const modifierGroups = useAppStore(s => s.modifierGroups);
  const modifierOptions = useAppStore(s => s.modifierOptions);
  const updateOfferStatus = useAppStore(s => s.updateOfferStatus);
  const updateOfferPrice = useAppStore(s => s.updateOfferPrice);
  const updateProduct = useAppStore(s => s.updateProduct);
  const openModal = useAppStore(s => s.openModal);

  const productId = data?.productId as string | undefined;
  const offerId = data?.offerId as string | undefined;

  const product = products.find(p => p.id === productId);
  const offer = offers.find(o => o.id === offerId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
    }
    if (offer) {
      setPrice(offer.price.toFixed(2));
    }
  }, [product, offer]);

  if (!product || !offer) return null;

  const attachedGroups = modifierGroups.filter(g => product.modifierGroupIds.includes(g.id));

  const handleSave = () => {
    updateProduct(product.id, { title, description });
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice) && newPrice !== offer.price) {
      updateOfferPrice(offer.id, newPrice);
    }
    closeSlideOver();
  };

  const handleStatusChange = (status: string) => {
    if (status === 'paused') {
      openModal('pause-item', { offerId: offer.id });
    } else {
      updateOfferStatus(offer.id, status as ItemStatus);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && closeSlideOver()}>
      <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Edit Item
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Image placeholder */}
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
            Product image
          </div>

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>

          <Separator />

          {/* Price */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{offer.currency}</span>
              <Input
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="pl-7"
                type="number"
                step="0.01"
              />
            </div>
            {offer.priceOverridden && (
              <p className="mt-1 text-xs text-blue-600">This price has been overridden at the venue level</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
            <div className="flex items-center gap-2">
              <Select value={offer.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              {offer.status === 'paused' && offer.pausedUntil && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  Until {offer.pausedUntil}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Modifier groups */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Modifier Groups</label>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => openModal('attach-modifier', { productId: product.id })}
              >
                + Attach
              </Button>
            </div>
            {attachedGroups.length > 0 ? (
              <div className="space-y-2">
                {attachedGroups.map(g => {
                  const options = modifierOptions.filter(o => g.optionIds.includes(o.id));
                  return (
                    <div key={g.id} className="rounded-md border border-gray-200 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{g.name}</span>
                          {g.required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">
                          {g.minSelections}–{g.maxSelections} selections
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {options.map(o => (
                          <span
                            key={o.id}
                            className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                          >
                            {o.name}
                            {o.priceDelta !== 0 && (
                              <span className="text-gray-500">
                                {o.priceDelta > 0 ? '+' : ''}{o.priceDelta.toFixed(2)}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No modifier groups attached</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={closeSlideOver}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
