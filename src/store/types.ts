export type VerticalType = 'restaurant' | 'grocery' | 'electronics' | 'flower' | 'hybrid';
export type ItemStatus = 'active' | 'inactive' | 'paused' | 'out_of_stock';
export type MenuStatus = 'active' | 'inactive' | 'draft';
export type NavigationLevel = 'business' | 'venue';

export interface Business {
  id: string;
  name: string;
  verticalType: VerticalType;
  venueIds: string[];
}

export interface Venue {
  id: string;
  businessId: string;
  name: string;
  address: string;
  verticalType: VerticalType;
}

export interface Product {
  id: string;
  businessId: string;
  title: string;
  description: string;
  image: string;
  categoryId: string | null;
  modifierGroupIds: string[];
}

export interface Offer {
  id: string;
  venueId: string;
  productId: string;
  price: number;
  currency: string;
  status: ItemStatus;
  pausedUntil: string | null;
  availabilitySchedule: string | null;
  priceOverridden: boolean;
  source: 'direct' | 'menu' | 'collection';
  sourceId: string | null;
}

export interface Menu {
  id: string;
  venueId: string | null;
  businessId: string;
  name: string;
  hours: string;
  status: MenuStatus;
  isShared: boolean;
  sharedToVenueIds: string[];
  categoryIds: string[];
}

export interface MenuCategory {
  id: string;
  menuId: string;
  name: string;
  sortOrder: number;
  menuItemIds: string[];
}

export interface MenuItem {
  id: string;
  menuCategoryId: string;
  offerId: string;
  productId: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  businessId: string;
  name: string;
  sortOrder: number;
}

export interface ModifierGroup {
  id: string;
  businessId: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  status: ItemStatus;
  optionIds: string[];
}

export interface ModifierOption {
  id: string;
  modifierGroupId: string;
  name: string;
  priceDelta: number;
  status: ItemStatus;
  pausedUntil: string | null;
}

export interface Bundle {
  id: string;
  businessId: string;
  venueId: string | null;
  name: string;
  description: string;
  price: number;
  status: ItemStatus;
  offerIds: string[];
}

export interface Collection {
  id: string;
  businessId: string;
  name: string;
  status: ItemStatus;
  productIds: string[];
  sharedToVenueIds: string[];
}

export type ScenarioId = 'marios' | 'bloom' | 'burger-chain' | 'quickstop';

export interface AppContext {
  scenarioId: ScenarioId | null;
  level: NavigationLevel;
  currentVenueId: string | null;
  activeTab: string;
  activeMenuId: string | null;
  activeCollectionId: string | null;
}

export interface ScenarioConfig {
  id: ScenarioId;
  title: string;
  subtitle: string;
  verticalType: VerticalType;
  isMultiVenue: boolean;
}
