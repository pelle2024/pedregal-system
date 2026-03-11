'use client';

import { useAppStore } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select';
import { UtensilsCrossed, List } from 'lucide-react';

interface MenuSwitcherProps {
  currentMenuId: string;
}

export function MenuSwitcher({ currentMenuId }: MenuSwitcherProps) {
  const menus = useAppStore(s => s.menus);
  const venueId = useAppStore(s => s.context.currentVenueId);
  const level = useAppStore(s => s.context.level);
  const setActiveMenuId = useAppStore(s => s.setActiveMenuId);

  const availableMenus = level === 'business'
    ? menus.filter(m => m.isShared || !m.venueId)
    : menus.filter(m =>
        m.venueId === venueId || m.sharedToVenueIds.includes(venueId!)
      );

  if (availableMenus.length <= 1) return null;

  return (
    <Select
      value={currentMenuId}
      onValueChange={(value) => {
        if (value === '__manage__') {
          setActiveMenuId(null);
        } else {
          setActiveMenuId(value);
        }
      }}
    >
      <SelectTrigger className="w-56 border-gray-300">
        <UtensilsCrossed className="mr-2 h-4 w-4 text-gray-400" />
        <SelectValue placeholder="Switch menu" />
      </SelectTrigger>
      <SelectContent>
        {availableMenus.map(m => (
          <SelectItem key={m.id} value={m.id}>
            {m.name}
          </SelectItem>
        ))}
        <SelectSeparator />
        <SelectItem value="__manage__">
          <span className="flex items-center gap-1.5">
            <List className="h-3.5 w-3.5" />
            Manage all menus
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
