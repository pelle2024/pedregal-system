'use client';

import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ItemStatus } from '@/store/types';

export function ModifiersTab() {
  const modifierGroups = useAppStore(s => s.modifierGroups);
  const modifierOptions = useAppStore(s => s.modifierOptions);
  const business = useAppStore(s => s.getCurrentBusiness());
  const openSlideOver = useAppStore(s => s.openSlideOver);
  const openModal = useAppStore(s => s.openModal);
  const updateModifierOptionStatus = useAppStore(s => s.updateModifierOptionStatus);

  const groups = modifierGroups.filter(g => g.businessId === business?.id);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(groups.map(g => g.id)));

  const toggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Modifier Groups</h2>
          <p className="mt-1 text-sm text-gray-500">
            {groups.length} group{groups.length !== 1 ? 's' : ''} · Attach to items to offer customizations
          </p>
        </div>
        <Button
          className="gap-1.5"
          onClick={() => openSlideOver('modifier-group-editor', { mode: 'create' })}
        >
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="space-y-3">
        {groups.map(g => {
          const options = modifierOptions.filter(o => g.optionIds.includes(o.id));
          const isExpanded = expandedIds.has(g.id);

          return (
            <div key={g.id} className="rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => toggle(g.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium text-gray-900">{g.name}</span>
                  {g.required && (
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  )}
                  <StatusBadge status={g.status} />
                  <span className="text-xs text-gray-400">
                    {g.minSelections}–{g.maxSelections} selections · {options.length} options
                  </span>
                </div>
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => openSlideOver('modifier-group-editor', { mode: 'edit', groupId: g.id })}
                  >
                    Edit
                  </Button>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100">
                  <div className="divide-y divide-gray-50">
                    {options.map(o => (
                      <div key={o.id} className="flex items-center justify-between px-4 py-2.5 pl-10">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{o.name}</span>
                          {o.priceDelta !== 0 && (
                            <span className="text-xs text-gray-500">
                              {o.priceDelta > 0 ? '+' : ''}{o.priceDelta.toFixed(2)}
                            </span>
                          )}
                          <OptionStatusBadge status={o.status} pausedUntil={o.pausedUntil} />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {o.status === 'active' && (
                              <DropdownMenuItem onClick={() => openModal('pause-modifier-option', { optionId: o.id })}>
                                Pause option
                              </DropdownMenuItem>
                            )}
                            {o.status === 'paused' && (
                              <DropdownMenuItem onClick={() => updateModifierOptionStatus(o.id, 'active')}>
                                Resume option
                              </DropdownMenuItem>
                            )}
                            {o.status !== 'out_of_stock' && (
                              <DropdownMenuItem onClick={() => updateModifierOptionStatus(o.id, 'out_of_stock')}>
                                Mark out of stock
                              </DropdownMenuItem>
                            )}
                            {o.status === 'out_of_stock' && (
                              <DropdownMenuItem onClick={() => updateModifierOptionStatus(o.id, 'active')}>
                                Mark in stock
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                  {options.length === 0 && (
                    <p className="px-10 py-3 text-sm text-gray-400">No options yet</p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {groups.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
            <p className="text-sm text-gray-500">No modifier groups yet</p>
            <Button
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={() => openSlideOver('modifier-group-editor', { mode: 'create' })}
            >
              <Plus className="h-4 w-4" />
              Create your first group
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'active') return null;
  return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">{status}</Badge>;
}

function OptionStatusBadge({ status, pausedUntil }: { status: string; pausedUntil: string | null }) {
  switch (status) {
    case 'active': return null;
    case 'paused':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Paused{pausedUntil ? ` · ${pausedUntil}` : ''}</Badge>;
    case 'out_of_stock':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Out of stock</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Inactive</Badge>;
    default: return null;
  }
}
