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
import { Search, Plus, MoreHorizontal, Upload, Globe } from 'lucide-react';
import { useState, useMemo } from 'react';

export function CatalogTab() {
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const venues = useAppStore(s => s.venues);
  const categories = useAppStore(s => s.categories);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openModal = useAppStore(s => s.openModal);
  const openSlideOver = useAppStore(s => s.openSlideOver);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [assignmentFilter, setAssignmentFilter] = useState<string>('all');

  const bizCategories = categories.filter(c => c.businessId === business?.id);
  const totalVenues = venues.length;

  const catalogItems = useMemo(() => {
    const bizProducts = products.filter(p => p.businessId === business?.id);

    return bizProducts.map(product => {
      const productOffers = offers.filter(o => o.productId === product.id);
      const assignedVenueIds = new Set(productOffers.map(o => o.venueId));
      const category = product.categoryId
        ? categories.find(c => c.id === product.categoryId) ?? null
        : null;

      return {
        product,
        category,
        assignedCount: assignedVenueIds.size,
        isUnassigned: assignedVenueIds.size === 0,
      };
    }).filter(item => {
      if (search && !item.product.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== 'all' && item.product.categoryId !== categoryFilter) return false;
      if (assignmentFilter === 'assigned' && item.isUnassigned) return false;
      if (assignmentFilter === 'unassigned' && !item.isUnassigned) return false;
      return true;
    }).sort((a, b) => {
      if (a.isUnassigned && !b.isUnassigned) return -1;
      if (!a.isUnassigned && b.isUnassigned) return 1;
      return a.product.title.localeCompare(b.product.title);
    });
  }, [products, offers, categories, business, search, categoryFilter, assignmentFilter]);

  const unassignedCount = useMemo(() => {
    const bizProducts = products.filter(p => p.businessId === business?.id);
    return bizProducts.filter(p => !offers.some(o => o.productId === p.id)).length;
  }, [products, offers, business]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Product Catalog</h2>
          <p className="mt-1 text-sm text-gray-500">
            {catalogItems.length} product{catalogItems.length !== 1 ? 's' : ''}
            {unassignedCount > 0 && (
              <span className="ml-1 text-amber-600">
                · {unassignedCount} not assigned to any store
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-gray-500" disabled>
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-gray-500" disabled>
            <Globe className="h-3.5 w-3.5" />
            Global Catalog
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => openModal('create-catalog-product')}>
            <Plus className="h-3.5 w-3.5" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search catalog..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {bizCategories.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All products</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Not assigned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Stores</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogItems.map(({ product, category, assignedCount, isUnassigned }) => (
              <TableRow
                key={product.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  const offer = offers.find(o => o.productId === product.id);
                  if (offer) {
                    openSlideOver('item-editor', { productId: product.id, offerId: offer.id });
                  }
                }}
              >
                <TableCell>
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                    IMG
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{product.title}</span>
                    {isUnassigned && (
                      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 text-xs border border-amber-200">
                        Not assigned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate max-w-md">{product.description}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {category?.name ?? <span className="text-gray-400">—</span>}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`text-sm font-medium ${isUnassigned ? 'text-amber-600' : 'text-gray-900'}`}>
                    {assignedCount}/{totalVenues}
                  </span>
                </TableCell>
                <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openModal('add-to-venues', { productId: product.id })}>
                        Assign to stores
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const offer = offers.find(o => o.productId === product.id);
                        if (offer) {
                          openSlideOver('item-editor', { productId: product.id, offerId: offer.id });
                        }
                      }}>
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove from catalog</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {catalogItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-sm text-gray-400">
                  {search || categoryFilter !== 'all' || assignmentFilter !== 'all'
                    ? 'No products match your filters'
                    : 'No products in the catalog yet'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
