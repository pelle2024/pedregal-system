'use client';

import { useAppStore } from '@/store';
import { SCENARIOS } from '@/store/seedData';
import { Store, ChevronRight } from 'lucide-react';

export function ScenarioSelector() {
  const loadScenario = useAppStore(s => s.loadScenario);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg px-6">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900">
              <Store className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Select a scenario to explore the merchant experience
          </p>
        </div>

        <div className="space-y-3">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => loadScenario(s.id)}
              className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 text-left transition-all hover:border-gray-400 hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{s.title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{s.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
