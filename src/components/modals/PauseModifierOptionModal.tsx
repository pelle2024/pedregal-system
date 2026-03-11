'use client';

import { useAppStore } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const PAUSE_DURATIONS = [
  { label: '1 hour', value: '1 hour' },
  { label: '2 hours', value: '2 hours' },
  { label: '4 hours', value: '4 hours' },
  { label: 'Until end of day', value: 'end of day' },
  { label: 'Indefinitely', value: 'indefinitely' },
];

export function PauseModifierOptionModal() {
  const open = useAppStore(s => s.modalOpen === 'pause-modifier-option');
  const data = useAppStore(s => s.modalData);
  const closeModal = useAppStore(s => s.closeModal);
  const updateModifierOptionStatus = useAppStore(s => s.updateModifierOptionStatus);
  const [selected, setSelected] = useState('1 hour');

  const optionId = data?.optionId as string | undefined;

  const handleConfirm = () => {
    if (optionId) {
      updateModifierOptionStatus(optionId, 'paused', selected === 'indefinitely' ? null : selected);
    }
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Pause Modifier Option</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <p className="text-sm text-gray-500">How long should this option be paused?</p>
          <div className="space-y-1.5">
            {PAUSE_DURATIONS.map(d => (
              <button
                key={d.value}
                onClick={() => setSelected(d.value)}
                className={cn(
                  'flex w-full rounded-md border px-3 py-2 text-sm transition-colors',
                  selected === d.value
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirm}>Pause Option</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
