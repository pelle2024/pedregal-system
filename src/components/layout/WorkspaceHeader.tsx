'use client';

import { useAppStore } from '@/store';
import { VenueSwitcher } from './VenueSwitcher';
import { ArrowLeft } from 'lucide-react';

export function WorkspaceHeader() {
  const context = useAppStore(s => s.context);
  const business = useAppStore(s => s.getCurrentBusiness());
  const venue = useAppStore(s => s.getCurrentVenue());
  const isMulti = useAppStore(s => s.isMultiVenue());
  const returnToBusinessLevel = useAppStore(s => s.returnToBusinessLevel);

  const showBack = isMulti && context.level === 'venue';

  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={returnToBusinessLevel}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All venues
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">
          {context.level === 'business'
            ? 'Product Management'
            : `Product Management — ${venue?.name ?? ''}`}
        </h1>
      </div>

      {isMulti && <VenueSwitcher />}
    </div>
  );
}
