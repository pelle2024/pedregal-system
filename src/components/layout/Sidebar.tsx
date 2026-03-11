'use client';

import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Users,
  CreditCard,
  Store,
} from 'lucide-react';

const topNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: BarChart3, label: 'Analytics', key: 'analytics' },
  { icon: Users, label: 'Customers', key: 'customers' },
  { icon: CreditCard, label: 'Payments', key: 'payments' },
];

const bottomNavItems = [
  { icon: Settings, label: 'Settings', key: 'settings' },
];

export function Sidebar() {
  const loadScenario = useAppStore(s => s.loadScenario);
  const scenarioId = useAppStore(s => s.context.scenarioId);
  const businessName = useAppStore(s => s.businesses[0]?.name ?? '');

  return (
    <div className="flex w-56 flex-col border-r border-gray-200 bg-white">
      {/* Logo / brand */}
      <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4">
        <Store className="h-5 w-5 text-gray-900" />
        <span className="truncate text-sm font-semibold text-gray-900">{businessName}</span>
      </div>

      <nav className="flex flex-1 flex-col p-2">
        <div className="space-y-0.5">
          {topNavItems.map(item => (
            <button
              key={item.key}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-500',
                'hover:bg-gray-100 hover:text-gray-700',
                'cursor-default',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}

          {/* Active nav item — Product Management */}
          <button
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm',
              'bg-gray-900 text-white',
            )}
          >
            <Package className="h-4 w-4" />
            Product Management
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom nav items */}
        <div className="space-y-0.5">
          {bottomNavItems.map(item => (
            <button
              key={item.key}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-500',
                'hover:bg-gray-100 hover:text-gray-700',
                'cursor-default',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}

          {/* Scenario switcher */}
          <button
            onClick={() => {
              if (scenarioId) {
                useAppStore.setState({
                  context: {
                    scenarioId: null,
                    level: 'business',
                    currentVenueId: null,
                    activeTab: 'venues',
                    activeMenuId: null,
                    activeCollectionId: null,
                  },
                });
              }
            }}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-xs">Switch scenario</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
