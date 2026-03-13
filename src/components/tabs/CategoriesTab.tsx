'use client';

import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, GripVertical, MoreHorizontal } from 'lucide-react';

export function CategoriesTab() {
  const categories = useAppStore(s => s.categories);
  const products = useAppStore(s => s.products);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openModal = useAppStore(s => s.openModal);

  const bizCategories = categories
    .filter(c => c.businessId === business?.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <p className="mt-1 text-sm text-gray-500">
            {bizCategories.length} categor{bizCategories.length !== 1 ? 'ies' : 'y'} · Organize your items
          </p>
        </div>
        <Button
          className="gap-1.5"
          onClick={() => openModal('create-category')}
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        {bizCategories.map((cat, i) => {
          const itemCount = products.filter(p => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-gray-300 cursor-grab" />
                <div>
                  <span className="font-medium text-gray-900">{cat.name}</span>
                  <span className="ml-2 text-xs text-gray-400">{itemCount} items</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openModal('rename-category', { categoryId: cat.id })}>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}

        {bizCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-gray-500">No categories yet</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openModal('create-category')}
            >
              <Plus className="h-4 w-4" />
              Add a category
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
