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

export function CreateMenuCategoryModal() {
  const open = useAppStore(s => s.modalOpen === 'create-menu-category');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const addMenuCategory = useAppStore(s => s.addMenuCategory);
  const menuCategories = useAppStore(s => s.menuCategories);

  const menuId = data?.menuId as string | undefined;
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim() || !menuId) return;
    const existingCount = menuCategories.filter(c => c.menuId === menuId).length;
    addMenuCategory({
      id: `mc-${Date.now()}`,
      menuId,
      name: name.trim(),
      sortOrder: existingCount,
      menuItemIds: [],
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
            placeholder="e.g., Starters, Mains, Desserts"
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
