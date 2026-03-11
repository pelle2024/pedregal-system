'use client';

import { useAppStore } from '@/store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Settings2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OptionDraft {
  id: string;
  name: string;
  priceDelta: string;
}

export function ModifierGroupEditorSlideOver() {
  const open = useAppStore(s => s.slideOverOpen && s.slideOverContent === 'modifier-group-editor');
  const data = useAppStore(s => s.slideOverData);
  const closeSlideOver = useAppStore(s => s.closeSlideOver);
  const modifierGroups = useAppStore(s => s.modifierGroups);
  const modifierOptions = useAppStore(s => s.modifierOptions);
  const addModifierGroup = useAppStore(s => s.addModifierGroup);
  const addModifierOption = useAppStore(s => s.addModifierOption);
  const updateModifierGroup = useAppStore(s => s.updateModifierGroup);
  const business = useAppStore(s => s.getCurrentBusiness());

  const mode = data?.mode as 'create' | 'edit' | undefined;
  const groupId = data?.groupId as string | undefined;
  const existingGroup = modifierGroups.find(g => g.id === groupId);

  const [name, setName] = useState('');
  const [required, setRequired] = useState('false');
  const [minSelections, setMinSelections] = useState('0');
  const [maxSelections, setMaxSelections] = useState('1');
  const [options, setOptions] = useState<OptionDraft[]>([]);

  useEffect(() => {
    if (mode === 'edit' && existingGroup) {
      setName(existingGroup.name);
      setRequired(String(existingGroup.required));
      setMinSelections(String(existingGroup.minSelections));
      setMaxSelections(String(existingGroup.maxSelections));
      const opts = modifierOptions
        .filter(o => existingGroup.optionIds.includes(o.id))
        .map(o => ({ id: o.id, name: o.name, priceDelta: o.priceDelta.toFixed(2) }));
      setOptions(opts);
    } else {
      setName('');
      setRequired('false');
      setMinSelections('0');
      setMaxSelections('1');
      setOptions([]);
    }
  }, [mode, existingGroup, modifierOptions, open]);

  const addOption = () => {
    setOptions(prev => [...prev, { id: `mo-draft-${Date.now()}`, name: '', priceDelta: '0' }]);
  };

  const removeOption = (id: string) => {
    setOptions(prev => prev.filter(o => o.id !== id));
  };

  const updateOption = (id: string, field: 'name' | 'priceDelta', value: string) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const handleSave = () => {
    if (!name.trim() || !business) return;

    if (mode === 'create') {
      const groupId = `mg-${Date.now()}`;
      const optionIds: string[] = [];

      options.forEach((o, i) => {
        if (o.name.trim()) {
          const optId = `mo-${Date.now()}-${i}`;
          optionIds.push(optId);
          addModifierOption({
            id: optId,
            modifierGroupId: groupId,
            name: o.name.trim(),
            priceDelta: parseFloat(o.priceDelta) || 0,
            status: 'active',
            pausedUntil: null,
          });
        }
      });

      addModifierGroup({
        id: groupId,
        businessId: business.id,
        name: name.trim(),
        required: required === 'true',
        minSelections: parseInt(minSelections) || 0,
        maxSelections: parseInt(maxSelections) || 1,
        status: 'active',
        optionIds,
      });
    } else if (mode === 'edit' && existingGroup) {
      updateModifierGroup(existingGroup.id, {
        name: name.trim(),
        required: required === 'true',
        minSelections: parseInt(minSelections) || 0,
        maxSelections: parseInt(maxSelections) || 1,
      });

      options.forEach((o, i) => {
        if (o.name.trim() && o.id.startsWith('mo-draft-')) {
          const optId = `mo-${Date.now()}-${i}`;
          addModifierOption({
            id: optId,
            modifierGroupId: existingGroup.id,
            name: o.name.trim(),
            priceDelta: parseFloat(o.priceDelta) || 0,
            status: 'active',
            pausedUntil: null,
          });
        }
      });
    }

    closeSlideOver();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && closeSlideOver()}>
      <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            {mode === 'create' ? 'Create Modifier Group' : 'Edit Modifier Group'}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Group Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Pizza Size, Extra Toppings" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Required</label>
              <Select value={required} onValueChange={setRequired}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Min</label>
              <Input value={minSelections} onChange={e => setMinSelections(e.target.value)} type="number" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Max</label>
              <Input value={maxSelections} onChange={e => setMaxSelections(e.target.value)} type="number" />
            </div>
          </div>

          <Separator />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Options</label>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={addOption}>
                <Plus className="h-3.5 w-3.5" />
                Add Option
              </Button>
            </div>

            <div className="space-y-2">
              {options.map(o => (
                <div key={o.id} className="flex items-center gap-2">
                  <Input
                    value={o.name}
                    onChange={e => updateOption(o.id, 'name', e.target.value)}
                    placeholder="Option name"
                    className="flex-1"
                  />
                  <Input
                    value={o.priceDelta}
                    onChange={e => updateOption(o.id, 'priceDelta', e.target.value)}
                    placeholder="+0.00"
                    className="w-24"
                    type="number"
                    step="0.01"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 text-gray-400 hover:text-red-600"
                    onClick={() => removeOption(o.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              {options.length === 0 && (
                <p className="text-sm text-gray-400">No options yet — add some above</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={!name.trim()}>
              {mode === 'create' ? 'Create Group' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={closeSlideOver}>Cancel</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
