'use client';

import { useAppStore } from '@/store';
import { MenuDetail } from '../menus/MenuDetail';
import { MenuList } from '../menus/MenuList';

export function MenusTab() {
  const level = useAppStore(s => s.context.level);
  const activeMenuId = useAppStore(s => s.context.activeMenuId);

  if (activeMenuId) {
    return <MenuDetail menuId={activeMenuId} />;
  }

  return <MenuList level={level} />;
}
