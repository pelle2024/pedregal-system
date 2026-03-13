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

export function CreateCollectionModal() {
  const open = useAppStore(s => s.modalOpen === 'create-collection');
  const closeModal = useAppStore(s => s.closeModal);
  const addCollection = useAppStore(s => s.addCollection);
  const setActiveCollectionId = useAppStore(s => s.setActiveCollectionId);
  const business = useAppStore(s => s.getCurrentBusiness());

  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim() || !business) return;
    const id = `col-${Date.now()}`;
    addCollection({
      id,
      businessId: business.id,
      name: name.trim(),
      status: 'active',
      productIds: [],
      sharedToVenueIds: [],
    });
    setActiveCollectionId(id);
    setName('');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Collection Name</label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Essentials, Summer Range"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>Create Collection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
