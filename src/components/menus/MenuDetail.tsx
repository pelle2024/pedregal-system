'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MenuSwitcher } from './MenuSwitcher';
import { MenuCategorySection } from './MenuCategorySection';
import { Clock, Settings, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { ItemStatus } from '@/store/types';
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

interface MenuDetailProps {
  menuId: string;
}

export function MenuDetail({ menuId }: MenuDetailProps) {
  const menu = useAppStore(s => s.menus.find(m => m.id === menuId));
  const menuCategories = useAppStore(s => s.menuCategories);
  const setActiveMenuId = useAppStore(s => s.setActiveMenuId);
  const openModal = useAppStore(s => s.openModal);
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const level = useAppStore(s => s.context.level);
  const reorderMenuCategories = useAppStore(s => s.reorderMenuCategories);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'all'>('all');

  if (!menu) return null;

  const categories = menuCategories
    .filter(c => menu.categoryIds.includes(c.id))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const isSharedAtVenueLevel = menu.isShared && level === 'venue';

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex(c => c.id === active.id);
    const newIndex = categories.findIndex(c => c.id === over.id);
    const newOrder = arrayMove(categories.map(c => c.id), oldIndex, newIndex);
    reorderMenuCategories(menuId, newOrder);
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <MenuSwitcher currentMenuId={menuId} />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{menu.name}</h2>
            <StatusBadge status={menu.status} />
            {menu.isShared && (
              <Badge variant="outline" className="text-xs">
                Shared to {menu.sharedToVenueIds.length} venue{menu.sharedToVenueIds.length !== 1 ? 's' : ''}
              </Badge>
            )}
            {isSharedAtVenueLevel && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                Read-only structure
              </Badge>
            )}
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            {menu.hours}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {!isSharedAtVenueLevel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openModal('create-menu-category', { menuId })}
                className="gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Category
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openSlideOver('menu-settings', { menuId })}
            >
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ItemStatus | 'all')}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {categories.map(cat => (
              <MenuCategorySection
                key={cat.id}
                category={cat}
                isSharedAtVenueLevel={isSharedAtVenueLevel}
                statusFilter={statusFilter}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
          <p className="text-sm text-gray-500">This menu has no categories yet</p>
          {!isSharedAtVenueLevel && (
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openModal('create-menu-category', { menuId })}
            >
              <Plus className="h-4 w-4" />
              Add a category
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Inactive</Badge>;
    case 'draft':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Draft</Badge>;
    default:
      return null;
  }
}
