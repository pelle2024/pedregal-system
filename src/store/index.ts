import { create } from 'zustand';
import {
  AppContext, Business, Venue, Product, Offer, Menu, MenuCategory, MenuItem,
  Category, ModifierGroup, ModifierOption, Bundle, Collection,
  ScenarioId, NavigationLevel, VerticalType, ItemStatus,
} from './types';
import { getScenarioData, SCENARIOS } from './seedData';

export interface AppStore {
  // Context
  context: AppContext;

  // Data
  businesses: Business[];
  venues: Venue[];
  products: Product[];
  offers: Offer[];
  menus: Menu[];
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  categories: Category[];
  modifierGroups: ModifierGroup[];
  modifierOptions: ModifierOption[];
  bundles: Bundle[];
  collections: Collection[];

  // UI state
  slideOverOpen: boolean;
  slideOverContent: string | null;
  slideOverData: Record<string, unknown> | null;
  modalOpen: string | null;
  modalData: Record<string, unknown> | null;

  // Actions — context
  loadScenario: (id: ScenarioId) => void;
  drillIntoVenue: (venueId: string) => void;
  returnToBusinessLevel: () => void;
  setActiveTab: (tab: string) => void;
  setActiveMenuId: (menuId: string | null) => void;
  setActiveCollectionId: (collectionId: string | null) => void;
  switchVenue: (venueId: string) => void;

  // Actions — UI
  openSlideOver: (content: string, data?: Record<string, unknown>) => void;
  closeSlideOver: () => void;
  openModal: (modal: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Actions — data mutations
  updateOfferStatus: (offerId: string, status: ItemStatus, pausedUntil?: string | null) => void;
  updateOfferPrice: (offerId: string, price: number) => void;
  updateModifierOptionStatus: (optionId: string, status: ItemStatus, pausedUntil?: string | null) => void;
  addMenu: (menu: Menu) => void;
  addMenuCategory: (category: MenuCategory) => void;
  addMenuItem: (item: MenuItem) => void;
  addProduct: (product: Product) => void;
  addOffer: (offer: Offer) => void;
  updateMenu: (menuId: string, updates: Partial<Menu>) => void;
  updateMenuCategory: (categoryId: string, updates: Partial<MenuCategory>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  reorderMenuCategories: (menuId: string, categoryIds: string[]) => void;
  reorderMenuItems: (categoryId: string, itemIds: string[]) => void;
  addModifierGroup: (group: ModifierGroup) => void;
  addModifierOption: (option: ModifierOption) => void;
  updateModifierGroup: (groupId: string, updates: Partial<ModifierGroup>) => void;
  addCategory: (category: Category) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  reorderCategories: (categoryIds: string[]) => void;
  addCollection: (collection: Collection) => void;
  updateCollection: (collectionId: string, updates: Partial<Collection>) => void;
  addBundle: (bundle: Bundle) => void;
  updateBundle: (bundleId: string, updates: Partial<Bundle>) => void;

  // Selectors (computed helpers)
  getCurrentBusiness: () => Business | null;
  getCurrentVenue: () => Venue | null;
  getVenuesForBusiness: () => Venue[];
  getDefaultTab: () => string;
  getTabsForContext: () => string[];
  isMultiVenue: () => boolean;
  getVerticalType: () => VerticalType;
}

function getDefaultTabForVertical(vertical: VerticalType, level: NavigationLevel): string {
  if (level === 'business') return 'venues';
  switch (vertical) {
    case 'restaurant': return 'menus';
    case 'hybrid': return 'all-items';
    default: return 'all-items';
  }
}

function getTabsForLevel(vertical: VerticalType, level: NavigationLevel): string[] {
  if (level === 'business') {
    switch (vertical) {
      case 'restaurant': return ['venues', 'all-items', 'menus', 'modifiers', 'bundles'];
      case 'hybrid': return ['venues', 'all-items', 'menus', 'collections', 'modifiers', 'bundles'];
      default: return ['venues', 'all-items', 'collections', 'modifiers'];
    }
  }
  switch (vertical) {
    case 'restaurant': return ['menus', 'all-items', 'modifiers', 'bundles'];
    case 'hybrid': return ['all-items', 'menus', 'categories', 'modifiers', 'bundles'];
    default: return ['all-items', 'categories', 'modifiers'];
  }
}

export const useAppStore = create<AppStore>((set, get) => ({
  context: {
    scenarioId: null,
    level: 'business',
    currentVenueId: null,
    activeTab: 'venues',
    activeMenuId: null,
    activeCollectionId: null,
  },

  businesses: [],
  venues: [],
  products: [],
  offers: [],
  menus: [],
  menuCategories: [],
  menuItems: [],
  categories: [],
  modifierGroups: [],
  modifierOptions: [],
  bundles: [],
  collections: [],

  slideOverOpen: false,
  slideOverContent: null,
  slideOverData: null,
  modalOpen: null,
  modalData: null,

  loadScenario: (id) => {
    const data = getScenarioData(id);
    const scenario = SCENARIOS.find(s => s.id === id)!;
    const isMulti = scenario.isMultiVenue;
    const level: NavigationLevel = isMulti ? 'business' : 'venue';
    const defaultTab = isMulti
      ? 'venues'
      : getDefaultTabForVertical(scenario.verticalType, 'venue');
    const venueId = isMulti ? null : data.venues[0]?.id ?? null;

    let activeMenuId: string | null = null;
    if (!isMulti && scenario.verticalType === 'restaurant' && data.menus.length > 0) {
      activeMenuId = data.menus[0].id;
    }

    set({
      ...data,
      context: {
        scenarioId: id,
        level,
        currentVenueId: venueId,
        activeTab: defaultTab,
        activeMenuId,
        activeCollectionId: null,
      },
      slideOverOpen: false,
      slideOverContent: null,
      slideOverData: null,
      modalOpen: null,
      modalData: null,
    });
  },

  drillIntoVenue: (venueId) => {
    const venue = get().venues.find(v => v.id === venueId);
    if (!venue) return;
    const defaultTab = getDefaultTabForVertical(venue.verticalType, 'venue');
    let activeMenuId: string | null = null;
    if (venue.verticalType === 'restaurant' || venue.verticalType === 'hybrid') {
      const venueMenus = get().menus.filter(m =>
        m.sharedToVenueIds.includes(venueId) || m.venueId === venueId
      );
      if (venueMenus.length > 0) activeMenuId = venueMenus[0].id;
    }
    set(state => ({
      context: {
        ...state.context,
        level: 'venue',
        currentVenueId: venueId,
        activeTab: defaultTab,
        activeMenuId,
        activeCollectionId: null,
      },
    }));
  },

  returnToBusinessLevel: () => {
    set(state => ({
      context: {
        ...state.context,
        level: 'business',
        currentVenueId: null,
        activeTab: 'venues',
        activeMenuId: null,
        activeCollectionId: null,
      },
    }));
  },

  setActiveTab: (tab) => set(state => ({
    context: { ...state.context, activeTab: tab, activeMenuId: tab !== 'menus' ? state.context.activeMenuId : state.context.activeMenuId, activeCollectionId: null },
  })),

  setActiveMenuId: (menuId) => set(state => ({
    context: { ...state.context, activeMenuId: menuId },
  })),

  setActiveCollectionId: (collectionId) => set(state => ({
    context: { ...state.context, activeCollectionId: collectionId },
  })),

  switchVenue: (venueId) => {
    if (venueId === 'business') {
      get().returnToBusinessLevel();
    } else {
      get().drillIntoVenue(venueId);
    }
  },

  openSlideOver: (content, data) => set({ slideOverOpen: true, slideOverContent: content, slideOverData: data ?? null }),
  closeSlideOver: () => set({ slideOverOpen: false, slideOverContent: null, slideOverData: null }),
  openModal: (modal, data) => set({ modalOpen: modal, modalData: data ?? null }),
  closeModal: () => set({ modalOpen: null, modalData: null }),

  updateOfferStatus: (offerId, status, pausedUntil) => set(state => ({
    offers: state.offers.map(o => o.id === offerId ? { ...o, status, pausedUntil: pausedUntil ?? null } : o),
  })),

  updateOfferPrice: (offerId, price) => set(state => ({
    offers: state.offers.map(o => o.id === offerId ? { ...o, price, priceOverridden: true } : o),
  })),

  updateModifierOptionStatus: (optionId, status, pausedUntil) => set(state => ({
    modifierOptions: state.modifierOptions.map(o => o.id === optionId ? { ...o, status, pausedUntil: pausedUntil ?? null } : o),
  })),

  addMenu: (menu) => set(state => ({ menus: [...state.menus, menu] })),
  addMenuCategory: (category) => set(state => ({
    menuCategories: [...state.menuCategories, category],
    menus: state.menus.map(m => m.id === category.menuId ? { ...m, categoryIds: [...m.categoryIds, category.id] } : m),
  })),
  addMenuItem: (item) => set(state => ({
    menuItems: [...state.menuItems, item],
    menuCategories: state.menuCategories.map(c => c.id === item.menuCategoryId ? { ...c, menuItemIds: [...c.menuItemIds, item.id] } : c),
  })),
  addProduct: (product) => set(state => ({ products: [...state.products, product] })),
  addOffer: (offer) => set(state => ({ offers: [...state.offers, offer] })),

  updateMenu: (menuId, updates) => set(state => ({
    menus: state.menus.map(m => m.id === menuId ? { ...m, ...updates } : m),
  })),
  updateMenuCategory: (categoryId, updates) => set(state => ({
    menuCategories: state.menuCategories.map(c => c.id === categoryId ? { ...c, ...updates } : c),
  })),
  updateProduct: (productId, updates) => set(state => ({
    products: state.products.map(p => p.id === productId ? { ...p, ...updates } : p),
  })),

  reorderMenuCategories: (menuId, categoryIds) => set(state => ({
    menus: state.menus.map(m => m.id === menuId ? { ...m, categoryIds } : m),
    menuCategories: state.menuCategories.map(c => {
      const idx = categoryIds.indexOf(c.id);
      return idx >= 0 ? { ...c, sortOrder: idx } : c;
    }),
  })),

  reorderMenuItems: (categoryId, itemIds) => set(state => ({
    menuCategories: state.menuCategories.map(c => c.id === categoryId ? { ...c, menuItemIds: itemIds } : c),
    menuItems: state.menuItems.map(mi => {
      const idx = itemIds.indexOf(mi.id);
      return idx >= 0 ? { ...mi, sortOrder: idx } : mi;
    }),
  })),

  addModifierGroup: (group) => set(state => ({ modifierGroups: [...state.modifierGroups, group] })),
  addModifierOption: (option) => set(state => ({
    modifierOptions: [...state.modifierOptions, option],
    modifierGroups: state.modifierGroups.map(g => g.id === option.modifierGroupId ? { ...g, optionIds: [...g.optionIds, option.id] } : g),
  })),
  updateModifierGroup: (groupId, updates) => set(state => ({
    modifierGroups: state.modifierGroups.map(g => g.id === groupId ? { ...g, ...updates } : g),
  })),

  addCategory: (category) => set(state => ({ categories: [...state.categories, category] })),
  updateCategory: (categoryId, updates) => set(state => ({
    categories: state.categories.map(c => c.id === categoryId ? { ...c, ...updates } : c),
  })),
  reorderCategories: (categoryIds) => set(state => ({
    categories: state.categories.map(c => {
      const idx = categoryIds.indexOf(c.id);
      return idx >= 0 ? { ...c, sortOrder: idx } : c;
    }),
  })),

  addCollection: (collection) => set(state => ({ collections: [...state.collections, collection] })),
  updateCollection: (collectionId, updates) => set(state => ({
    collections: state.collections.map(c => c.id === collectionId ? { ...c, ...updates } : c),
  })),

  addBundle: (bundle) => set(state => ({ bundles: [...state.bundles, bundle] })),
  updateBundle: (bundleId, updates) => set(state => ({
    bundles: state.bundles.map(b => b.id === bundleId ? { ...b, ...updates } : b),
  })),

  getCurrentBusiness: () => {
    const state = get();
    return state.businesses[0] ?? null;
  },

  getCurrentVenue: () => {
    const state = get();
    const { currentVenueId } = state.context;
    if (!currentVenueId) return null;
    return state.venues.find(v => v.id === currentVenueId) ?? null;
  },

  getVenuesForBusiness: () => {
    const state = get();
    const biz = state.businesses[0];
    if (!biz) return [];
    return state.venues.filter(v => v.businessId === biz.id);
  },

  getDefaultTab: () => {
    const state = get();
    const biz = state.businesses[0];
    if (!biz) return 'all-items';
    return getDefaultTabForVertical(biz.verticalType, state.context.level);
  },

  getTabsForContext: () => {
    const state = get();
    const { level, currentVenueId } = state.context;
    if (level === 'venue' && currentVenueId) {
      const venue = state.venues.find(v => v.id === currentVenueId);
      if (venue) return getTabsForLevel(venue.verticalType, 'venue');
    }
    const biz = state.businesses[0];
    if (biz) return getTabsForLevel(biz.verticalType, level);
    return ['all-items'];
  },

  isMultiVenue: () => {
    const state = get();
    return state.venues.length > 1;
  },

  getVerticalType: () => {
    const state = get();
    const { currentVenueId } = state.context;
    if (currentVenueId) {
      const venue = state.venues.find(v => v.id === currentVenueId);
      if (venue) return venue.verticalType;
    }
    const biz = state.businesses[0];
    return biz?.verticalType ?? 'restaurant';
  },
}));
