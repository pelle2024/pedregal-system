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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export function CreateMenuModal() {
  const open = useAppStore(s => s.modalOpen === 'create-menu');
  const closeModal = useAppStore(s => s.closeModal);
  const addMenu = useAppStore(s => s.addMenu);
  const setActiveMenuId = useAppStore(s => s.setActiveMenuId);
  const context = useAppStore(s => s.context);
  const business = useAppStore(s => s.getCurrentBusiness());

  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [status, setStatus] = useState('draft');

  const handleCreate = () => {
    if (!name.trim() || !business) return;
    const id = `menu-${Date.now()}`;
    addMenu({
      id,
      venueId: context.level === 'venue' ? context.currentVenueId : null,
      businessId: business.id,
      name: name.trim(),
      hours: hours.trim() || 'All day',
      status: status as 'active' | 'inactive' | 'draft',
      isShared: false,
      sharedToVenueIds: [],
      categoryIds: [],
    });
    setActiveMenuId(id);
    setName('');
    setHours('');
    setStatus('draft');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Menu Name</label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Lunch Menu, Weekend Specials"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Hours</label>
            <Input
              value={hours}
              onChange={e => setHours(e.target.value)}
              placeholder="e.g., Mon–Fri 11:00–15:00"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>Create Menu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
