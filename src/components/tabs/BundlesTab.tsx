'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Package } from 'lucide-react';
import { ItemStatus } from '@/store/types';

export function BundlesTab() {
  const bundles = useAppStore(s => s.bundles);
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const openModal = useAppStore(s => s.openModal);
  const updateBundle = useAppStore(s => s.updateBundle);

  const bizBundles = bundles.filter(b => b.businessId === business?.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Bundles</h2>
          <p className="mt-1 text-sm text-gray-500">
            {bizBundles.length} bundle{bizBundles.length !== 1 ? 's' : ''} · Combine items at a special price
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => openSlideOver('bundle-editor', { mode: 'create' })}>
          <Plus className="h-4 w-4" />
          Create Bundle
        </Button>
      </div>

      <div className="space-y-3">
        {bizBundles.map(bundle => {
          const bundleOffers = offers.filter(o => bundle.offerIds.includes(o.id));
          const bundleProducts = bundleOffers.map(o => products.find(p => p.id === o.productId)).filter(Boolean);

          return (
            <div
              key={bundle.id}
              className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-400 cursor-pointer"
              onClick={() => openSlideOver('bundle-editor', { mode: 'edit', bundleId: bundle.id })}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{bundle.name}</h3>
                    <StatusBadge status={bundle.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{bundle.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">${bundle.price.toFixed(2)}</span>
                    <span className="text-gray-400">·</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Package className="h-3.5 w-3.5" />
                      {bundleProducts.length} items
                    </span>
                  </div>
                  {bundleProducts.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {bundleProducts.map(p => p && (
                        <Badge key={p.id} variant="outline" className="text-xs">
                          {p.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div onClick={e => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSlideOver('bundle-editor', { mode: 'edit', bundleId: bundle.id })}>
                        Edit
                      </DropdownMenuItem>
                      {bundle.status === 'active' && (
                        <DropdownMenuItem onClick={() => updateBundle(bundle.id, { status: 'inactive' })}>
                          Deactivate
                        </DropdownMenuItem>
                      )}
                      {bundle.status === 'inactive' && (
                        <DropdownMenuItem onClick={() => updateBundle(bundle.id, { status: 'active' })}>
                          Activate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}

        {bizBundles.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
            <p className="text-sm text-gray-500">No bundles yet</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openSlideOver('bundle-editor', { mode: 'create' })}
            >
              <Plus className="h-4 w-4" />
              Create your first bundle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Inactive</Badge>;
    default:
      return null;
  }
}
