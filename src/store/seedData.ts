import {
  Business, Venue, Product, Offer, Menu, MenuCategory, MenuItem,
  Category, ModifierGroup, ModifierOption, Bundle, Collection, ScenarioConfig,
} from './types';

export const SCENARIOS: ScenarioConfig[] = [
  { id: 'marios', title: "Mario's Pizzeria", subtitle: 'Single-venue restaurant', verticalType: 'restaurant', isMultiVenue: false },
  { id: 'bloom', title: 'Bloom & Co', subtitle: 'Single-venue flower shop', verticalType: 'flower', isMultiVenue: false },
  { id: 'burger-chain', title: 'Burger Chain', subtitle: 'Multi-venue restaurant (3 locations)', verticalType: 'restaurant', isMultiVenue: true },
  { id: 'quickstop', title: 'QuickStop Convenience', subtitle: 'Hybrid (grocery + deli menu, 2 locations)', verticalType: 'hybrid', isMultiVenue: true },
  { id: 'freshmart', title: 'FreshMart Groceries', subtitle: 'Multi-venue grocery chain (7 locations)', verticalType: 'grocery', isMultiVenue: true },
];

// ─── Mario's Pizzeria ────────────────────────────────────────────

const mariosBusiness: Business = { id: 'biz-marios', name: "Mario's Pizzeria", verticalType: 'restaurant', venueIds: ['v-marios'] };
const mariosVenue: Venue = { id: 'v-marios', businessId: 'biz-marios', name: "Mario's Pizzeria", address: '123 Main St', verticalType: 'restaurant' };

const mariosCategories: Category[] = [
  { id: 'cat-m-starters', businessId: 'biz-marios', name: 'Starters', sortOrder: 0 },
  { id: 'cat-m-mains', businessId: 'biz-marios', name: 'Mains', sortOrder: 1 },
  { id: 'cat-m-drinks', businessId: 'biz-marios', name: 'Drinks', sortOrder: 2 },
  { id: 'cat-m-appetizers', businessId: 'biz-marios', name: 'Appetizers', sortOrder: 3 },
  { id: 'cat-m-entrees', businessId: 'biz-marios', name: 'Entrees', sortOrder: 4 },
  { id: 'cat-m-desserts', businessId: 'biz-marios', name: 'Desserts', sortOrder: 5 },
];

const mariosProducts: Product[] = [
  { id: 'p-spring-rolls', businessId: 'biz-marios', title: 'Spring Rolls', description: 'Crispy vegetable spring rolls with dipping sauce', image: '/placeholder.svg', categoryId: 'cat-m-starters', modifierGroupIds: ['mg-spice'] },
  { id: 'p-bruschetta', businessId: 'biz-marios', title: 'Bruschetta', description: 'Toasted bread with tomato, basil and garlic', image: '/placeholder.svg', categoryId: 'cat-m-starters', modifierGroupIds: [] },
  { id: 'p-garlic-bread', businessId: 'biz-marios', title: 'Garlic Bread', description: 'Freshly baked garlic bread with herbs', image: '/placeholder.svg', categoryId: 'cat-m-starters', modifierGroupIds: [] },
  { id: 'p-margherita', businessId: 'biz-marios', title: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil', image: '/placeholder.svg', categoryId: 'cat-m-mains', modifierGroupIds: ['mg-pizza-size', 'mg-toppings'] },
  { id: 'p-pepperoni', businessId: 'biz-marios', title: 'Pepperoni Pizza', description: 'Spicy pepperoni with mozzarella', image: '/placeholder.svg', categoryId: 'cat-m-mains', modifierGroupIds: ['mg-pizza-size', 'mg-toppings'] },
  { id: 'p-carbonara', businessId: 'biz-marios', title: 'Pasta Carbonara', description: 'Creamy egg and pancetta pasta', image: '/placeholder.svg', categoryId: 'cat-m-mains', modifierGroupIds: [] },
  { id: 'p-coke', businessId: 'biz-marios', title: 'Coke', description: 'Coca-Cola 330ml', image: '/placeholder.svg', categoryId: 'cat-m-drinks', modifierGroupIds: [] },
  { id: 'p-sparkling', businessId: 'biz-marios', title: 'Sparkling Water', description: 'San Pellegrino 500ml', image: '/placeholder.svg', categoryId: 'cat-m-drinks', modifierGroupIds: [] },
  { id: 'p-caprese', businessId: 'biz-marios', title: 'Caprese Salad', description: 'Fresh mozzarella, tomato, and basil', image: '/placeholder.svg', categoryId: 'cat-m-appetizers', modifierGroupIds: [] },
  { id: 'p-soup', businessId: 'biz-marios', title: 'Soup of the Day', description: 'Ask your server for today\'s selection', image: '/placeholder.svg', categoryId: 'cat-m-appetizers', modifierGroupIds: [] },
  { id: 'p-truffle-pizza', businessId: 'biz-marios', title: 'Truffle Mushroom Pizza', description: 'Wild mushrooms with truffle oil', image: '/placeholder.svg', categoryId: 'cat-m-entrees', modifierGroupIds: ['mg-pizza-size', 'mg-toppings'] },
  { id: 'p-osso-buco', businessId: 'biz-marios', title: 'Osso Buco', description: 'Braised veal shanks with gremolata', image: '/placeholder.svg', categoryId: 'cat-m-entrees', modifierGroupIds: [] },
  { id: 'p-tiramisu', businessId: 'biz-marios', title: 'Tiramisu', description: 'Classic Italian coffee dessert', image: '/placeholder.svg', categoryId: 'cat-m-desserts', modifierGroupIds: [] },
  { id: 'p-panna-cotta', businessId: 'biz-marios', title: 'Panna Cotta', description: 'Vanilla cream with berry compote', image: '/placeholder.svg', categoryId: 'cat-m-desserts', modifierGroupIds: [] },
];

const mariosOffers: Offer[] = [
  { id: 'o-spring-rolls', venueId: 'v-marios', productId: 'p-spring-rolls', price: 8.50, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-bruschetta', venueId: 'v-marios', productId: 'p-bruschetta', price: 7.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-garlic-bread', venueId: 'v-marios', productId: 'p-garlic-bread', price: 5.50, currency: '€', status: 'paused', pausedUntil: '15:00 today', availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-margherita', venueId: 'v-marios', productId: 'p-margherita', price: 14.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-pepperoni', venueId: 'v-marios', productId: 'p-pepperoni', price: 16.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-carbonara', venueId: 'v-marios', productId: 'p-carbonara', price: 15.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-coke', venueId: 'v-marios', productId: 'p-coke', price: 3.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-sparkling', venueId: 'v-marios', productId: 'p-sparkling', price: 2.50, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-lunch' },
  { id: 'o-caprese', venueId: 'v-marios', productId: 'p-caprese', price: 9.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-soup', venueId: 'v-marios', productId: 'p-soup', price: 7.50, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-margherita-d', venueId: 'v-marios', productId: 'p-margherita', price: 14.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-truffle-pizza', venueId: 'v-marios', productId: 'p-truffle-pizza', price: 19.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-osso-buco', venueId: 'v-marios', productId: 'p-osso-buco', price: 24.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-tiramisu', venueId: 'v-marios', productId: 'p-tiramisu', price: 8.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
  { id: 'o-panna-cotta', venueId: 'v-marios', productId: 'p-panna-cotta', price: 7.00, currency: '€', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-dinner' },
];

const mariosMenus: Menu[] = [
  { id: 'menu-lunch', venueId: 'v-marios', businessId: 'biz-marios', name: 'Lunch Menu', hours: 'Mon–Fri 11:00–15:00', status: 'active', isShared: false, sharedToVenueIds: [], categoryIds: ['mc-lunch-starters', 'mc-lunch-mains', 'mc-lunch-drinks'] },
  { id: 'menu-dinner', venueId: 'v-marios', businessId: 'biz-marios', name: 'Dinner Menu', hours: 'Mon–Sun 17:00–22:00', status: 'active', isShared: false, sharedToVenueIds: [], categoryIds: ['mc-dinner-appetizers', 'mc-dinner-entrees', 'mc-dinner-desserts'] },
];

const mariosMenuCategories: MenuCategory[] = [
  { id: 'mc-lunch-starters', menuId: 'menu-lunch', name: 'Starters', sortOrder: 0, menuItemIds: ['mi-spring-rolls', 'mi-bruschetta', 'mi-garlic-bread'] },
  { id: 'mc-lunch-mains', menuId: 'menu-lunch', name: 'Mains', sortOrder: 1, menuItemIds: ['mi-margherita', 'mi-pepperoni', 'mi-carbonara'] },
  { id: 'mc-lunch-drinks', menuId: 'menu-lunch', name: 'Drinks', sortOrder: 2, menuItemIds: ['mi-coke', 'mi-sparkling'] },
  { id: 'mc-dinner-appetizers', menuId: 'menu-dinner', name: 'Appetizers', sortOrder: 0, menuItemIds: ['mi-caprese', 'mi-soup'] },
  { id: 'mc-dinner-entrees', menuId: 'menu-dinner', name: 'Entrees', sortOrder: 1, menuItemIds: ['mi-margherita-d', 'mi-truffle-pizza', 'mi-osso-buco'] },
  { id: 'mc-dinner-desserts', menuId: 'menu-dinner', name: 'Desserts', sortOrder: 2, menuItemIds: ['mi-tiramisu', 'mi-panna-cotta'] },
];

const mariosMenuItems: MenuItem[] = [
  { id: 'mi-spring-rolls', menuCategoryId: 'mc-lunch-starters', offerId: 'o-spring-rolls', productId: 'p-spring-rolls', sortOrder: 0 },
  { id: 'mi-bruschetta', menuCategoryId: 'mc-lunch-starters', offerId: 'o-bruschetta', productId: 'p-bruschetta', sortOrder: 1 },
  { id: 'mi-garlic-bread', menuCategoryId: 'mc-lunch-starters', offerId: 'o-garlic-bread', productId: 'p-garlic-bread', sortOrder: 2 },
  { id: 'mi-margherita', menuCategoryId: 'mc-lunch-mains', offerId: 'o-margherita', productId: 'p-margherita', sortOrder: 0 },
  { id: 'mi-pepperoni', menuCategoryId: 'mc-lunch-mains', offerId: 'o-pepperoni', productId: 'p-pepperoni', sortOrder: 1 },
  { id: 'mi-carbonara', menuCategoryId: 'mc-lunch-mains', offerId: 'o-carbonara', productId: 'p-carbonara', sortOrder: 2 },
  { id: 'mi-coke', menuCategoryId: 'mc-lunch-drinks', offerId: 'o-coke', productId: 'p-coke', sortOrder: 0 },
  { id: 'mi-sparkling', menuCategoryId: 'mc-lunch-drinks', offerId: 'o-sparkling', productId: 'p-sparkling', sortOrder: 1 },
  { id: 'mi-caprese', menuCategoryId: 'mc-dinner-appetizers', offerId: 'o-caprese', productId: 'p-caprese', sortOrder: 0 },
  { id: 'mi-soup', menuCategoryId: 'mc-dinner-appetizers', offerId: 'o-soup', productId: 'p-soup', sortOrder: 1 },
  { id: 'mi-margherita-d', menuCategoryId: 'mc-dinner-entrees', offerId: 'o-margherita-d', productId: 'p-margherita', sortOrder: 0 },
  { id: 'mi-truffle-pizza', menuCategoryId: 'mc-dinner-entrees', offerId: 'o-truffle-pizza', productId: 'p-truffle-pizza', sortOrder: 1 },
  { id: 'mi-osso-buco', menuCategoryId: 'mc-dinner-entrees', offerId: 'o-osso-buco', productId: 'p-osso-buco', sortOrder: 2 },
  { id: 'mi-tiramisu', menuCategoryId: 'mc-dinner-desserts', offerId: 'o-tiramisu', productId: 'p-tiramisu', sortOrder: 0 },
  { id: 'mi-panna-cotta', menuCategoryId: 'mc-dinner-desserts', offerId: 'o-panna-cotta', productId: 'p-panna-cotta', sortOrder: 1 },
];

const mariosModifierGroups: ModifierGroup[] = [
  { id: 'mg-pizza-size', businessId: 'biz-marios', name: 'Pizza Size', required: true, minSelections: 1, maxSelections: 1, status: 'active', optionIds: ['mo-small', 'mo-medium', 'mo-large'] },
  { id: 'mg-toppings', businessId: 'biz-marios', name: 'Extra Toppings', required: false, minSelections: 0, maxSelections: 4, status: 'active', optionIds: ['mo-mushrooms', 'mo-olives', 'mo-peppers', 'mo-extra-cheese'] },
  { id: 'mg-spice', businessId: 'biz-marios', name: 'Spice Level', required: true, minSelections: 1, maxSelections: 1, status: 'active', optionIds: ['mo-mild', 'mo-medium-spice', 'mo-hot'] },
];

const mariosModifierOptions: ModifierOption[] = [
  { id: 'mo-small', modifierGroupId: 'mg-pizza-size', name: 'Small', priceDelta: -2.00, status: 'active', pausedUntil: null },
  { id: 'mo-medium', modifierGroupId: 'mg-pizza-size', name: 'Medium', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-large', modifierGroupId: 'mg-pizza-size', name: 'Large', priceDelta: 3.00, status: 'active', pausedUntil: null },
  { id: 'mo-mushrooms', modifierGroupId: 'mg-toppings', name: 'Mushrooms', priceDelta: 1.50, status: 'active', pausedUntil: null },
  { id: 'mo-olives', modifierGroupId: 'mg-toppings', name: 'Olives', priceDelta: 1.00, status: 'active', pausedUntil: null },
  { id: 'mo-peppers', modifierGroupId: 'mg-toppings', name: 'Peppers', priceDelta: 1.00, status: 'active', pausedUntil: null },
  { id: 'mo-extra-cheese', modifierGroupId: 'mg-toppings', name: 'Extra Cheese', priceDelta: 2.00, status: 'active', pausedUntil: null },
  { id: 'mo-mild', modifierGroupId: 'mg-spice', name: 'Mild', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-medium-spice', modifierGroupId: 'mg-spice', name: 'Medium', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-hot', modifierGroupId: 'mg-spice', name: 'Hot', priceDelta: 0, status: 'active', pausedUntil: null },
];

const mariosBundles: Bundle[] = [
  { id: 'bun-lunch-combo', businessId: 'biz-marios', venueId: 'v-marios', name: 'Lunch Combo', description: 'Any pizza + any drink', price: 15.00, status: 'active', offerIds: ['o-margherita', 'o-coke'] },
];

// ─── Bloom & Co ──────────────────────────────────────────────────

const bloomBusiness: Business = { id: 'biz-bloom', name: 'Bloom & Co', verticalType: 'flower', venueIds: ['v-bloom'] };
const bloomVenue: Venue = { id: 'v-bloom', businessId: 'biz-bloom', name: 'Bloom & Co', address: '45 Garden Ave', verticalType: 'flower' };

const bloomCategories: Category[] = [
  { id: 'cat-b-bouquets', businessId: 'biz-bloom', name: 'Bouquets', sortOrder: 0 },
  { id: 'cat-b-stems', businessId: 'biz-bloom', name: 'Single Stems', sortOrder: 1 },
  { id: 'cat-b-plants', businessId: 'biz-bloom', name: 'Plants', sortOrder: 2 },
  { id: 'cat-b-arrangements', businessId: 'biz-bloom', name: 'Arrangements', sortOrder: 3 },
];

const bloomProducts: Product[] = [
  { id: 'p-red-roses', businessId: 'biz-bloom', title: 'Red Roses Bouquet', description: 'A dozen fresh red roses', image: '/placeholder.svg', categoryId: 'cat-b-bouquets', modifierGroupIds: [] },
  { id: 'p-sunflower', businessId: 'biz-bloom', title: 'Sunflower Bunch', description: 'Bright yellow sunflowers', image: '/placeholder.svg', categoryId: 'cat-b-bouquets', modifierGroupIds: [] },
  { id: 'p-lily', businessId: 'biz-bloom', title: 'White Lily Single', description: 'Single white lily stem', image: '/placeholder.svg', categoryId: 'cat-b-stems', modifierGroupIds: [] },
  { id: 'p-orchid', businessId: 'biz-bloom', title: 'Orchid Plant', description: 'Phalaenopsis orchid in ceramic pot', image: '/placeholder.svg', categoryId: 'cat-b-plants', modifierGroupIds: [] },
  { id: 'p-succulent', businessId: 'biz-bloom', title: 'Succulent Trio', description: 'Three mini succulents in a tray', image: '/placeholder.svg', categoryId: 'cat-b-plants', modifierGroupIds: [] },
  { id: 'p-wedding', businessId: 'biz-bloom', title: 'Wedding Table Arrangement', description: 'Elegant centerpiece arrangement', image: '/placeholder.svg', categoryId: 'cat-b-arrangements', modifierGroupIds: [] },
  { id: 'p-birthday', businessId: 'biz-bloom', title: 'Birthday Bouquet', description: 'Colorful mixed flower bouquet', image: '/placeholder.svg', categoryId: 'cat-b-bouquets', modifierGroupIds: [] },
];

const bloomOffers: Offer[] = [
  { id: 'o-red-roses', venueId: 'v-bloom', productId: 'p-red-roses', price: 29.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-sunflower', venueId: 'v-bloom', productId: 'p-sunflower', price: 19.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-lily', venueId: 'v-bloom', productId: 'p-lily', price: 4.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-orchid', venueId: 'v-bloom', productId: 'p-orchid', price: 34.99, currency: '$', status: 'paused', pausedUntil: '7 days', availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-succulent', venueId: 'v-bloom', productId: 'p-succulent', price: 22.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-wedding', venueId: 'v-bloom', productId: 'p-wedding', price: 89.99, currency: '$', status: 'inactive', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-birthday', venueId: 'v-bloom', productId: 'p-birthday', price: 39.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
];

// ─── Burger Chain ────────────────────────────────────────────────

const burgerBusiness: Business = { id: 'biz-burger', name: 'Burger Chain Inc.', verticalType: 'restaurant', venueIds: ['v-downtown', 'v-airport', 'v-mall'] };
const burgerVenues: Venue[] = [
  { id: 'v-downtown', businessId: 'biz-burger', name: 'Downtown', address: '101 Center Blvd', verticalType: 'restaurant' },
  { id: 'v-airport', businessId: 'biz-burger', name: 'Airport', address: 'Terminal 2, Gate B', verticalType: 'restaurant' },
  { id: 'v-mall', businessId: 'biz-burger', name: 'Mall', address: 'Westfield Shopping, Food Court', verticalType: 'restaurant' },
];

const burgerCategories: Category[] = [
  { id: 'cat-bg-burgers', businessId: 'biz-burger', name: 'Burgers', sortOrder: 0 },
  { id: 'cat-bg-sides', businessId: 'biz-burger', name: 'Sides', sortOrder: 1 },
  { id: 'cat-bg-drinks', businessId: 'biz-burger', name: 'Drinks', sortOrder: 2 },
];

const burgerProducts: Product[] = [
  { id: 'p-classic-burger', businessId: 'biz-burger', title: 'Classic Burger', description: 'Beef patty, lettuce, tomato, pickles', image: '/placeholder.svg', categoryId: 'cat-bg-burgers', modifierGroupIds: ['mg-bg-doneness', 'mg-bg-addons'] },
  { id: 'p-cheese-burger', businessId: 'biz-burger', title: 'Cheese Burger', description: 'Classic burger with aged cheddar', image: '/placeholder.svg', categoryId: 'cat-bg-burgers', modifierGroupIds: ['mg-bg-doneness', 'mg-bg-addons'] },
  { id: 'p-veggie-wrap', businessId: 'biz-burger', title: 'Veggie Wrap', description: 'Grilled vegetables in a flour tortilla', image: '/placeholder.svg', categoryId: 'cat-bg-burgers', modifierGroupIds: [] },
  { id: 'p-chicken-tenders', businessId: 'biz-burger', title: 'Chicken Tenders', description: 'Crispy chicken strips with dipping sauce', image: '/placeholder.svg', categoryId: 'cat-bg-sides', modifierGroupIds: [] },
  { id: 'p-fries', businessId: 'biz-burger', title: 'Fries (Regular)', description: 'Golden French fries', image: '/placeholder.svg', categoryId: 'cat-bg-sides', modifierGroupIds: [] },
  { id: 'p-milkshake', businessId: 'biz-burger', title: 'Milkshake', description: 'Thick shake, choice of flavor', image: '/placeholder.svg', categoryId: 'cat-bg-drinks', modifierGroupIds: [] },
];

const burgerOffers: Offer[] = [
  // Downtown
  { id: 'o-bg-cb-dt', venueId: 'v-downtown', productId: 'p-classic-burger', price: 12.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-chb-dt', venueId: 'v-downtown', productId: 'p-cheese-burger', price: 13.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-vw-dt', venueId: 'v-downtown', productId: 'p-veggie-wrap', price: 10.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-ct-dt', venueId: 'v-downtown', productId: 'p-chicken-tenders', price: 9.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-fr-dt', venueId: 'v-downtown', productId: 'p-fries', price: 4.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-ms-dt', venueId: 'v-downtown', productId: 'p-milkshake', price: 6.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  // Airport (overridden prices)
  { id: 'o-bg-cb-ap', venueId: 'v-airport', productId: 'p-classic-burger', price: 14.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: true, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-chb-ap', venueId: 'v-airport', productId: 'p-cheese-burger', price: 16.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: true, source: 'menu', sourceId: 'menu-bg-allday' },
  // Veggie Wrap NOT sold at airport
  { id: 'o-bg-ct-ap', venueId: 'v-airport', productId: 'p-chicken-tenders', price: 11.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: true, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-fr-ap', venueId: 'v-airport', productId: 'p-fries', price: 5.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: true, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-ms-ap', venueId: 'v-airport', productId: 'p-milkshake', price: 7.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: true, source: 'menu', sourceId: 'menu-bg-allday' },
  // Mall
  { id: 'o-bg-cb-ml', venueId: 'v-mall', productId: 'p-classic-burger', price: 12.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-chb-ml', venueId: 'v-mall', productId: 'p-cheese-burger', price: 13.50, currency: '$', status: 'paused', pausedUntil: '24 hours', availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-vw-ml', venueId: 'v-mall', productId: 'p-veggie-wrap', price: 10.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-ct-ml', venueId: 'v-mall', productId: 'p-chicken-tenders', price: 9.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-fr-ml', venueId: 'v-mall', productId: 'p-fries', price: 4.00, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
  { id: 'o-bg-ms-ml', venueId: 'v-mall', productId: 'p-milkshake', price: 6.00, currency: '$', status: 'out_of_stock', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-bg-allday' },
];

const burgerMenus: Menu[] = [
  { id: 'menu-bg-allday', venueId: null, businessId: 'biz-burger', name: 'All Day Menu', hours: 'Mon–Sun 10:00–22:00', status: 'active', isShared: true, sharedToVenueIds: ['v-downtown', 'v-airport', 'v-mall'], categoryIds: ['mc-bg-burgers', 'mc-bg-sides', 'mc-bg-drinks'] },
  { id: 'menu-bg-happy', venueId: 'v-downtown', businessId: 'biz-burger', name: 'Happy Hour Specials', hours: 'Mon–Fri 16:00–18:00', status: 'active', isShared: false, sharedToVenueIds: [], categoryIds: ['mc-bg-happy-deals'] },
];

const burgerMenuCategories: MenuCategory[] = [
  { id: 'mc-bg-burgers', menuId: 'menu-bg-allday', name: 'Burgers', sortOrder: 0, menuItemIds: ['mi-bg-cb', 'mi-bg-chb', 'mi-bg-vw'] },
  { id: 'mc-bg-sides', menuId: 'menu-bg-allday', name: 'Sides', sortOrder: 1, menuItemIds: ['mi-bg-ct', 'mi-bg-fr'] },
  { id: 'mc-bg-drinks', menuId: 'menu-bg-allday', name: 'Drinks', sortOrder: 2, menuItemIds: ['mi-bg-ms'] },
  { id: 'mc-bg-happy-deals', menuId: 'menu-bg-happy', name: 'Happy Hour Deals', sortOrder: 0, menuItemIds: [] },
];

const burgerMenuItems: MenuItem[] = [
  { id: 'mi-bg-cb', menuCategoryId: 'mc-bg-burgers', offerId: 'o-bg-cb-dt', productId: 'p-classic-burger', sortOrder: 0 },
  { id: 'mi-bg-chb', menuCategoryId: 'mc-bg-burgers', offerId: 'o-bg-chb-dt', productId: 'p-cheese-burger', sortOrder: 1 },
  { id: 'mi-bg-vw', menuCategoryId: 'mc-bg-burgers', offerId: 'o-bg-vw-dt', productId: 'p-veggie-wrap', sortOrder: 2 },
  { id: 'mi-bg-ct', menuCategoryId: 'mc-bg-sides', offerId: 'o-bg-ct-dt', productId: 'p-chicken-tenders', sortOrder: 0 },
  { id: 'mi-bg-fr', menuCategoryId: 'mc-bg-sides', offerId: 'o-bg-fr-dt', productId: 'p-fries', sortOrder: 1 },
  { id: 'mi-bg-ms', menuCategoryId: 'mc-bg-drinks', offerId: 'o-bg-ms-dt', productId: 'p-milkshake', sortOrder: 0 },
];

const burgerModifierGroups: ModifierGroup[] = [
  { id: 'mg-bg-doneness', businessId: 'biz-burger', name: 'Burger Doneness', required: true, minSelections: 1, maxSelections: 1, status: 'active', optionIds: ['mo-bg-rare', 'mo-bg-medium', 'mo-bg-well'] },
  { id: 'mg-bg-addons', businessId: 'biz-burger', name: 'Add-ons', required: false, minSelections: 0, maxSelections: 3, status: 'active', optionIds: ['mo-bg-bacon', 'mo-bg-avocado', 'mo-bg-patty'] },
];

const burgerModifierOptions: ModifierOption[] = [
  { id: 'mo-bg-rare', modifierGroupId: 'mg-bg-doneness', name: 'Rare', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-bg-medium', modifierGroupId: 'mg-bg-doneness', name: 'Medium', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-bg-well', modifierGroupId: 'mg-bg-doneness', name: 'Well Done', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-bg-bacon', modifierGroupId: 'mg-bg-addons', name: 'Bacon', priceDelta: 2.00, status: 'active', pausedUntil: null },
  { id: 'mo-bg-avocado', modifierGroupId: 'mg-bg-addons', name: 'Avocado', priceDelta: 1.50, status: 'active', pausedUntil: null },
  { id: 'mo-bg-patty', modifierGroupId: 'mg-bg-addons', name: 'Extra Patty', priceDelta: 3.00, status: 'active', pausedUntil: null },
];

// ─── QuickStop Convenience ───────────────────────────────────────

const quickstopBusiness: Business = { id: 'biz-qs', name: 'QuickStop Stores', verticalType: 'hybrid', venueIds: ['v-qs-main', 'v-qs-kiosk'] };
const quickstopVenues: Venue[] = [
  { id: 'v-qs-main', businessId: 'biz-qs', name: 'Main St', address: '200 Main Street', verticalType: 'hybrid' },
  { id: 'v-qs-kiosk', businessId: 'biz-qs', name: 'Station Kiosk', address: 'Central Station', verticalType: 'hybrid' },
];

const quickstopCategories: Category[] = [
  { id: 'cat-qs-beverages', businessId: 'biz-qs', name: 'Beverages', sortOrder: 0 },
  { id: 'cat-qs-snacks', businessId: 'biz-qs', name: 'Snacks', sortOrder: 1 },
  { id: 'cat-qs-health', businessId: 'biz-qs', name: 'Health', sortOrder: 2 },
  { id: 'cat-qs-electronics', businessId: 'biz-qs', name: 'Electronics', sortOrder: 3 },
  { id: 'cat-qs-deli', businessId: 'biz-qs', name: 'Deli', sortOrder: 4 },
];

const quickstopProducts: Product[] = [
  { id: 'p-qs-coke', businessId: 'biz-qs', title: 'Coca-Cola 330ml', description: 'Classic Coca-Cola can', image: '/placeholder.svg', categoryId: 'cat-qs-beverages', modifierGroupIds: [] },
  { id: 'p-qs-nuts', businessId: 'biz-qs', title: 'Mixed Nuts 200g', description: 'Premium mixed nut blend', image: '/placeholder.svg', categoryId: 'cat-qs-snacks', modifierGroupIds: [] },
  { id: 'p-qs-juice', businessId: 'biz-qs', title: 'Organic Juice 500ml', description: 'Cold-pressed organic juice', image: '/placeholder.svg', categoryId: 'cat-qs-beverages', modifierGroupIds: [] },
  { id: 'p-qs-aspirin', businessId: 'biz-qs', title: 'Aspirin 20-pack', description: 'Pain relief tablets', image: '/placeholder.svg', categoryId: 'cat-qs-health', modifierGroupIds: [] },
  { id: 'p-qs-charger', businessId: 'biz-qs', title: 'Phone Charger Cable', description: 'USB-C charging cable 1m', image: '/placeholder.svg', categoryId: 'cat-qs-electronics', modifierGroupIds: [] },
  { id: 'p-qs-usbc', businessId: 'biz-qs', title: 'USB-C Adapter', description: 'USB-C to USB-A adapter', image: '/placeholder.svg', categoryId: 'cat-qs-electronics', modifierGroupIds: [] },
  { id: 'p-qs-turkey', businessId: 'biz-qs', title: 'Turkey Club Sandwich', description: 'Turkey, bacon, lettuce, tomato on toast', image: '/placeholder.svg', categoryId: 'cat-qs-deli', modifierGroupIds: ['mg-qs-bread'] },
  { id: 'p-qs-blt', businessId: 'biz-qs', title: 'BLT', description: 'Bacon, lettuce, tomato sandwich', image: '/placeholder.svg', categoryId: 'cat-qs-deli', modifierGroupIds: ['mg-qs-bread'] },
  { id: 'p-qs-caesar', businessId: 'biz-qs', title: 'Caesar Salad', description: 'Romaine, parmesan, croutons, caesar dressing', image: '/placeholder.svg', categoryId: 'cat-qs-deli', modifierGroupIds: ['mg-qs-dressing'] },
];

const quickstopOffers: Offer[] = [
  // Main St — all items
  { id: 'o-qs-coke-m', venueId: 'v-qs-main', productId: 'p-qs-coke', price: 2.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
  { id: 'o-qs-nuts-m', venueId: 'v-qs-main', productId: 'p-qs-nuts', price: 4.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
  { id: 'o-qs-juice-m', venueId: 'v-qs-main', productId: 'p-qs-juice', price: 3.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'direct', sourceId: null },
  { id: 'o-qs-aspirin-m', venueId: 'v-qs-main', productId: 'p-qs-aspirin', price: 5.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
  { id: 'o-qs-charger-m', venueId: 'v-qs-main', productId: 'p-qs-charger', price: 12.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-tech' },
  { id: 'o-qs-usbc-m', venueId: 'v-qs-main', productId: 'p-qs-usbc', price: 9.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-tech' },
  { id: 'o-qs-turkey-m', venueId: 'v-qs-main', productId: 'p-qs-turkey', price: 8.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-qs-deli' },
  { id: 'o-qs-blt-m', venueId: 'v-qs-main', productId: 'p-qs-blt', price: 7.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-qs-deli' },
  { id: 'o-qs-caesar-m', venueId: 'v-qs-main', productId: 'p-qs-caesar', price: 9.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'menu', sourceId: 'menu-qs-deli' },
  // Station Kiosk — essentials only
  { id: 'o-qs-coke-k', venueId: 'v-qs-kiosk', productId: 'p-qs-coke', price: 2.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
  { id: 'o-qs-nuts-k', venueId: 'v-qs-kiosk', productId: 'p-qs-nuts', price: 4.50, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
  { id: 'o-qs-aspirin-k', venueId: 'v-qs-kiosk', productId: 'p-qs-aspirin', price: 5.99, currency: '$', status: 'active', pausedUntil: null, availabilitySchedule: null, priceOverridden: false, source: 'collection', sourceId: 'col-essentials' },
];

const quickstopMenus: Menu[] = [
  { id: 'menu-qs-deli', venueId: null, businessId: 'biz-qs', name: 'Deli Menu', hours: 'Mon–Sun 07:00–20:00', status: 'active', isShared: true, sharedToVenueIds: ['v-qs-main'], categoryIds: ['mc-qs-sandwiches', 'mc-qs-salads'] },
];

const quickstopMenuCategories: MenuCategory[] = [
  { id: 'mc-qs-sandwiches', menuId: 'menu-qs-deli', name: 'Sandwiches', sortOrder: 0, menuItemIds: ['mi-qs-turkey', 'mi-qs-blt'] },
  { id: 'mc-qs-salads', menuId: 'menu-qs-deli', name: 'Salads', sortOrder: 1, menuItemIds: ['mi-qs-caesar'] },
];

const quickstopMenuItems: MenuItem[] = [
  { id: 'mi-qs-turkey', menuCategoryId: 'mc-qs-sandwiches', offerId: 'o-qs-turkey-m', productId: 'p-qs-turkey', sortOrder: 0 },
  { id: 'mi-qs-blt', menuCategoryId: 'mc-qs-sandwiches', offerId: 'o-qs-blt-m', productId: 'p-qs-blt', sortOrder: 1 },
  { id: 'mi-qs-caesar', menuCategoryId: 'mc-qs-salads', offerId: 'o-qs-caesar-m', productId: 'p-qs-caesar', sortOrder: 0 },
];

const quickstopModifierGroups: ModifierGroup[] = [
  { id: 'mg-qs-bread', businessId: 'biz-qs', name: 'Bread Type', required: true, minSelections: 1, maxSelections: 1, status: 'active', optionIds: ['mo-qs-white', 'mo-qs-wheat', 'mo-qs-sourdough'] },
  { id: 'mg-qs-dressing', businessId: 'biz-qs', name: 'Salad Dressing', required: true, minSelections: 1, maxSelections: 1, status: 'active', optionIds: ['mo-qs-ranch', 'mo-qs-vinaigrette', 'mo-qs-none'] },
];

const quickstopModifierOptions: ModifierOption[] = [
  { id: 'mo-qs-white', modifierGroupId: 'mg-qs-bread', name: 'White', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-qs-wheat', modifierGroupId: 'mg-qs-bread', name: 'Wheat', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-qs-sourdough', modifierGroupId: 'mg-qs-bread', name: 'Sourdough', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-qs-ranch', modifierGroupId: 'mg-qs-dressing', name: 'Ranch', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-qs-vinaigrette', modifierGroupId: 'mg-qs-dressing', name: 'Vinaigrette', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-qs-none', modifierGroupId: 'mg-qs-dressing', name: 'None', priceDelta: 0, status: 'active', pausedUntil: null },
];

const quickstopCollections: Collection[] = [
  { id: 'col-essentials', businessId: 'biz-qs', name: 'Essentials', status: 'active', productIds: ['p-qs-coke', 'p-qs-nuts', 'p-qs-aspirin'], sharedToVenueIds: ['v-qs-main', 'v-qs-kiosk'] },
  { id: 'col-tech', businessId: 'biz-qs', name: 'Tech Accessories', status: 'active', productIds: ['p-qs-charger', 'p-qs-usbc'], sharedToVenueIds: ['v-qs-main'] },
];

// ─── FreshMart Groceries ────────────────────────────────────────

const freshBusiness: Business = { id: 'biz-fm', name: 'FreshMart Groceries', verticalType: 'grocery', venueIds: ['v-fm-city', 'v-fm-west', 'v-fm-north', 'v-fm-harbor', 'v-fm-uni', 'v-fm-east', 'v-fm-south'] };
const freshVenues: Venue[] = [
  { id: 'v-fm-city', businessId: 'biz-fm', name: 'City Center', address: '1 Main Plaza', verticalType: 'grocery' },
  { id: 'v-fm-west', businessId: 'biz-fm', name: 'Westside Mall', address: '88 West Ave', verticalType: 'grocery' },
  { id: 'v-fm-north', businessId: 'biz-fm', name: 'North End', address: '340 Park Road', verticalType: 'grocery' },
  { id: 'v-fm-harbor', businessId: 'biz-fm', name: 'Harbor District', address: '5 Dockside Lane', verticalType: 'grocery' },
  { id: 'v-fm-uni', businessId: 'biz-fm', name: 'University Campus', address: '12 College St', verticalType: 'grocery' },
  { id: 'v-fm-east', businessId: 'biz-fm', name: 'Eastgate Plaza', address: '200 East Blvd', verticalType: 'grocery' },
  { id: 'v-fm-south', businessId: 'biz-fm', name: 'South Park', address: '77 South Ring', verticalType: 'grocery' },
];

const freshCategories: Category[] = [
  { id: 'cat-fm-produce', businessId: 'biz-fm', name: 'Fruits & Vegetables', sortOrder: 0 },
  { id: 'cat-fm-dairy', businessId: 'biz-fm', name: 'Dairy & Eggs', sortOrder: 1 },
  { id: 'cat-fm-bakery', businessId: 'biz-fm', name: 'Bakery', sortOrder: 2 },
  { id: 'cat-fm-meat', businessId: 'biz-fm', name: 'Meat & Seafood', sortOrder: 3 },
  { id: 'cat-fm-bev', businessId: 'biz-fm', name: 'Beverages', sortOrder: 4 },
  { id: 'cat-fm-snacks', businessId: 'biz-fm', name: 'Snacks', sortOrder: 5 },
  { id: 'cat-fm-house', businessId: 'biz-fm', name: 'Household', sortOrder: 6 },
  { id: 'cat-fm-care', businessId: 'biz-fm', name: 'Personal Care', sortOrder: 7 },
];

const freshProducts: Product[] = [
  // Fruits & Vegetables
  { id: 'p-fm-bananas', businessId: 'biz-fm', title: 'Organic Bananas', description: 'Fair-trade organic bananas, bunch', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  { id: 'p-fm-avocado', businessId: 'biz-fm', title: 'Avocado Pack (3)', description: 'Ripe Hass avocados', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  { id: 'p-fm-spinach', businessId: 'biz-fm', title: 'Baby Spinach 200g', description: 'Pre-washed baby spinach', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  { id: 'p-fm-tomatoes', businessId: 'biz-fm', title: 'Cherry Tomatoes 250g', description: 'Vine-ripened cherry tomatoes', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  { id: 'p-fm-strawberries', businessId: 'biz-fm', title: 'Strawberries 400g', description: 'Seasonal fresh strawberries', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  { id: 'p-fm-broccoli', businessId: 'biz-fm', title: 'Broccoli Head', description: 'Fresh green broccoli', image: '/placeholder.svg', categoryId: 'cat-fm-produce', modifierGroupIds: [] },
  // Dairy & Eggs
  { id: 'p-fm-milk', businessId: 'biz-fm', title: 'Whole Milk 1L', description: 'Full-fat pasteurized milk', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  { id: 'p-fm-eggs', businessId: 'biz-fm', title: 'Free-Range Eggs (12)', description: 'Large free-range eggs', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  { id: 'p-fm-yogurt', businessId: 'biz-fm', title: 'Greek Yogurt 500g', description: 'Thick strained Greek yogurt', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  { id: 'p-fm-cheddar', businessId: 'biz-fm', title: 'Cheddar Cheese Block 400g', description: 'Aged cheddar cheese', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  { id: 'p-fm-butter', businessId: 'biz-fm', title: 'Butter 250g', description: 'Unsalted premium butter', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  { id: 'p-fm-oatmilk', businessId: 'biz-fm', title: 'Oat Milk 1L', description: 'Barista-edition oat milk', image: '/placeholder.svg', categoryId: 'cat-fm-dairy', modifierGroupIds: [] },
  // Bakery
  { id: 'p-fm-sourdough', businessId: 'biz-fm', title: 'Sourdough Loaf', description: 'Artisan sourdough bread', image: '/placeholder.svg', categoryId: 'cat-fm-bakery', modifierGroupIds: [] },
  { id: 'p-fm-croissants', businessId: 'biz-fm', title: 'Croissants (4)', description: 'Butter croissants', image: '/placeholder.svg', categoryId: 'cat-fm-bakery', modifierGroupIds: [] },
  { id: 'p-fm-multigrain', businessId: 'biz-fm', title: 'Multigrain Bread', description: 'Whole grain sliced bread', image: '/placeholder.svg', categoryId: 'cat-fm-bakery', modifierGroupIds: [] },
  { id: 'p-fm-ciabatta', businessId: 'biz-fm', title: 'Ciabatta Rolls (6)', description: 'Italian-style ciabatta rolls', image: '/placeholder.svg', categoryId: 'cat-fm-bakery', modifierGroupIds: [] },
  // Meat & Seafood
  { id: 'p-fm-chicken', businessId: 'biz-fm', title: 'Chicken Breast 500g', description: 'Skinless chicken breast fillets', image: '/placeholder.svg', categoryId: 'cat-fm-meat', modifierGroupIds: [] },
  { id: 'p-fm-salmon', businessId: 'biz-fm', title: 'Salmon Fillet 300g', description: 'Fresh Atlantic salmon', image: '/placeholder.svg', categoryId: 'cat-fm-meat', modifierGroupIds: [] },
  { id: 'p-fm-ground-beef', businessId: 'biz-fm', title: 'Ground Beef 500g', description: 'Lean ground beef', image: '/placeholder.svg', categoryId: 'cat-fm-meat', modifierGroupIds: [] },
  { id: 'p-fm-pork', businessId: 'biz-fm', title: 'Pork Chops (2)', description: 'Boneless pork loin chops', image: '/placeholder.svg', categoryId: 'cat-fm-meat', modifierGroupIds: [] },
  { id: 'p-fm-shrimp', businessId: 'biz-fm', title: 'Shrimp 400g', description: 'Peeled and deveined shrimp', image: '/placeholder.svg', categoryId: 'cat-fm-meat', modifierGroupIds: [] },
  // Beverages
  { id: 'p-fm-water', businessId: 'biz-fm', title: 'Sparkling Water 6-pack', description: 'Natural sparkling mineral water', image: '/placeholder.svg', categoryId: 'cat-fm-bev', modifierGroupIds: [] },
  { id: 'p-fm-oj', businessId: 'biz-fm', title: 'Orange Juice 1L', description: 'Freshly squeezed orange juice', image: '/placeholder.svg', categoryId: 'cat-fm-bev', modifierGroupIds: [] },
  { id: 'p-fm-ipa', businessId: 'biz-fm', title: 'Craft IPA 330ml', description: 'Local brewery IPA', image: '/placeholder.svg', categoryId: 'cat-fm-bev', modifierGroupIds: [] },
  { id: 'p-fm-kombucha', businessId: 'biz-fm', title: 'Kombucha Ginger 330ml', description: 'Organic ginger kombucha', image: '/placeholder.svg', categoryId: 'cat-fm-bev', modifierGroupIds: [] },
  { id: 'p-fm-coffee', businessId: 'biz-fm', title: 'Espresso Beans 250g', description: 'Single-origin espresso beans', image: '/placeholder.svg', categoryId: 'cat-fm-bev', modifierGroupIds: [] },
  // Snacks
  { id: 'p-fm-chocolate', businessId: 'biz-fm', title: 'Dark Chocolate Bar 85%', description: 'Premium dark chocolate 100g', image: '/placeholder.svg', categoryId: 'cat-fm-snacks', modifierGroupIds: [] },
  { id: 'p-fm-chips', businessId: 'biz-fm', title: 'Potato Chips Sea Salt', description: 'Kettle-cooked chips 150g', image: '/placeholder.svg', categoryId: 'cat-fm-snacks', modifierGroupIds: [] },
  { id: 'p-fm-trail', businessId: 'biz-fm', title: 'Trail Mix 300g', description: 'Nuts, seeds, and dried fruit', image: '/placeholder.svg', categoryId: 'cat-fm-snacks', modifierGroupIds: [] },
  { id: 'p-fm-granola', businessId: 'biz-fm', title: 'Granola Bars (6)', description: 'Oat and honey granola bars', image: '/placeholder.svg', categoryId: 'cat-fm-snacks', modifierGroupIds: [] },
  // Household
  { id: 'p-fm-cleaner', businessId: 'biz-fm', title: 'All-Purpose Cleaner 750ml', description: 'Eco-friendly surface cleaner', image: '/placeholder.svg', categoryId: 'cat-fm-house', modifierGroupIds: [] },
  { id: 'p-fm-dish', businessId: 'biz-fm', title: 'Dish Soap 500ml', description: 'Concentrated dish soap', image: '/placeholder.svg', categoryId: 'cat-fm-house', modifierGroupIds: [] },
  { id: 'p-fm-towels', businessId: 'biz-fm', title: 'Paper Towels (2-pack)', description: 'Absorbent kitchen towels', image: '/placeholder.svg', categoryId: 'cat-fm-house', modifierGroupIds: [] },
  { id: 'p-fm-detergent', businessId: 'biz-fm', title: 'Laundry Pods (30)', description: 'Concentrated laundry detergent pods', image: '/placeholder.svg', categoryId: 'cat-fm-house', modifierGroupIds: [] },
  // Personal Care
  { id: 'p-fm-handsoap', businessId: 'biz-fm', title: 'Hand Soap 300ml', description: 'Moisturizing hand soap', image: '/placeholder.svg', categoryId: 'cat-fm-care', modifierGroupIds: [] },
  { id: 'p-fm-toothpaste', businessId: 'biz-fm', title: 'Toothpaste 75ml', description: 'Fluoride whitening toothpaste', image: '/placeholder.svg', categoryId: 'cat-fm-care', modifierGroupIds: [] },
  { id: 'p-fm-shampoo', businessId: 'biz-fm', title: 'Shampoo 400ml', description: 'Daily care shampoo', image: '/placeholder.svg', categoryId: 'cat-fm-care', modifierGroupIds: [] },
  { id: 'p-fm-deodorant', businessId: 'biz-fm', title: 'Deodorant Roll-on', description: '48-hour protection', image: '/placeholder.svg', categoryId: 'cat-fm-care', modifierGroupIds: [] },
];

// Helper to create offers across multiple venues
const fmVenueIds = ['v-fm-city', 'v-fm-west', 'v-fm-north', 'v-fm-harbor', 'v-fm-uni', 'v-fm-east', 'v-fm-south'];
const fmVenueSuffix = ['ci', 'we', 'no', 'ha', 'un', 'ea', 'so'];

function fmOffer(productId: string, venueIdx: number, price: number, overrides?: Partial<Offer>): Offer {
  const pid = productId.replace('p-fm-', '');
  return {
    id: `o-fm-${pid}-${fmVenueSuffix[venueIdx]}`,
    venueId: fmVenueIds[venueIdx],
    productId,
    price,
    currency: '€',
    status: 'active',
    pausedUntil: null,
    availabilitySchedule: null,
    priceOverridden: false,
    source: 'collection',
    sourceId: null,
    ...overrides,
  };
}

const freshOffers: Offer[] = [
  // ── Core products: all 7 venues ──
  // Organic Bananas (€1.99 everywhere, except City Center €2.29)
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-bananas', i, i === 0 ? 2.29 : 1.99, i === 0 ? { priceOverridden: true, sourceId: 'col-fm-core' } : { sourceId: 'col-fm-core' })),
  // Whole Milk
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-milk', i, 1.49, { sourceId: 'col-fm-core' })),
  // Free-Range Eggs
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-eggs', i, 3.99, { sourceId: 'col-fm-core' })),
  // Multigrain Bread
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-multigrain', i, 2.49, { sourceId: 'col-fm-core' })),
  // Chicken Breast
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-chicken', i, 6.99, { sourceId: 'col-fm-core' })),
  // Sparkling Water
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-water', i, 4.49, { sourceId: 'col-fm-core' })),
  // Butter
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-butter', i, 2.99, { sourceId: 'col-fm-core' })),
  // Paper Towels
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-towels', i, 3.49, { sourceId: 'col-fm-core' })),
  // Potato Chips
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-chips', i, 2.99, { sourceId: 'col-fm-core' })),
  // Hand Soap
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-handsoap', i, 2.49, { sourceId: 'col-fm-core' })),
  // Ground Beef
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-ground-beef', i, 7.49, { sourceId: 'col-fm-core' })),
  // Toothpaste
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-toothpaste', i, 3.29, { sourceId: 'col-fm-core' })),
  // OJ
  ...fmVenueIds.map((_, i) => fmOffer('p-fm-oj', i, 3.99, { sourceId: 'col-fm-core' })),

  // ── Premium Selection: City Center, Westside, Harbor, Eastgate ──
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-avocado', i, 3.49, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-salmon', i, 12.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-sourdough', i, 4.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-croissants', i, 3.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-shrimp', i, 11.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-ipa', i, 3.49, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-kombucha', i, 4.29, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-coffee', i, 8.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-chocolate', i, 3.99, { sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-oatmilk', i, 2.99, { sourceId: 'col-fm-premium' })),

  // ── Everyday Essentials: North End, University, South Park ──
  ...[2, 4, 6].map(i => fmOffer('p-fm-yogurt', i, 2.79, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-cheddar', i, 4.49, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-pork', i, 5.99, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-trail', i, 4.99, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-granola', i, 3.49, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-cleaner', i, 3.99, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-dish', i, 2.49, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-detergent', i, 9.99, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-shampoo', i, 4.99, { sourceId: 'col-fm-everyday' })),
  ...[2, 4, 6].map(i => fmOffer('p-fm-deodorant', i, 3.99, { sourceId: 'col-fm-everyday' })),

  // ── Overlapping: some products in premium venues also ──
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-yogurt', i, 3.29, { priceOverridden: true, sourceId: 'col-fm-premium' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-cheddar', i, 5.49, { priceOverridden: true, sourceId: 'col-fm-premium' })),

  // ── Misc products at select venues (direct, not collection-based) ──
  ...[2, 4, 6].map(i => fmOffer('p-fm-spinach', i, 2.49, { source: 'direct' })),
  ...[0, 1, 3].map(i => fmOffer('p-fm-spinach', i, 2.99, { source: 'direct', priceOverridden: true })),
  ...[0, 1, 2, 3, 4, 5, 6].map(i => fmOffer('p-fm-tomatoes', i, 2.99, { source: 'direct' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-strawberries', i, 4.99, { source: 'direct' })),
  ...[0, 1].map(i => fmOffer('p-fm-broccoli', i, 1.99, { source: 'direct' })),
  ...[0, 1, 3, 5].map(i => fmOffer('p-fm-ciabatta', i, 3.49, { source: 'direct' })),

  // ── Varied statuses to demonstrate filtering ──
  // Strawberries out of stock at Harbor
  fmOffer('p-fm-strawberries', 3, 4.99, { status: 'out_of_stock', source: 'direct' }),
  // Salmon paused at City Center
  fmOffer('p-fm-salmon', 0, 12.99, { status: 'paused', pausedUntil: 'Tomorrow 08:00', sourceId: 'col-fm-premium' }),
  // Croissants inactive at Eastgate
  fmOffer('p-fm-croissants', 5, 3.99, { status: 'inactive', sourceId: 'col-fm-premium' }),
  // IPA paused at Westside
  fmOffer('p-fm-ipa', 1, 3.49, { status: 'paused', pausedUntil: '48 hours', sourceId: 'col-fm-premium' }),
  // Shrimp out of stock at Harbor
  fmOffer('p-fm-shrimp', 3, 11.99, { status: 'out_of_stock', sourceId: 'col-fm-premium' }),
];

// Deduplicate: the varied-status offers above override the default ones.
// Keep last occurrence (status overrides come after defaults).
const freshOffersDeduplicated = freshOffers.reduce<Offer[]>((acc, offer) => {
  const idx = acc.findIndex(o => o.id === offer.id);
  if (idx >= 0) acc[idx] = offer;
  else acc.push(offer);
  return acc;
}, []);

const freshCollections: Collection[] = [
  { id: 'col-fm-core', businessId: 'biz-fm', name: 'Core Essentials', status: 'active', productIds: ['p-fm-bananas', 'p-fm-milk', 'p-fm-eggs', 'p-fm-multigrain', 'p-fm-chicken', 'p-fm-water', 'p-fm-butter', 'p-fm-towels', 'p-fm-chips', 'p-fm-handsoap', 'p-fm-ground-beef', 'p-fm-toothpaste', 'p-fm-oj'], sharedToVenueIds: fmVenueIds },
  { id: 'col-fm-premium', businessId: 'biz-fm', name: 'Premium Selection', status: 'active', productIds: ['p-fm-avocado', 'p-fm-salmon', 'p-fm-sourdough', 'p-fm-croissants', 'p-fm-shrimp', 'p-fm-ipa', 'p-fm-kombucha', 'p-fm-coffee', 'p-fm-chocolate', 'p-fm-oatmilk', 'p-fm-yogurt', 'p-fm-cheddar'], sharedToVenueIds: ['v-fm-city', 'v-fm-west', 'v-fm-harbor', 'v-fm-east'] },
  { id: 'col-fm-everyday', businessId: 'biz-fm', name: 'Everyday Essentials', status: 'active', productIds: ['p-fm-yogurt', 'p-fm-cheddar', 'p-fm-pork', 'p-fm-trail', 'p-fm-granola', 'p-fm-cleaner', 'p-fm-dish', 'p-fm-detergent', 'p-fm-shampoo', 'p-fm-deodorant'], sharedToVenueIds: ['v-fm-north', 'v-fm-uni', 'v-fm-south'] },
];

const freshModifierGroups: ModifierGroup[] = [
  { id: 'mg-fm-weight', businessId: 'biz-fm', name: 'Pack Size', required: false, minSelections: 0, maxSelections: 1, status: 'active', optionIds: ['mo-fm-single', 'mo-fm-family'] },
];

const freshModifierOptions: ModifierOption[] = [
  { id: 'mo-fm-single', modifierGroupId: 'mg-fm-weight', name: 'Standard', priceDelta: 0, status: 'active', pausedUntil: null },
  { id: 'mo-fm-family', modifierGroupId: 'mg-fm-weight', name: 'Family Size', priceDelta: 3.00, status: 'active', pausedUntil: null },
];

// ─── Export per scenario ─────────────────────────────────────────

export interface ScenarioData {
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
}

export function getScenarioData(scenarioId: string): ScenarioData {
  switch (scenarioId) {
    case 'marios':
      return {
        businesses: [mariosBusiness],
        venues: [mariosVenue],
        products: mariosProducts,
        offers: mariosOffers,
        menus: mariosMenus,
        menuCategories: mariosMenuCategories,
        menuItems: mariosMenuItems,
        categories: mariosCategories,
        modifierGroups: mariosModifierGroups,
        modifierOptions: mariosModifierOptions,
        bundles: mariosBundles,
        collections: [],
      };
    case 'bloom':
      return {
        businesses: [bloomBusiness],
        venues: [bloomVenue],
        products: bloomProducts,
        offers: bloomOffers,
        menus: [],
        menuCategories: [],
        menuItems: [],
        categories: bloomCategories,
        modifierGroups: [],
        modifierOptions: [],
        bundles: [],
        collections: [],
      };
    case 'burger-chain':
      return {
        businesses: [burgerBusiness],
        venues: burgerVenues,
        products: burgerProducts,
        offers: burgerOffers,
        menus: burgerMenus,
        menuCategories: burgerMenuCategories,
        menuItems: burgerMenuItems,
        categories: burgerCategories,
        modifierGroups: burgerModifierGroups,
        modifierOptions: burgerModifierOptions,
        bundles: [],
        collections: [],
      };
    case 'quickstop':
      return {
        businesses: [quickstopBusiness],
        venues: quickstopVenues,
        products: quickstopProducts,
        offers: quickstopOffers,
        menus: quickstopMenus,
        menuCategories: quickstopMenuCategories,
        menuItems: quickstopMenuItems,
        categories: quickstopCategories,
        modifierGroups: quickstopModifierGroups,
        modifierOptions: quickstopModifierOptions,
        bundles: [],
        collections: quickstopCollections,
      };
    case 'freshmart':
      return {
        businesses: [freshBusiness],
        venues: freshVenues,
        products: freshProducts,
        offers: freshOffersDeduplicated,
        menus: [],
        menuCategories: [],
        menuItems: [],
        categories: freshCategories,
        modifierGroups: freshModifierGroups,
        modifierOptions: freshModifierOptions,
        bundles: [],
        collections: freshCollections,
      };
    default:
      throw new Error(`Unknown scenario: ${scenarioId}`);
  }
}
