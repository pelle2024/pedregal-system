'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Plus, Share2, MoreHorizontal, MapPin, Trash2 } from 'lucide-react';

interface CollectionDetailProps {
  collectionId: string;
}

export function CollectionDetail({ collectionId }: CollectionDetailProps) {
  const collection = useAppStore(s => s.collections.find(c => c.id === collectionId));
  const products = useAppStore(s => s.products);
  const venues = useAppStore(s => s.venues);
  const setActiveCollectionId = useAppStore(s => s.setActiveCollectionId);
  const openModal = useAppStore(s => s.openModal);
  const updateCollection = useAppStore(s => s.updateCollection);

  if (!collection) return null;

  const collectionProducts = products.filter(p => collection.productIds.includes(p.id));
  const sharedVenues = venues.filter(v => collection.sharedToVenueIds.includes(v.id));

  const removeProduct = (productId: string) => {
    updateCollection(collection.id, {
      productIds: collection.productIds.filter(id => id !== productId),
    });
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => setActiveCollectionId(null)}
          className="mb-3 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All collections
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{collection.name}</h2>
              <StatusBadge status={collection.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {collectionProducts.length} products · Shared to {sharedVenues.length} venue{sharedVenues.length !== 1 ? 's' : ''}
            </p>
            {sharedVenues.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {sharedVenues.map(v => (
                  <Badge key={v.id} variant="outline" className="text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {v.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => openModal('add-products-to-collection', { collectionId: collection.id })}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Products
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => openModal('share-collection-to-venues', { collectionId: collection.id })}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share to Venues
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collectionProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">{product.title}</div>
                  <div className="text-xs text-gray-500">{product.description}</div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{product.categoryId ?? '—'}</span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {collectionProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-gray-500">No products in this collection</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openModal('add-products-to-collection', { collectionId: collection.id })}
            >
              <Plus className="h-4 w-4" />
              Add products
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
