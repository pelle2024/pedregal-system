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
import { useState } from 'react';

export function CreateCategoryModal() {
  const open = useAppStore(s => s.modalOpen === 'create-category');
  const closeModal = useAppStore(s => s.closeModal);
  const addCategory = useAppStore(s => s.addCategory);
  const categories = useAppStore(s => s.categories);
  const business = useAppStore(s => s.getCurrentBusiness());

  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim() || !business) return;
    const existingCount = categories.filter(c => c.businessId === business.id).length;
    addCategory({
      id: `cat-${Date.now()}`,
      businessId: business.id,
      name: name.trim(),
      sortOrder: existingCount,
    });
    setName('');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Category Name</label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Bouquets, Electronics"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
