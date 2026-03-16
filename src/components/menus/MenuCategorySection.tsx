'use client';

import { useAppStore } from '@/store';
import { MenuCategory, MenuItem, Product, Offer, ItemStatus } from '@/store/types';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, MoreHorizontal } from 'lucide-react';
import { InlinePriceCell } from '../items/InlinePriceCell';
import { InlineStatusCell } from '../items/InlineStatusCell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

interface MenuCategorySectionProps {
  category: MenuCategory;
  isSharedAtVenueLevel: boolean;
  statusFilter?: ItemStatus | 'all';
}

export function MenuCategorySection({ category, isSharedAtVenueLevel, statusFilter = 'all' }: MenuCategorySectionProps) {
  const menuItems = useAppStore(s => s.menuItems);
  const products = useAppStore(s => s.products);
  const offers = useAppStore(s => s.offers);
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const openModal = useAppStore(s => s.openModal);
  const reorderMenuItems = useAppStore(s => s.reorderMenuItems);
  const updateOfferPrice = useAppStore(s => s.updateOfferPrice);
  const updateOfferStatus = useAppStore(s => s.updateOfferStatus);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const items = menuItems
    .filter(mi => category.menuItemIds.includes(mi.id))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const itemSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleItemDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    const newOrder = arrayMove(items.map(i => i.id), oldIndex, newIndex);
    reorderMenuItems(category.id, newOrder);
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-gray-300 hover:text-gray-500" />
          </button>
          <h3 className="font-medium text-gray-900">{category.name}</h3>
          <span className="text-xs text-gray-400">{items.length} items</span>
        </div>
        <div className="flex items-center gap-1">
          {!isSharedAtVenueLevel && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={() => openModal('add-item-to-category', { categoryId: category.id, menuId: category.menuId })}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Item
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename Category</DropdownMenuItem>
              {!isSharedAtVenueLevel && (
                <DropdownMenuItem className="text-red-600">Delete Category</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <DndContext sensors={itemSensors} collisionDetection={closestCenter} onDragEnd={handleItemDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="divide-y divide-gray-50">
            {items.map(mi => {
              const product = products.find(p => p.id === mi.productId);
              const offer = offers.find(o => o.id === mi.offerId);
              if (!product || !offer) return null;
              if (statusFilter !== 'all' && offer.status !== statusFilter) return null;

              return (
                <SortableMenuItemRow
                  key={mi.id}
                  menuItem={mi}
                  product={product}
                  offer={offer}
                  onOpen={() => openSlideOver('item-editor', {
                    productId: product.id,
                    offerId: offer.id,
                    menuItemId: mi.id,
                  })}
                  onPriceChange={(p) => updateOfferPrice(offer.id, p)}
                  onStatusChange={(s) => updateOfferStatus(offer.id, s)}
                  onPause={() => openModal('pause-item', { offerId: offer.id })}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <div className="p-6 text-center text-sm text-gray-400">
          No items in this category
        </div>
      )}
    </div>
  );
}

function SortableMenuItemRow({
  menuItem,
  product,
  offer,
  onOpen,
  onPriceChange,
  onStatusChange,
  onPause,
}: {
  menuItem: MenuItem;
  product: Product;
  offer: Offer;
  onOpen: () => void;
  onPriceChange: (price: number) => void;
  onStatusChange: (status: ItemStatus) => void;
  onPause: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: menuItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-3 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 cursor-pointer"
      onClick={onOpen}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
        onClick={e => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4 text-gray-300 hover:text-gray-500" />
      </button>
      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
        IMG
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 truncate">{product.title}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0" onClick={e => e.stopPropagation()}>
        <InlineStatusCell
          status={offer.status}
          pausedUntil={offer.pausedUntil}
          onChange={onStatusChange}
          onPause={onPause}
        />
        <InlinePriceCell
          price={offer.price}
          currency={offer.currency}
          overridden={offer.priceOverridden}
          onSave={onPriceChange}
        />
      </div>
    </div>
  );
}

