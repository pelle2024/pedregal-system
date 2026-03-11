'use client';

import { useAppStore } from '@/store';
import { CollectionDetail } from '../collections/CollectionDetail';
import { CollectionList } from '../collections/CollectionList';

export function CollectionsTab() {
  const activeCollectionId = useAppStore(s => s.context.activeCollectionId);

  if (activeCollectionId) {
    return <CollectionDetail collectionId={activeCollectionId} />;
  }

  return <CollectionList />;
}
