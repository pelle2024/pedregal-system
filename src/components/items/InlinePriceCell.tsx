'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

interface InlinePriceCellProps {
  price: number;
  currency: string;
  overridden: boolean;
  onSave: (newPrice: number) => void;
}

export function InlinePriceCell({ price, currency, overridden, onSave }: InlinePriceCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(price.toFixed(2));
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    const newPrice = parseFloat(draft);
    if (!isNaN(newPrice) && newPrice !== price) {
      onSave(newPrice);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">{currency}</span>
          <Input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={save}
            className="h-7 w-24 pl-5 text-sm"
            type="number"
            step="0.01"
          />
        </div>
      </div>
    );
  }

  return (
    <span
      className="cursor-text rounded px-1.5 py-0.5 font-medium text-gray-900 hover:bg-gray-100"
      onClick={startEditing}
      title="Click to edit price"
    >
      {currency}{price.toFixed(2)}
      {overridden && <span className="ml-1 text-xs text-blue-600">*</span>}
    </span>
  );
}
