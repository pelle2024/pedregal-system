'use client';

import { useAppStore } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AddItemToCategoryModal() {
  const open = useAppStore(s => s.modalOpen === 'add-item-to-category');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const addProduct = useAppStore(s => s.addProduct);
  const addOffer = useAppStore(s => s.addOffer);
  const addMenuItem = useAppStore(s => s.addMenuItem);
  const business = useAppStore(s => s.getCurrentBusiness());
  const venueId = useAppStore(s => s.context.currentVenueId);
  const menuItems = useAppStore(s => s.menuItems);

  const categoryId = data?.categoryId as string | undefined;
  const menuId = data?.menuId as string | undefined;

  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateNew = () => {
    if (!name.trim() || !categoryId || !business || !venueId || !menuId) return;

    const productId = `p-${Date.now()}`;
    const offerId = `o-${Date.now()}`;
    const menuItemId = `mi-${Date.now()}`;
    const existingCount = menuItems.filter(mi => mi.menuCategoryId === categoryId).length;

    addProduct({
      id: productId,
      businessId: business.id,
      title: name.trim(),
      description: description.trim(),
      image: '/placeholder.svg',
      categoryId: null,
      modifierGroupIds: [],
    });

    addOffer({
      id: offerId,
      venueId,
      productId,
      price: parseFloat(price) || 0,
      currency: '€',
      status: 'active',
      pausedUntil: null,
      availabilitySchedule: null,
      priceOverridden: false,
      source: 'menu',
      sourceId: menuId,
    });

    addMenuItem({
      id: menuItemId,
      menuCategoryId: categoryId,
      offerId,
      productId,
      sortOrder: existingCount,
    });

    setName('');
    setPrice('');
    setDescription('');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Item Name</label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Caesar Salad"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short description"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Price</label>
            <Input
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="0.00"
              type="number"
              step="0.01"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreateNew} disabled={!name.trim()}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
