'use client';

import { AppShell } from '@/components/layout/AppShell';
import { WorkspaceRouter } from '@/components/workspace/WorkspaceRouter';
import { ItemEditorSlideOver } from '@/components/editors/ItemEditorSlideOver';
import { ModifierGroupEditorSlideOver } from '@/components/editors/ModifierGroupEditorSlideOver';
import { BundleEditorSlideOver } from '@/components/editors/BundleEditorSlideOver';
import { PauseItemModal } from '@/components/modals/PauseItemModal';
import { PauseModifierOptionModal } from '@/components/modals/PauseModifierOptionModal';
import { CreateMenuModal } from '@/components/modals/CreateMenuModal';
import { CreateMenuCategoryModal } from '@/components/modals/CreateMenuCategoryModal';
import { AddItemToCategoryModal } from '@/components/modals/AddItemToCategoryModal';
import { AttachModifierModal } from '@/components/modals/AttachModifierModal';
import { CreateCategoryModal } from '@/components/modals/CreateCategoryModal';
import { CreateItemModal } from '@/components/modals/CreateItemModal';
import { ShareToVenuesModal } from '@/components/modals/ShareToVenuesModal';
import { OverrideConfirmationModal } from '@/components/modals/OverrideConfirmationModal';
import { AddToVenuesModal } from '@/components/modals/AddToVenuesModal';
import { CreateCollectionModal } from '@/components/modals/CreateCollectionModal';
import { AddProductsToCollectionModal } from '@/components/modals/AddProductsToCollectionModal';
import { ShareCollectionToVenuesModal } from '@/components/modals/ShareCollectionToVenuesModal';
import { CreateCatalogProductModal } from '@/components/modals/CreateCatalogProductModal';

export default function Home() {
  return (
    <AppShell>
      <WorkspaceRouter />
      {/* Slide-overs */}
      <ItemEditorSlideOver />
      <ModifierGroupEditorSlideOver />
      <BundleEditorSlideOver />
      {/* Modals */}
      <PauseItemModal />
      <PauseModifierOptionModal />
      <CreateMenuModal />
      <CreateMenuCategoryModal />
      <AddItemToCategoryModal />
      <AttachModifierModal />
      <CreateCategoryModal />
      <CreateItemModal />
      <ShareToVenuesModal />
      <OverrideConfirmationModal />
      <AddToVenuesModal />
      <CreateCollectionModal />
      <AddProductsToCollectionModal />
      <ShareCollectionToVenuesModal />
      <CreateCatalogProductModal />
    </AppShell>
  );
}
