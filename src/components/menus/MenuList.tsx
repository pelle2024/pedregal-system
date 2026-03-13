'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationLevel } from '@/store/types';
import { Clock, ChevronRight, Plus, Share2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MenuListProps {
  level: NavigationLevel;
}

export function MenuList({ level }: MenuListProps) {
  const menus = useAppStore(s => s.menus);
  const venueId = useAppStore(s => s.context.currentVenueId);
  const setActiveMenuId = useAppStore(s => s.setActiveMenuId);
  const openModal = useAppStore(s => s.openModal);
  const menuCategories = useAppStore(s => s.menuCategories);
  const menuItems = useAppStore(s => s.menuItems);

  const filteredMenus = level === 'business'
    ? menus.filter(m => m.isShared || !m.venueId)
    : menus.filter(m =>
        m.venueId === venueId || m.sharedToVenueIds.includes(venueId!)
      );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Menus</h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredMenus.length} menu{filteredMenus.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => openModal('create-menu')}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Create Menu
        </Button>
      </div>

      <div className="space-y-3">
        {filteredMenus.map(menu => {
          const cats = menuCategories.filter(c => menu.categoryIds.includes(c.id));
          const itemCount = cats.reduce((sum, c) => sum + c.menuItemIds.length, 0);

          return (
            <div
              key={menu.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveMenuId(menu.id)}
              onKeyDown={e => e.key === 'Enter' && setActiveMenuId(menu.id)}
              className="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-400 hover:shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{menu.name}</h3>
                  <StatusBadge status={menu.status} />
                  {menu.isShared && (
                    <Badge variant="outline" className="text-xs">Shared</Badge>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {menu.hours}
                  </span>
                  <span>{cats.length} categories</span>
                  <span>{itemCount} items</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {level === 'business' && (
                  <div onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded p-1 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setActiveMenuId(menu.id)}>
                          Edit menu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModal('share-to-venues', { menuId: menu.id })}>
                          <Share2 className="mr-2 h-3.5 w-3.5" />
                          Share to venues
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}

        {filteredMenus.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
            <p className="text-sm text-gray-500">No menus yet</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openModal('create-menu')}
            >
              <Plus className="h-4 w-4" />
              Create your first menu
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
    case 'draft':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Draft</Badge>;
    default:
      return null;
  }
}
