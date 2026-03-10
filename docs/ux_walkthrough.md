# UX Walkthrough — As the Merchant

> Plain-language walkthrough of the complete experience for each merchant type.
> Grayscale wireframe prototype context. References `solution_proposal.md` for page details.

---

## 1. Single-Venue Restaurant: Mario's Pizzeria

### What you see first

You open the app. In the left sidebar of the larger dashboard, you click into the product management tool. You have one restaurant, so the system skips any business-level view and drops you straight into your workspace. There's no venue picker, no business dashboard — just your stuff.

Across the top you see horizontal tabs: **Menus** | **All Items** | **Modifiers** | **Bundles**. "Menus" is selected by default because you're a restaurant — and you're already inside your **Lunch Menu**, because it's noon and the system opened the currently active menu for you. No list of menus to click through. You're in the working surface immediately.

At the top of the menu detail there's a **Menu Switcher** dropdown showing "Lunch Menu" (current). Click it and you see your other menus, plus options to "Manage all menus" and "Create Menu".

### Building a menu from scratch

You open the **Menu Switcher** and click **Create Menu**. A small modal asks for the menu name and hours. You type "Weekend Brunch", set hours Sat–Sun 10:00–14:00, and save. You land on the new menu's detail page — empty, ready to build.

You click **Add Category**, type "Eggs & Omelettes", hit Enter. The category appears as a section header. You add another: "Sweet". Two empty sections.

Inside "Eggs & Omelettes" you click **Add Item**. A panel slides in from the right covering about a third of the screen. You fill in "Eggs Benedict", €12.50, a short description, upload a photo. The category is pre-selected. You hit **Save**, the panel closes, and the item is right there in the table. You repeat this a few more times.

Every item you create is immediately sellable during the menu's hours. You never see "products" or "offers" — you just create items in your menu.

### Managing your menu day-to-day

Your Lunch Menu is already open (the system chose it because it's currently active). You see a clean table grouped by category: Starters, Mains, Drinks. Each row shows thumbnail, name, price, and status badge.

You notice Garlic Bread is showing "Paused · until 15:00" with a dimmed row — you paused it this morning because you ran out. The rest are "Active".

To rearrange, you drag the "Drinks" category header above "Mains" — done, order changed instantly. You drag "Bruschetta" above "Spring Rolls" within Starters — item order updated.

### Editing an item

You click "Margherita Pizza". The slide-over panel opens showing everything: name, description, photo, price, category, availability, status, and attached modifiers. You change the price from €14.00 to €14.50, save, and the table reflects the new price immediately.

### Adding modifiers (customization options)

Still in the Margherita Pizza editor, you scroll to the **Modifiers** section. "Pizza Size" (Required, pick 1) and "Extra Toppings" (Optional, pick 0–4) are already attached.

You want to add a new modifier. You click **Add Modifier Group**, and a picker shows your existing groups plus "Create New Group". You pick "Create New Group". A form appears: group name "Crust Type", required, pick 1. Three options: "Classic" ($0), "Thin" ($0), "Stuffed" (+$2.00). Save. It's attached to the pizza. Save the item, and the modifier indicator on the row now shows "3 groups".

To manage all modifiers in one place, click the **Modifiers** tab. You see every group, how many options each has, which items use them. Edit from here, and changes apply everywhere the group is used.

### Pausing an item when you run out

Middle of lunch service — you're out of Spring Rolls. On the Menu Detail table, you click the "Active" badge next to Spring Rolls. A modal pops up: how long to pause? 1 hour, 2 hours, rest of today, 24 hours, and so on. You pick "Rest of today". Badge changes to "Paused · until 23:59", row dims. Customers can't order it.

Your delivery arrives later. Click the "Paused" badge → **Resume Now**. Back to Active.

Same concept works for modifier options. Run out of olives? Go into Extra Toppings and pause just "Olives".

### Switching between menus

While working in your Lunch Menu, you open the **Menu Switcher** dropdown at the top. It lists: **Lunch Menu** (current), **Dinner Menu**, **Weekend Brunch** — plus "Manage all menus" and "Create Menu" at the bottom. Click "Dinner Menu" and the content swaps instantly — now you're looking at Dinner's categories and items.

Click "Manage all menus" if you want the overview: all your menus listed with their hours, status, and item counts. Useful for checking that your schedule has no gaps or for quickly auditing everything. Click any menu in the list to jump back into its detail.

**A note on overlapping menus:** Your Lunch Menu and Dinner Menu don't overlap — Lunch ends at 15:00, Dinner starts at 17:00. But if you created a "Drinks Menu" that runs all day, its items would be available alongside whichever food menu is active. And if the same item appears in two overlapping menus at different prices (say, a discounted lunch price and a regular dinner price), the consumer gets the lower price during the overlap. The system shows you a note when this situation exists so there are no surprises.

---

## 2. Single-Venue New Vertical: Bloom & Co (Flower Shop)

### What you see first

You open the product management tool and land on the **All Items** tab. The tabs across the top show: **All Items** | **Categories** | **Modifiers**. No Menus tab — you don't need one. Your business is a product catalog, not a structured menu.

The table shows all your items in a flat list: Red Roses Bouquet ($29.99, Active), Orchid Plant ($34.99, Paused · 5 days left), Wedding Table Arrangement ($89.99, Inactive), and so on. Each row has a thumbnail, name, category, price, status, and availability summary.

### Adding a new item

Click **Add Item** in the top right. The editor panel slides in. Enter "Lavender Bunch", $14.99, category "Single Stems", upload a photo, leave availability as "Always available". Save. The panel closes and the item appears in the table.

### Editing price and availability

Click "Red Roses Bouquet". The editor opens. Valentine's Day is coming, so you change the price from $29.99 to $39.99 and set availability to "Feb 1–Feb 28". Save. The table shows the updated price and "Available Feb 1–28" in the availability column.

### Pausing when out of stock

The Orchid Plant shipment is delayed. Click its "Active" status badge, pick "1 week" from the pause modal. Badge reads "Paused · 7 days". When the shipment arrives, resume it.

### Managing categories

Click the **Categories** tab. You see: Bouquets (4 items), Single Stems (2 items), Plants (3 items), Arrangements (1 item). Reorder by dragging, rename inline, add new ones. Click the item count next to "Bouquets" and it switches you to the All Items tab filtered to that category.

---

## 3. Multi-Venue Restaurant: Burger Chain

### What you see first

You manage three locations: Downtown, Airport, and Mall. When you open the product management tool, you land on the **Venues** tab — three venue cards with names, addresses, and quick stats (item count, any alerts like paused items).

The tabs across the top show your business-level options: **Venues** | **All Items** | **Menus** | **Modifiers** | **Bundles**.

### Seeing everything across venues at once

Click the **All Items** tab. This is the power view. The table shows every product in your catalog as a row with aggregated data:

| Item | Price | Status | Venues |
|---|---|---|---|
| Classic Burger | $12.00–$14.50 | Active 3/3 | 3/3 |
| Veggie Wrap | $10.00 | Active 2/3 | 2/3 |
| Milkshake | $6.00–$7.50 | Active 2/3 · 1 Out of Stock | 3/3 |

You can see at a glance: Classic Burger has price variance (someone's charging more), Veggie Wrap isn't sold everywhere, and the Milkshake is out of stock somewhere.

Click the expand arrow on "Classic Burger" and three venue sub-rows appear:

- Downtown: $12.00 · Active
- Airport: $14.50 · Active
- Mall: $12.00 · Active

Now you can see the Airport charges $14.50. Click that price, type "$15.00", press Enter — done. The top-level row updates to show "$12.00–$15.00".

Expand "Veggie Wrap": Downtown $10.00 Active, Airport shows "Not sold" with an "Add to venue" link, Mall $10.00 Active. Click "Add to venue" on Airport, a quick modal asks for the price, type "$12.00", save. Now all three venues sell it.

### Creating and sharing a menu

Click the **Menus** tab at business level. You see your shared menus. Click **Create Menu** — enter "All Day Menu", hours Mon–Sun 10:00–22:00, save. You land on an empty menu detail page.

Build it out: add categories "Burgers", "Sides", "Drinks". Add items with default prices: Classic Burger $12.00, Cheese Burger $13.50, Fries $4.00. Attach modifier groups: Burger Doneness (Required, pick 1), Add-ons (Optional, pick 0–3).

Now click **Share to venues**. A modal shows your three venues with checkboxes. Check all three, save. The menu card now shows "Shared to 3 venues".

Each venue instantly has this menu. The structure — categories, items, modifiers, ordering — is locked and managed from here at business level.

### What venues see on a shared menu

Drill into the Airport venue (click its card on the Venues tab, or use the Venue Switcher dropdown in the top bar). You land on Airport's **Menus** tab, directly inside the "All Day Menu" (it's the only menu, so it's auto-selected). A banner reads: "Shared menu · Structure managed at business level."

The Airport manager sees all the categories and items, but can't add or remove anything. What they can do: **adjust prices** and **pause items**. The Airport is in a terminal, so they click Classic Burger's price, change it from $12.00 to $14.50. They can also pause items if the kitchen runs out of something.

Meanwhile, back at business level, the item editor for Classic Burger shows: "Price: $12.00 · overridden at 1 venue." If the business owner later changes the default price to $13.00, a confirmation modal appears: "1 of 3 venues has overridden the price. Apply to all venues, or only to venues using the default?" They choose to preserve the Airport's override, so Downtown and Mall get $13.00 while Airport keeps $14.50.

### Venue-specific menus alongside shared ones

Downtown wants a happy hour menu that the other venues don't have. The Downtown manager (or the business owner drilled into Downtown) opens the **Menu Switcher** dropdown and clicks **Create Menu**. This creates a **local menu** — "Happy Hour Specials", Mon–Fri 16:00–18:00. They have full editing control: add categories, add items, set prices. The Menu Switcher now lists both "All Day Menu" (shared) and "Happy Hour Specials" (local). They can toggle between them instantly.

During the 16:00–18:00 window, both menus are active. If a Happy Hour item has a lower price than the same item on the All Day Menu, the consumer gets the happy hour price — exactly as intended.

### Quick venue switching

While working inside Downtown, use the **Venue Switcher** dropdown in the top bar. It shows "Downtown" (current), "Airport", "Mall", and "All Venues (Business)". Select "Airport" to jump straight there. Select "All Venues (Business)" to return to the business-level tabs.

Or click "Burger Chain" in the breadcrumb above the content area to go back to business level.

---

## 4. Hybrid: QuickStop Convenience

### What you see first

You manage two locations, so you start on the **Venues** tab with two cards: "Main St" (full store) and "Station Kiosk" (smaller). Tabs at business level: **Venues** | **All Items** | **Menus** | **Collections** | **Modifiers** | **Bundles**. This is the hybrid business level — you get both Menus (for prepared food) and Collections (for retail assortments).

### Managing retail assortments with Collections

Click the **Collections** tab. You see two collections: "Essentials" (shared to both venues, 3 products) and "Tech Accessories" (shared to Main St only, 2 products).

Click "Essentials". You see a flat list of products: Coca-Cola 330ml, Mixed Nuts 200g, Aspirin 20-pack. These are the products every store in your network should carry. The collection shows "Shared to 2 venues."

You want to add hand sanitizer to every store. Click **Add Products**, search for "Hand Sanitizer", select it, click Add. It appears in the collection. Because the collection is shared to both venues, Hand Sanitizer is instantly available at Main St and Station Kiosk — no need to add it to each store individually.

Need to add a new collection? Click back to the Collections tab, click **Create Collection**, name it "Summer Drinks", add some products, share it to whichever venues you want. Done.

### Direct assignment (without a collection)

Not everything needs to be in a collection. Back on the **All Items** tab (business level), you see the expandable-row table with all products. You want to add Organic Juice to just Main St, no collection needed. Expand the row, click "Add to venue" on the Main St sub-row, set the price, save. Or select a few products with checkboxes and use the **"Add to venues"** bulk action to assign them in one go.

### At the venue level

Click into "Main St". The tab bar switches to venue-level hybrid tabs: **All Items** | **Menus** | **Categories** | **Modifiers** | **Bundles**.

You land on **All Items**. The table shows every product at this venue with a **Source** column telling you how each item got here:

- Coca-Cola 330ml · $2.50 · Active · Source: **Collection (Essentials)**
- Phone Charger Cable · $12.99 · Active · Source: **Collection (Tech Accessories)**
- Organic Juice 500ml · $3.99 · Active · Source: **Direct**
- Turkey Club Sandwich · $8.99 · Active · Source: **Menu (Deli Menu)**

You can override prices and pause items regardless of source — the venue always controls its own pricing and availability. But you can't remove a product that came from a collection; that's managed at business level.

### Prepared food — the Deli Menu

Click the **Menus** tab. You land directly inside the "Deli Menu" detail (it's the only menu). Restaurant-style menu detail. Categories: Sandwiches, Salads. Items have modifiers (Bread Type for sandwiches, Dressing for salads).

Add a new sandwich: "Add Item" in Sandwiches, fill in "BLT" at $7.99, attach "Bread Type" modifier, save. It shows up in the Deli Menu and in the All Items table with Source: "Menu (Deli Menu)".

### The three sources coexist

This is what makes hybrid work: retail items arrive via **Collections** (managed assortments) or **Direct assignment** (ad-hoc). Prepared food lives in **Menus** with categories and modifiers. All three sources appear in the unified All Items view so the venue manager sees everything in one place, but each has its natural management home — collections and menus at business level, direct assignment either level.

---

## Summary of Navigation Paths

| Starting Point | What Happens |
|---|---|
| Single-venue restaurant opens tool | → Menus tab, directly inside the active menu (default). Menu Switcher for other menus. Tabs: Menus, All Items, Modifiers, Bundles. |
| Single-venue new vertical opens tool | → All Items tab (default). Tabs: All Items, Categories, Modifiers. |
| Multi-venue restaurant opens tool | → Venues tab (venue cards). Tabs: Venues, All Items, Menus, Modifiers, Bundles. |
| Multi-venue new vertical opens tool | → Venues tab (venue cards). Tabs: Venues, All Items, Collections, Modifiers. |
| Multi-venue hybrid opens tool | → Venues tab (venue cards). Tabs: Venues, All Items, Menus, Collections, Modifiers, Bundles. |
| Multi-venue user drills into a venue | → Venue-level tabs replace business tabs. Breadcrumb appears. Restaurant venues open into active menu. |
| Hybrid venue user (at venue level) | → All Items tab (default). Tabs: All Items, Menus, Categories, Modifiers, Bundles. |
| Any user pauses an item | → Pause Modal with duration → status updates in place, no tab change. |
| Any user edits an item | → Slide-over panel opens over current tab → save closes panel, tab content updates. |
| Multi-venue user switches venue | → Venue Switcher dropdown or breadcrumb. Tabs and content swap to target context. |
| Business owner creates a shared menu | → Menus tab (business level) → Create Menu → build → Share to venues. |
| Business owner creates a collection | → Collections tab (business level) → Create Collection → add products → Share to venues. |
| Business owner bulk-assigns products | → All Items tab (business level) → select rows → "Add to venues" bulk action → venue picker. |
| Venue manager views shared menu | → Menus tab (venue level) → shared banner, can override price and status only. |
| Venue manager views collection items | → All Items tab (venue level) → items show source "Collection: [name]", can override price and status. |
