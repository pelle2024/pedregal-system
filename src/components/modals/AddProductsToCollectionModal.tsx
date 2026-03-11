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
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Check, Search } from 'lucide-react';

export function AddProductsToCollectionModal() {
  const open = useAppStore(s => s.modalOpen === 'add-products-to-collection');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const products = useAppStore(s => s.products);
  const collections = useAppStore(s => s.collections);
  const updateCollection = useAppStore(s => s.updateCollection);
  const business = useAppStore(s => s.getCurrentBusiness());

  const collectionId = data?.collectionId as string | undefined;
  const collection = collections.find(c => c.id === collectionId);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const bizProducts = useMemo(() => {
    return products.filter(p => {
      if (p.businessId !== business?.id) return false;
      if (collection?.productIds.includes(p.id)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, business, collection, search]);

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    if (collection) {
      updateCollection(collection.id, {
        productIds: [...collection.productIds, ...Array.from(selectedIds)],
      });
    }
    setSelectedIds(new Set());
    setSearch('');
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Products to "{collection?.name}"</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="max-h-64 space-y-1.5 overflow-y-auto">
            {bizProducts.map(p => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors',
                  selectedIds.has(p.id)
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400',
                )}
              >
                <span className="font-medium text-gray-900">{p.title}</span>
                {selectedIds.has(p.id) && <Check className="h-4 w-4 text-gray-900" />}
              </button>
            ))}
            {bizProducts.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">No products available to add</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSave} disabled={selectedIds.size === 0}>
            Add {selectedIds.size} product{selectedIds.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
