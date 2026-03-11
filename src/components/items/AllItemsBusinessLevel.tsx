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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, ChevronDown, ChevronRight, MoreHorizontal, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Product, Offer, Venue, Category } from '@/store/types';
import { cn } from '@/lib/utils';

interface ProductAggregate {
  product: Product;
  category: Category | null;
  venueOffers: { venue: Venue; offer: Offer }[];
  priceRange: string;
  statusSummary: string;
  venueCount: number;
}

export function AllItemsBusinessLevel() {
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const venues = useAppStore(s => s.venues);
  const categories = useAppStore(s => s.categories);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const openModal = useAppStore(s => s.openModal);
  const updateOfferStatus = useAppStore(s => s.updateOfferStatus);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (productId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const aggregates = useMemo((): ProductAggregate[] => {
    const bizProducts = products.filter(p => p.businessId === business?.id);

    return bizProducts.map(product => {
      const productOffers = offers.filter(o => o.productId === product.id);
      const venueOffers = productOffers
        .map(o => {
          const venue = venues.find(v => v.id === o.venueId);
          return venue ? { venue, offer: o } : null;
        })
        .filter((vo): vo is { venue: Venue; offer: Offer } => vo !== null);

      const prices = venueOffers.map(vo => vo.offer.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const currency = venueOffers[0]?.offer.currency ?? '$';
      const priceRange = prices.length === 0
        ? '—'
        : minPrice === maxPrice
          ? `${currency}${minPrice.toFixed(2)}`
          : `${currency}${minPrice.toFixed(2)}–${maxPrice.toFixed(2)}`;

      const statuses = new Set(venueOffers.map(vo => vo.offer.status));
      let statusSummary = '';
      if (statuses.size === 1) {
        statusSummary = [...statuses][0];
      } else {
        const parts: string[] = [];
        const active = venueOffers.filter(vo => vo.offer.status === 'active').length;
        const paused = venueOffers.filter(vo => vo.offer.status === 'paused').length;
        const inactive = venueOffers.filter(vo => vo.offer.status === 'inactive').length;
        const oos = venueOffers.filter(vo => vo.offer.status === 'out_of_stock').length;
        if (active) parts.push(`${active} active`);
        if (paused) parts.push(`${paused} paused`);
        if (inactive) parts.push(`${inactive} inactive`);
        if (oos) parts.push(`${oos} OOS`);
        statusSummary = parts.join(', ');
      }

      const category = product.categoryId ? categories.find(c => c.id === product.categoryId) ?? null : null;

      return {
        product,
        category,
        venueOffers,
        priceRange,
        statusSummary,
        venueCount: venueOffers.length,
      };
    }).filter(agg => {
      if (search && !agg.product.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all') {
        const hasStatus = agg.venueOffers.some(vo => vo.offer.status === statusFilter);
        if (!hasStatus) return false;
      }
      return true;
    });
  }, [products, offers, venues, categories, business, search, statusFilter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">All Items</h2>
          <p className="mt-1 text-sm text-gray-500">
            {aggregates.length} product{aggregates.length !== 1 ? 's' : ''} across {venues.length} venue{venues.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <Filter className="mr-2 h-3.5 w-3.5 text-gray-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Venues</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aggregates.map(agg => {
              const isExpanded = expandedIds.has(agg.product.id);
              return (
                <>
                  {/* Aggregate row */}
                  <TableRow
                    key={agg.product.id}
                    className={cn('cursor-pointer hover:bg-gray-50', isExpanded && 'bg-gray-50')}
                    onClick={() => toggleExpand(agg.product.id)}
                  >
                    <TableCell>
                      {agg.venueCount > 0 ? (
                        isExpanded
                          ? <ChevronDown className="h-4 w-4 text-gray-400" />
                          : <ChevronRight className="h-4 w-4 text-gray-400" />
                      ) : <div className="w-4" />}
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{agg.product.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{agg.product.description}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{agg.category?.name ?? '—'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">{agg.priceRange}</span>
                    </TableCell>
                    <TableCell>
                      <AggregateStatusBadge summary={agg.statusSummary} />
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {agg.venueCount}/{venues.length}
                      </span>
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openSlideOver('item-editor', { productId: agg.product.id, offerId: agg.venueOffers[0]?.offer.id })}>
                            Edit product
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openModal('add-to-venues', { productId: agg.product.id })}>
                            Add to venues
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              agg.venueOffers.forEach(vo => updateOfferStatus(vo.offer.id, 'active'));
                            }}
                          >
                            Activate at all venues
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              agg.venueOffers.forEach(vo => updateOfferStatus(vo.offer.id, 'inactive'));
                            }}
                          >
                            Deactivate at all venues
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {/* Venue sub-rows */}
                  {isExpanded && agg.venueOffers.map(({ venue, offer }) => (
                    <TableRow
                      key={`${agg.product.id}-${venue.id}`}
                      className="cursor-pointer bg-gray-50/50 hover:bg-gray-100/50"
                      onClick={() => openSlideOver('item-editor', { productId: agg.product.id, offerId: offer.id })}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 pl-2">
                          <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{venue.name}</span>
                        </div>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-900">
                          {offer.currency}{offer.price.toFixed(2)}
                        </span>
                        {offer.priceOverridden && (
                          <span className="ml-1 text-xs text-blue-600">overridden</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <VenueStatusBadge status={offer.status} pausedUntil={offer.pausedUntil} />
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openSlideOver('item-editor', { productId: agg.product.id, offerId: offer.id })}>Edit</DropdownMenuItem>
                            {offer.status === 'active' && <DropdownMenuItem onClick={() => openModal('pause-item', { offerId: offer.id })}>Pause</DropdownMenuItem>}
                            {offer.status === 'paused' && <DropdownMenuItem onClick={() => updateOfferStatus(offer.id, 'active')}>Resume</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              );
            })}
          </TableBody>
        </Table>
        {aggregates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-gray-500">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AggregateStatusBadge({ summary }: { summary: string }) {
  if (summary === 'active') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Active</Badge>;
  if (summary === 'paused') return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Paused</Badge>;
  if (summary === 'inactive') return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Inactive</Badge>;
  if (summary === 'out_of_stock') return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Out of stock</Badge>;
  return <span className="text-xs text-gray-500">{summary}</span>;
}

function VenueStatusBadge({ status, pausedUntil }: { status: string; pausedUntil: string | null }) {
  switch (status) {
    case 'active': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Active</Badge>;
    case 'paused': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Paused{pausedUntil ? ` · ${pausedUntil}` : ''}</Badge>;
    case 'inactive': return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Inactive</Badge>;
    case 'out_of_stock': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Out of stock</Badge>;
    default: return null;
  }
}
