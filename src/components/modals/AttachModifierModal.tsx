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
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function AttachModifierModal() {
  const open = useAppStore(s => s.modalOpen === 'attach-modifier');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const modifierGroups = useAppStore(s => s.modifierGroups);
  const products = useAppStore(s => s.products);
  const updateProduct = useAppStore(s => s.updateProduct);
  const business = useAppStore(s => s.getCurrentBusiness());

  const productId = data?.productId as string | undefined;
  const product = products.find(p => p.id === productId);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (product) {
      setSelectedIds(new Set(product.modifierGroupIds));
    }
  }, [product, open]);

  const groups = modifierGroups.filter(g => g.businessId === business?.id);

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    if (product) {
      updateProduct(product.id, { modifierGroupIds: Array.from(selectedIds) });
    }
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attach Modifier Groups</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5 py-2">
          {groups.length > 0 ? groups.map(g => (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-colors',
                selectedIds.has(g.id)
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{g.name}</span>
                {g.required && <Badge variant="outline" className="text-xs">Required</Badge>}
              </div>
              {selectedIds.has(g.id) && <Check className="h-4 w-4 text-gray-900" />}
            </button>
          )) : (
            <p className="py-4 text-center text-sm text-gray-500">No modifier groups available. Create one first.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
