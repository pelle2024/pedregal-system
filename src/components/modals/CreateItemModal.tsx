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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export function CreateItemModal() {
  const open = useAppStore(s => s.modalOpen === 'create-item');
  const closeModal = useAppStore(s => s.closeModal);
  const addProduct = useAppStore(s => s.addProduct);
  const addOffer = useAppStore(s => s.addOffer);
  const business = useAppStore(s => s.getCurrentBusiness());
  const venueId = useAppStore(s => s.context.currentVenueId);
  const categories = useAppStore(s => s.categories);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<string>('none');

  const bizCategories = categories.filter(c => c.businessId === business?.id);

  const handleCreate = () => {
    if (!name.trim() || !business || !venueId) return;

    const productId = `p-${Date.now()}`;
    const offerId = `o-${Date.now()}`;

    addProduct({
      id: productId,
      businessId: business.id,
      title: name.trim(),
      description: description.trim(),
      image: '/placeholder.svg',
      categoryId: categoryId === 'none' ? null : categoryId,
      modifierGroupIds: [],
    });

    addOffer({
      id: offerId,
      venueId,
      productId,
      price: parseFloat(price) || 0,
      currency: '$',
      status: 'active',
      pausedUntil: null,
      availabilitySchedule: null,
      priceOverridden: false,
      source: 'direct',
      sourceId: null,
    });

    setName('');
    setDescription('');
    setPrice('');
    setCategoryId('none');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Item name" autoFocus />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" rows={2} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Price</label>
            <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" type="number" step="0.01" />
          </div>
          {bizCategories.length > 0 && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {bizCategories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
