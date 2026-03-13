'use client';

import { useAppStore } from '@/store';
import { VenuesTab } from '../tabs/VenuesTab';
import { MenusTab } from '../tabs/MenusTab';
import { ModifiersTab } from '../tabs/ModifiersTab';
import { AllItemsTab } from '../tabs/AllItemsTab';
import { CategoriesTab } from '../tabs/CategoriesTab';
import { CollectionsTab } from '../tabs/CollectionsTab';
import { BundlesTab } from '../tabs/BundlesTab';
import { PlaceholderTab } from '../tabs/PlaceholderTab';

export function WorkspaceRouter() {
  const activeTab = useAppStore(s => s.context.activeTab);
  const level = useAppStore(s => s.context.level);

  switch (activeTab) {
    case 'venues':
      return <VenuesTab />;
    case 'menus':
      return <MenusTab />;
    case 'modifiers':
      return <ModifiersTab />;
    case 'all-items':
      return <AllItemsTab />;
    case 'categories':
      return <CategoriesTab />;
    case 'collections':
      return <CollectionsTab />;
    case 'bundles':
      return <BundlesTab />;
    default:
      return <PlaceholderTab tab={activeTab} level={level} />;
  }
}
