'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Search, Plus, MoreHorizontal, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import { ItemStatus } from '@/store/types';
import { InlinePriceCell } from './InlinePriceCell';
import { InlineStatusCell } from './InlineStatusCell';

export function AllItemsVenueLevel() {
  const venueId = useAppStore(s => s.context.currentVenueId);
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const categories = useAppStore(s => s.categories);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const openModal = useAppStore(s => s.openModal);
  const updateOfferStatus = useAppStore(s => s.updateOfferStatus);
  const updateOfferPrice = useAppStore(s => s.updateOfferPrice);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const venueOffers = useMemo(() => {
    return offers.filter(o => o.venueId === venueId);
  }, [offers, venueId]);

  const rows = useMemo(() => {
    return venueOffers.map(offer => {
      const product = products.find(p => p.id === offer.productId);
      const category = product?.categoryId ? categories.find(c => c.id === product.categoryId) : null;
      return { offer, product, category };
    }).filter(row => {
      if (!row.product) return false;
      if (search && !row.product.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && row.offer.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && row.product.categoryId !== categoryFilter) return false;
      return true;
    });
  }, [venueOffers, products, categories, search, statusFilter, categoryFilter]);

  const bizCategories = categories.filter(c => c.businessId === business?.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">All Items</h2>
          <p className="mt-1 text-sm text-gray-500">
            {rows.length} item{rows.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button className="gap-1.5" onClick={() => openModal('create-item')}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <Filter className="mr-2 h-3.5 w-3.5 text-gray-400" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        {bizCategories.length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {bizCategories.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ offer, product, category }) => {
              if (!product) return null;
              return (
                <TableRow
                  key={offer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openSlideOver('item-editor', { productId: product.id, offerId: offer.id })}
                >
                  <TableCell>
                    <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{product.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{category?.name ?? '—'}</span>
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <InlinePriceCell
                      price={offer.price}
                      currency={offer.currency}
                      overridden={offer.priceOverridden}
                      onSave={(newPrice) => updateOfferPrice(offer.id, newPrice)}
                    />
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <InlineStatusCell
                      status={offer.status}
                      pausedUntil={offer.pausedUntil}
                      onChange={(status) => updateOfferStatus(offer.id, status)}
                      onPause={() => openModal('pause-item', { offerId: offer.id })}
                    />
                  </TableCell>
                  <TableCell>
                    <SourceBadge source={offer.source} />
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openSlideOver('item-editor', { productId: product.id, offerId: offer.id })}>Edit</DropdownMenuItem>
                        {offer.status === 'active' && <DropdownMenuItem onClick={() => openModal('pause-item', { offerId: offer.id })}>Pause</DropdownMenuItem>}
                        {offer.status === 'paused' && <DropdownMenuItem onClick={() => updateOfferStatus(offer.id, 'active')}>Resume</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-gray-500">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status, pausedUntil }: { status: string; pausedUntil: string | null }) {
  switch (status) {
    case 'active': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Active</Badge>;
    case 'paused': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Paused{pausedUntil ? ` · ${pausedUntil}` : ''}</Badge>;
    case 'inactive': return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Inactive</Badge>;
    case 'out_of_stock': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Out of stock</Badge>;
    default: return null;
  }
}

function SourceBadge({ source }: { source: string }) {
  switch (source) {
    case 'menu': return <Badge variant="outline" className="text-xs">Menu</Badge>;
    case 'collection': return <Badge variant="outline" className="text-xs">Collection</Badge>;
    case 'direct': return <Badge variant="outline" className="text-xs text-gray-400">Direct</Badge>;
    default: return null;
  }
}
