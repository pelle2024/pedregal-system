'use client';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ItemStatus } from '@/store/types';

interface InlineStatusCellProps {
  status: ItemStatus;
  pausedUntil: string | null;
  onChange: (status: ItemStatus) => void;
  onPause: () => void;
}

export function InlineStatusCell({ status, pausedUntil, onChange, onPause }: InlineStatusCellProps) {
  const handleChange = (value: string) => {
    if (value === 'paused') {
      onPause();
    } else {
      onChange(value as ItemStatus);
    }
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      <Select value={status} onValueChange={handleChange}>
        <SelectTrigger className="h-7 w-auto min-w-[100px] border-0 bg-transparent px-1 text-xs shadow-none hover:bg-gray-100">
          <StatusDisplay status={status} pausedUntil={pausedUntil} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function StatusDisplay({ status, pausedUntil }: { status: string; pausedUntil: string | null }) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Active</Badge>;
    case 'paused':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Paused{pausedUntil ? ` · ${pausedUntil}` : ''}</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Inactive</Badge>;
    case 'out_of_stock':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Out of stock</Badge>;
    default:
      return null;
  }
}
