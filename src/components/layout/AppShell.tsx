'use client';

import { useAppStore } from '@/store';
import { Sidebar } from './Sidebar';
import { WorkspaceHeader } from './WorkspaceHeader';
import { TabBar } from './TabBar';
import { ScenarioSelector } from '../ScenarioSelector';

export function AppShell({ children }: { children: React.ReactNode }) {
  const scenarioId = useAppStore(s => s.context.scenarioId);

  if (!scenarioId) {
    return <ScenarioSelector />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <WorkspaceHeader />
        <TabBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
