import {
  Business, Venue, Product, Offer, Menu, MenuCategory, MenuItem,
  Category, ModifierGroup, ModifierOption, Bundle, Collection, ScenarioConfig,
} from './types';

export const SCENARIOS: ScenarioConfig[] = [
  { id: 'marios', title: "Mario's Pizzeria", subtitle: 'Single-venue restaurant', verticalType: 'restaurant', isMultiVenue: false },
  { id: 'bloom', title: 'Bloom & Co', subtitle: 'Single-venue flower shop', verticalType: 'flower', isMultiVenue: false },
  { id: 'burger-chain', title: 'Burger Chain', subtitle: 'Multi-venue restaurant (3 locations)', verticalType: 'restaurant', isMultiVenue: true },
  { id: 'quickstop', title: 'QuickStop Convenience', subtitle: 'Hybrid (grocery + deli menu, 2 locations)', verticalType: 'hybrid', isMultiVenue: true },
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
    default:
      throw new Error(`Unknown scenario: ${scenarioId}`);
  }
}
