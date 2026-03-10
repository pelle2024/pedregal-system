# Solution Proposal — Merchant Product Management Platform

> Implementation-oriented design for a clickable grayscale wireframe prototype.
> References `domain-architecture-and-requirements.md` as the source of truth for entity definitions and domain rules.

---

## 1. Information Architecture

### 1.1 App Shell (Persistent Layout)

This product management tool lives inside a larger merchant dashboard. It occupies **one navigation item** in the host dashboard's left sidebar (e.g., "Catalog" or "Products" — name TBD). Clicking that nav item opens the product management workspace. Everything described in this document lives inside that workspace.

**Layout within the workspace:**

- **Top Bar** (provided by host dashboard)
  - Left: Logo / app name
  - Right (multi-venue only): **Venue Switcher** — dropdown to jump to another venue or back to business level. Shows current venue name or "All Venues (Business)". Hidden for single-venue users.
  - Right: User avatar / settings icon

- **Horizontal Tab Bar** — Runs across the top of the content area, directly below the top bar. This is the primary navigation within the product management tool. Tabs adapt based on merchant context (see §1.3).

- **Context Indicator / Breadcrumb** — Sits between the tab bar and content area for multi-venue users when drilled into a venue: `Business Name > Venue Name`. Clicking the business name returns to business-level context. Not shown for single-venue users.

- **Content Area** — Below the tab bar, showing the content for the active tab.

- **Slide-over Panel** — A right-side drawer used for editors (item, modifier group, bundle). Opens over content area; content area remains partially visible and dimmed. Closed via "X" or "Save" / "Cancel".

### 1.2 Contextual Adaptation Rules

| Condition | Behavior |
|---|---|
| User has 1 venue | Skip business level. Land on default tab for their vertical. Hide venue switcher. No Venues tab. |
| User has 2+ venues | Land on **Venues** tab (business level). Show venue switcher in top bar. Drilling into a venue swaps tab bar to venue-level tabs + shows breadcrumb. |
| Vertical = restaurant | Default venue tab = **Menus**, which opens directly into the currently active menu (by time of day). If no menu is active, opens the next upcoming or most recently edited. Menu switcher provides access to all menus. |
| Vertical = new vertical | Default venue tab = **All Items**. No Menus tab unless explicitly enabled. |
| Vertical = hybrid | Default venue tab = **All Items**. Both All Items and Menus tabs visible. |

### 1.3 Tab Configuration by Context

**Business Level — Restaurant (multi-venue only)**
```
Venues             DEFAULT — venue cards/list (the landing view)
All Items          Master catalog with expandable per-venue rows
Menus              Business-level shared menus (create + share to venues)
Modifiers          Modifier library (business-scoped)
Bundles            Bundle management (business-scoped)
```

**Business Level — New Vertical (multi-venue only)**
```
Venues             DEFAULT — venue cards/list (the landing view)
All Items          Master catalog with expandable per-venue rows
Collections        Named groups of products, shareable to venues
Modifiers          Modifier library (business-scoped, if applicable)
```

**Business Level — Hybrid (multi-venue only)**
```
Venues             DEFAULT — venue cards/list (the landing view)
All Items          Master catalog with expandable per-venue rows
Menus              Business-level shared menus (prepared food)
Collections        Named groups of products, shareable to venues (retail)
Modifiers          Modifier library (business-scoped)
Bundles            Bundle management (business-scoped)
```

**Venue Level — Restaurant**
```
Menus              DEFAULT — opens directly into the active menu (Menu Detail).
                   Menu switcher at top provides access to other menus,
                   "Manage all menus" (list view), and "Create Menu".
All Items          Flat table of all items at this venue
Modifiers          Modifier library (venue-scoped view)
Bundles            Bundle management (venue-scoped)
```

**Venue Level — New Vertical**
```
All Items          DEFAULT — flat table of all venue items
Categories         Category taxonomy manager
Modifiers          Modifier library (if applicable)
```

**Venue Level — Hybrid**
```
All Items          DEFAULT — flat table of all venue items
Menus              This venue's menus (prepared food)
Categories         Category taxonomy manager
Modifiers          Modifier library
Bundles            Bundle management
```

---

## 2. Page Inventory

### Page 0: Scenario Selector (Prototype-only)

**Purpose:** Let the reviewer pick a demo merchant type to experience the appropriate flow. Not part of the real product.

**Content:**
- Heading: "Select a demo scenario"
- Cards (one per scenario):
  1. **Mario's Pizzeria** — Single-venue restaurant
  2. **Bloom & Co** — Single-venue flower shop (new vertical)
  3. **Burger Chain** — Multi-venue restaurant (3 locations)
  4. **QuickStop Convenience** — Hybrid (grocery + deli menu), 2 locations

**Actions:**
- Click a card → enters the app shell with the correct context, tab set, and seed data applied.
- Mario's → lands on Menus tab, directly inside the currently active menu's detail view (venue-level restaurant)
- Bloom & Co → lands on All Items tab (venue-level new vertical)
- Burger Chain → lands on Venues tab (business-level)
- QuickStop → lands on Venues tab (business-level hybrid)

---

### Page 1: Venues Tab (Business Level)

**When shown:** Multi-venue users. Default landing tab at business level.

**Content:**
- Grid of **Venue Cards**, each showing:
  - Venue name
  - Address (one line)
  - Item count (total active offers)
  - Status indicator (operational / issues such as paused items)
  - Venue vertical badge if hybrid (e.g., "Restaurant", "Retail", or "Hybrid")

**Actions:**
- Click venue card → drill down to that venue's default tab (restaurant → Menus; new vertical → All Items; hybrid → All Items). Tab bar swaps to venue-level tabs. Breadcrumb appears.
- Click any other business-level tab to navigate without drilling down.

---

### Page 2: All Items Tab — Business Level (Expandable Rows)

**When shown:** Multi-venue users at business level. The "power view" for managing items across venues.

**Purpose:** Master catalog with per-venue visibility via expandable accordion rows.

**Content:**
- Toolbar: Search field, Filter by status (All / Active / Paused / Inactive), Filter by category, Filter by venue
- "Add Item" button (top right)
- **Table with expandable rows:**

**Collapsed (top-level) row columns:**
  - Expand/collapse chevron
  - Image (thumbnail)
  - Item Name (clickable → opens Item Editor in business context)
  - Category
  - Price — single value if same at all venues ("$12.00"), range if different ("$10.00–$14.50")
  - Status — aggregate summary: "Active at 3/3" or "Active 2/3 · 1 Paused" (compact indicator, e.g. dots or text)
  - Venues — "3/3 venues" or "2/3 venues" (how many of the business's venues sell this item)
  - Actions (kebab menu)

**Expanded venue sub-rows** (shown when chevron is clicked):
  - Venue name
  - Price (editable inline — click to edit, commit on blur/Enter)
  - Status badge (Active / Paused / Inactive — clickable for pause/toggle)
  - Availability summary (e.g., "Always" or "Mon–Fri 9–17")
  - Actions: Edit venue offer, Remove from venue
  - If a venue does NOT sell this item: row shows venue name + "Not sold" + "Add to venue" link

**Top-level row interaction rules:**
- Top-level aggregate cells (price, status, venues) are **read-only display** — all edits happen on venue sub-rows.
- Clicking the item name on the top-level row → opens **Item Editor slide-over** in business context (shared fields + per-venue section).
- Kebab menu on top-level row: Edit, Pause at all venues, Activate at all venues, Remove from all venues.

**Actions:**
- "Add Item" button → opens Item Editor slide-over for new product. In business context, includes a "Sold at" section: checkbox list of venues to assign the product to during creation.
- Expand row → reveals venue sub-rows for inline per-venue management
- Click venue sub-row price → inline edit
- Click venue sub-row status badge → Pause Modal or status toggle
- Click "Add to venue" on a "Not sold" sub-row → Quick Add modal (set price → Save → sub-row updates to show price + Active)
- **Bulk actions** (via row checkboxes): Select multiple products → bulk action bar appears:
  - "Add to venues" → opens venue picker (checkboxes) → assigns all selected products to chosen venues with default prices
  - "Remove from venues" → opens venue picker → removes selected products from chosen venues
  - "Pause at all venues" → Pause Modal → pauses all selected products everywhere
  - "Activate at all venues" → resumes/activates all selected products

---

### Page 3: Menus Tab — Business Level (Shared Menus)

**When shown:** Multi-venue users at business level. Primary for multi-venue restaurants. Available for hybrid.

**Purpose:** Create and manage menus at business level. Share them to venues. Venue-specific overrides (price, status) happen at venue level.

**Content:**
- **Shared menu cards/rows**, each showing:
  - Menu name (e.g., "All Day Menu", "Lunch Menu")
  - Hours summary (e.g., "Mon–Fri 11:00–15:00")
  - Status badge (Active / Inactive / Draft)
  - Item count
  - Category count
  - **Shared to** indicator: "Shared to 3 venues" or "Not shared yet"
- "Create Menu" button (top right)

**Actions:**
- Click menu card → navigate to **Menu Detail** (business-level context) for that menu.
- "Create Menu" → **New Menu modal**: name + hours + status. On save → navigate to Menu Detail (empty, ready to populate).
- Click "Shared to X venues" → opens **Share to Venues modal** (see Page 3a).

---

### Page 3a: Share to Venues Modal

**When shown:** From business-level Menus tab or Menu Detail, when clicking "Share to venues" or the shared-to indicator.

**Content:**
- Title: "Share [Menu Name] to venues"
- Checkbox list of all business venues:
  - Venue name
  - Checkbox (checked = shared, unchecked = not shared)
  - If already shared: shows "Shared" label with option to unshare
- "Save" / "Cancel" buttons

**Actions:**
- Toggle checkboxes → select/deselect venues
- Save → system creates venue-level linked menus for newly selected venues. Unshared venues lose the menu.
- Cancel → no changes.

**After save:** Returns to source page (Menus tab or Collections tab). Shared-to count updates.

---

### Page 3b: Collections Tab — Business Level

**When shown:** Multi-venue users at business level. Primary for multi-venue new verticals. Available for hybrid.

**Purpose:** Create and manage named groups of products (the retail equivalent of menus). Share collections to venues so multiple stores carry the same assortment. Simpler than menus — no hours, no categories, no ordering.

**Content:**
- **Collection cards/rows**, each showing:
  - Collection name (e.g., "Core Range", "Organic Selection", "Summer Promotion")
  - Product count
  - **Shared to** indicator: "Shared to 5 venues" or "Not shared yet"
  - Status badge (Active / Inactive / Draft)
- "Create Collection" button (top right)

**Actions:**
- Click collection card → navigate to **Collection Detail** (business-level context).
- "Create Collection" → **New Collection modal**: name + status. On save → navigate to Collection Detail (empty, ready to populate).
- Click "Shared to X venues" → opens **Share to Venues modal** (Page 3a — same modal reused, title adapts to "Share [Collection Name] to venues").

---

### Page 3c: Collection Detail — Business Level

**When shown:** After clicking a collection from the business-level Collections tab.

**Purpose:** Manage which products belong to this collection. This is the source of truth for the collection's contents.

**Content:**
- **Sub-header:**
  - Collection name (editable inline)
  - Status badge (Active / Inactive / Draft)
  - Product count
  - **Shared to indicator:** "Shared to 5 venues" (clickable → Share to Venues modal)
- **Product table** (flat list, no categories or ordering):
  - Image thumbnail
  - Product name
  - Category (from the product's category assignment)
  - Default price
  - Override indicator: "Price overridden at 2 venues" (if any venue has overridden)
  - Actions: Remove from collection
- "Add Products" button → opens a **Product Picker modal**: searchable list of all business products not yet in this collection. Multi-select + "Add selected" button.

**Actions:**
- "Add Products" → Product Picker → select products → Add → products appear in the table
- Click product name → opens **Item Editor slide-over** in business context
- "Remove" on a product row → removes product from collection (does NOT delete the product itself; venues that had it via this collection lose access unless the product is also directly assigned or in another collection)
- "Share to venues" → Share to Venues modal

**On add/remove products:** If the collection is already shared to venues, changes propagate immediately. Adding a product makes it available at all shared venues (with default price). Removing a product removes it from venues (unless they have it from another source).

---

### Page 4: Menu Detail — Business Level

**When shown:** After clicking a menu from the business-level Menus tab.

**Purpose:** Build and manage the menu structure (categories, items, modifiers, ordering) that will be shared to venues. This is the source of truth for the menu's shape.

**Content:**
- **Sub-header:**
  - Menu name (editable inline)
  - Menu hours (displayed, click to edit → modal)
  - Menu status badge (Active/Inactive/Draft)
  - "Menu Settings" button
  - **Shared to indicator:** "Shared to 3 venues" (clickable → opens Share to Venues modal)
- **Menu Switcher:** Tabs or dropdown showing all business-level menus. Click to swap.
- **Category sections + item rows:** Same structure as venue-level Menu Detail (see Page 5). Full editing: add/remove categories, add/remove items, reorder, edit.
- **Item prices** shown here are the **default price**. Venues may override.
- **Override indicator on items:** If any venue has overridden an item's price, show a subtle note: "Price overridden at 2 venues" next to the price.

**Actions:**
- All structural editing (add/remove categories, add/remove items, reorder, rename categories)
- Click item row → **Item Editor slide-over** in business context
- "Share to venues" button → Share to Venues modal
- "Add Category", "Add Item" — same patterns as venue-level Menu Detail

**On save of structural changes:** Changes propagate to all venues that have this shared menu. If the change affects a field that some venues have overridden, the **Override Confirmation Modal** (Page 14) appears.

---

### Page 5: Menu Detail — Venue Level

**When shown:** This is the **default view** for the Menus tab at venue level. The system opens directly into a menu — no intermediate list page. Which menu is shown by default:
1. The menu whose hours include the current time of day (if any).
2. If no menu is currently active, the next upcoming menu by schedule.
3. If ambiguous, the most recently edited menu.
4. If no menus exist yet, show an **empty state** with "Create your first menu" CTA.

**Purpose:** The primary workspace for restaurant merchants. Category-grouped item table. Behavior depends on whether the menu is shared or local.

**Shared menu (managed at business level):**
- **Banner at top:** "Shared menu · Structure managed at business level" with a subtle lock icon
- Category sections and item rows are **visible but structurally read-only**:
  - Cannot add/remove categories or items
  - Cannot reorder categories or items
  - Category names, item names, descriptions, images are inherited and read-only
- **Editable per-venue fields:**
  - Price (click to edit inline on each item row)
  - Status badge (click to pause/activate)
  - Availability (editable in item editor)
- If a venue has overridden a price, the item row shows the venue price with a small indicator: "Default: $12.00"

**Local menu (created at venue level):**
- Full editing capability, identical to single-venue experience (see below)

**Common content (both shared and local):**
- **Sub-header:**
  - Menu name (editable for local menus; read-only for shared)
  - Menu hours (editable — venues can adjust hours even on shared menus)
  - Menu status badge
  - "Menu Settings" button
- **Menu Switcher:** Dropdown at the top of the page. Contains:
  - All menus for this venue (click to swap instantly)
  - **"Manage all menus"** option at the bottom → shows a list/overview sub-view with all menus, their hours, status, sharing indicators. From this view, the merchant can audit menus and click back into any menu detail.
  - **"Create Menu"** option → opens New Menu modal
- **Category sections:** Collapsible section header rows.
  - Category name
  - Item count
  - Drag handle (local menus only)
  - "Add Item" button (local menus only)
  - "Add Category" button at bottom (local menus only)
- **Item rows within each category:**
  - Drag handle (local menus only)
  - Image thumbnail
  - Item name
  - Price (always editable — venue override for shared, direct edit for local)
  - Status badge (Active / Paused / Out of Stock)
  - Modifier indicator (icon + count)
  - Quick actions: Pause, Edit

**Actions (local menus — full editing):**
- Click item row → opens **Item Editor slide-over**
- "Add Item" (in category) → opens **Item Editor slide-over** (new item, category pre-selected)
- "Add Category" → inline editable row
- Drag category header / item rows → reorder
- Click item status badge → **Pause Modal** or resume

**Actions (shared menus — override only):**
- Click item row → opens **Item Editor slide-over** (venue context: price, status, availability editable; other fields shown read-only)
- Click item price → inline edit (creates venue override)
- Click item status badge → **Pause Modal** or resume
- Menu Switcher → swap between menus

---

### Page 6: All Items Tab — Venue Level

**When shown:** Venue-level. Primary for new vertical and hybrid. Secondary for restaurant.

**Purpose:** Flat table of all offers at this venue, independent of menu placement.

**Content:**
- Toolbar: Search field, Filter by status, Filter by category, Sort options (name, price, recently edited)
- "Add Item" button (top right)
- **Table columns:**
  - Image thumbnail
  - Item name
  - Category (if assigned)
  - Price
  - Status badge (Active / Paused / Inactive / Out of Stock)
  - Availability summary (e.g., "Always" or "Mon–Fri 9–17" or "Paused until 23:59")
  - In Menu (restaurant/hybrid only): which menu(s) the item appears in, if any
  - Source (new vertical/hybrid, multi-venue only): how the item arrived at this venue — "Direct", "Collection: Core Range", or "Menu: Deli Menu". An item can have multiple sources.
  - Actions (kebab)

**Actions:**
- Click item row → opens **Item Editor slide-over**
- "Add Item" → opens **Item Editor slide-over** (new)
- Click status badge → Pause Modal / status toggle
- Kebab: Edit, Duplicate, Pause, Deactivate, Delete
- Bulk select (checkboxes) + bulk actions bar: Pause selected, Activate selected, Change category

---

### Page 7: Item Editor (Slide-over Panel)

**When shown:** Opens as a right-side slide-over from Menu Detail, All Items, or Business All Items.

**Purpose:** Create or edit an item. Covers all item fields including modifiers. Behavior adapts to context.

**Structure — Sections (scrollable, not tabs):**

**Section: Basic Info**
- Image upload area (click to upload, shows preview)
- Title (text input)
- Description (textarea)
- *In venue context viewing a shared-menu item: title, description, image are read-only with note "Managed at business level"*

**Section: Price & Availability**
- Price (number input + currency indicator)
  - *Business context: shows default price + "Overridden at X venues" indicator if applicable*
  - *Venue context for shared item: shows venue price with "Default: $X.XX" reference*
- Availability schedule: "Always available" toggle, or day/time grid
- Temporary pause controls (inline): status toggle + pause duration (if pausing)

**Section: Category**
- Category dropdown (select existing or "Create new")
- For menu context: shows which menu + category this item is placed in
- For non-menu context: shows the item's category assignment

**Section: Modifiers**
- List of attached modifier groups, each showing:
  - Group name
  - Rules summary (e.g., "Required, pick 1")
  - Option count
  - "Edit" link → opens Modifier Group Editor slide-over
  - "Remove" link → detaches group from item (business context / local menus only)
- "Add Modifier Group" button (business context / local menus only):
  - Opens a picker: list of existing groups + "Create New Group" option
  - "Create New Group" → opens Modifier Group Editor inline or nested

**Section: Status**
- Status selector: Active / Inactive
- Pause toggle with duration picker (see §4.1)

**Section: Per-Venue (business-level context only)**
- **When creating a new item:** "Sold at" checkbox list of venues. Check venues where this product should be available. Default price applies; venues can override later.
- **When editing an existing item:** Table of venues showing: venue name, price (editable), status (editable), override indicator. Each row editable inline. Venues that have overridden the default price show the override value with a "Reset to default" link.
- **Source indicator:** If the product is in a collection or shared menu, shows: "Via: Core Range collection" or "Via: All Day Menu". Products can be assigned both directly and via collections/menus.

**Footer:**
- "Save" button (primary) → saves and closes slide-over
- "Cancel" link → closes without saving
- "Delete Item" (destructive, with confirmation — not available for shared-menu items at venue level)

**On save (business context):** If any changed field has been overridden at venues, the **Override Confirmation Modal** (Page 14) appears before finalizing. Otherwise, slide-over closes and source page refreshes.

**On save (venue context):** Slide-over closes. Source page refreshes with updated data.

---

### Page 8: Modifiers Tab / Modifier Library

**When shown:** Tab at both business and venue level.

**Purpose:** Manage all modifier groups in one place.

**Content:**
- **List/table of modifier groups:**
  - Group name (e.g., "Spice Level", "Choose a Side")
  - Rules summary (e.g., "Required, pick 1 of 3")
  - Option count
  - Used by (count of items using this group)
  - Status badge (Active / Inactive)
- "Add Modifier Group" button

**Actions:**
- Click group row → opens **Modifier Group Editor slide-over**
- "Add Modifier Group" → opens **Modifier Group Editor slide-over** (new)
- Click status badge → toggle Active/Inactive

---

### Page 9: Modifier Group Editor (Slide-over)

**When shown:** From Modifier Library or from Item Editor's "Add/Edit Modifier Group" action.

**Content:**
- Group name (text input)
- Selection rules:
  - Required (toggle)
  - Min selections (number)
  - Max selections (number)
- **Options list** (ordered):
  - Each option row: Name, Price delta (+$X.XX or $0.00), Status badge, Drag handle, Delete button
  - "Add Option" button at bottom → appends new empty option row
- Status: Active / Inactive

**Footer:** Save / Cancel

**After save:** Slide-over closes. If from library → library refreshes. If from Item Editor → returns to Item Editor with group attached.

---

### Page 10: Bundles Tab / Bundle List

**When shown:** Tab at venue or business level.

**Content:**
- **Table of bundles:**
  - Bundle name
  - Included items (names, 2–4)
  - Bundle price
  - Status badge
- "Add Bundle" button

**Actions:**
- Click bundle row → opens **Bundle Editor slide-over**
- "Add Bundle" → opens **Bundle Editor slide-over** (new)

---

### Page 11: Bundle Editor (Slide-over)

**Content:**
- Bundle name (text input)
- Description (textarea, optional)
- **Included items** (2–4 slots):
  - Each slot: item picker (search/select from venue's offers) + remove button
  - "Add Item" button (disabled if 4 items already selected)
  - Validation: minimum 2 items
- Bundle price (number input)
- Availability schedule
- Status: Active / Inactive

**Footer:** Save / Cancel

**After save:** Returns to Bundle List, updated.

---

### Page 12: Categories Tab / Category Manager

**When shown:** Tab for new vertical and hybrid at venue level.

**Purpose:** Manage categories used for item organization (retail taxonomy).

**Content:**
- **List of categories:**
  - Category name (editable inline)
  - Item count (offers assigned)
  - Status
  - Drag handle for ordering
- "Add Category" button → inline new row

**Actions:**
- Click category name → inline edit
- Drag to reorder
- Click item count → switches to All Items tab, filtered to that category

---

### Page 13: Pause Modal (Overlay)

**When shown:** Triggered from status badge clicks, quick actions, or Item Editor pause toggle.

**Content:**
- Title: "Pause [Item Name]?" or "Pause [Modifier Option Name]?"
- Duration options (radio buttons):
  - 1 hour
  - 2 hours
  - 4 hours
  - Rest of today
  - 24 hours
  - 1 week
  - Until I turn it back on (indefinite)
- Optional: "Reason" text field (placeholder for future use)
- Buttons: "Pause" (primary), "Cancel"

**After confirm:** Modal closes. Status updates to "Paused" with remaining duration shown. Row dims slightly.

---

### Page 14: Override Confirmation Modal

**When shown:** Triggered when a business-level user saves a change to a field (e.g., price) that has been overridden at one or more venues.

**Content:**
- Title: "Some venues have overrides"
- Body: "[X] of [Y] venues have overridden the [field name] for this item."
  - Example: "2 of 3 venues have overridden the price for Classic Burger."
- Options (radio buttons or two distinct buttons):
  - **"Apply to all venues"** — overwrites venue overrides with the new value
  - **"Apply only to venues using the default"** — preserves existing venue overrides, updates only non-overridden venues
- Buttons: "Confirm" (primary), "Cancel"

**After confirm:** Modal closes. Changes applied per selection. Slide-over closes. Source page refreshes.

---

## 3. Core Flows — End-to-End Paths

### 3.1 Single-Venue Restaurant Flows

> Entry: Scenario Selector → "Mario's Pizzeria" → lands on **Menus** tab, directly inside the currently active menu's detail view (venue-level restaurant tab set). If the venue has no menus yet, shows empty state with "Create your first menu" CTA.

#### Flow SVR1: Create menu and items

1. **Menus tab** → if menus exist, merchant is already inside one. To create a new menu: open the **Menu Switcher** dropdown → click "Create Menu".
   - If no menus exist: click "Create your first menu" on the empty state.
2. **New Menu Modal** → enter name "Lunch Menu", set hours Mon–Fri 11:00–15:00, status = Active → Save
3. → Navigates to **Menu Detail** for "Lunch Menu" (empty). Menu Switcher now lists this menu.
4. **Menu Detail** → click "Add Category" → type "Starters" → Enter → category section appears
5. → click "Add Category" again → type "Mains" → Enter
6. → click "Add Item" inside "Starters" section
7. **Item Editor slide-over** opens → fill: title = "Spring Rolls", price = 8.50, description, upload image. Category pre-selected as "Starters".
8. → Save → slide-over closes
9. → **Menu Detail** shows "Spring Rolls" under "Starters"
10. → repeat for more items
11. **System outcome:** Each item creates an Offer (and backing Product internally). Items sellable during menu hours.

#### Flow SVR2: View and manage menu table

1. **Menu Detail** is the working surface.
2. Merchant scans category-grouped rows: image | name | price | status | modifier indicator.
3. → click any item row → **Item Editor slide-over** opens for editing.
4. → click status badge on a row → quick toggle (Active → Pause Modal, Paused → resume).

#### Flow SVR3: Reorder categories and items

1. **Menu Detail** → drag category header up/down → order updates immediately.
2. → drag item row within category → item order updates.
3. → drag item to different category → item moves, category assignment updates.
4. **System outcome:** Sort order persisted. No page navigation.

#### Flow SVR4: Edit an item

1. **Menu Detail** → click item row "Spring Rolls"
2. **Item Editor slide-over** opens with all current data.
3. → change price 8.50 → 9.00, update description, change category from "Starters" to "Mains" via dropdown.
4. → Save → slide-over closes
5. → **Menu Detail** shows item under "Mains" with new price.

#### Flow SVR5: Create and attach modifiers

**Path A: From Item Editor**
1. **Menu Detail** → click "Spring Rolls" → **Item Editor slide-over**
2. → scroll to Modifiers section → click "Add Modifier Group"
3. → picker shows existing groups + "Create New Group"
4. → click "Create New Group"
5. **Modifier Group Editor** appears:
   - Name: "Dipping Sauce", Required: Yes, Min: 1, Max: 1
   - Options: "Sweet Chili" ($0), "Peanut Sauce" (+$0.50), "Soy Sauce" ($0)
6. → Save → returns to Item Editor, group listed under Modifiers
7. → Save Item Editor → slide-over closes, modifier indicator shows on row

**Path B: From Modifiers tab**
1. Click **Modifiers** tab → Modifier Library → "Add Modifier Group"
2. **Modifier Group Editor slide-over** → fill details → Save
3. → group appears in library
4. → click **Menus** tab → select menu → click item → **Item Editor** → Modifiers → "Add Modifier Group" → select existing group from picker → attached

#### Flow SVR6: Pause an item

1. **Menu Detail** → click status badge on "Spring Rolls" (currently "Active")
2. **Pause Modal** → select "Rest of today" → "Pause"
3. → modal closes, badge shows "Paused · until 23:59", row dims
4. → stays on Menu Detail
5. **System outcome:** Offer paused, unsellable until end of day.

**Resume:** Click "Paused" badge → "Resume Now" → Active immediately.

**Pause modifier option:**
1. **Item Editor** → Modifiers → click "Edit" on group → **Modifier Group Editor**
2. → click status badge on "Peanut Sauce" → Pause Modal → "24 hours" → Pause
3. → Save group → Save item → returns to Menu Detail.

#### Flow SVR7: Edit menu settings, switch menus, and manage all menus

1. **Menu Detail** (showing "Lunch Menu") → click "Menu Settings"
2. **Menu Settings Modal** → edit hours, change status → Save
3. → modal closes, sub-header updates.
4. → **Menu Switcher** dropdown → click "Dinner Menu"
5. → content swaps to Dinner Menu's categories and items. URL updates.
6. → **Menu Switcher** dropdown → click "Manage all menus"
7. → list/overview sub-view shows all menus with name, hours, status, item count. Useful for auditing schedules across menus.
8. → click any menu in the list → returns to that menu's detail view.

---

### 3.2 Single-Venue New Vertical Flows

> Entry: Scenario Selector → "Bloom & Co" → lands on **All Items** tab (venue-level new-vertical tab set).

#### Flow SVNV1: Manage all items table

1. **All Items tab** shows flat table: image, name, category, price, status, availability.
2. → search or filter by category/status
3. → click "Add Item" (top right)
4. **Item Editor slide-over** opens → fill: title = "Red Roses Bouquet", price = 29.99, category = "Bouquets", image, availability = "Always"
5. → Save → slide-over closes → item appears in table with "Active" status.

#### Flow SVNV2: Edit item details

1. **All Items tab** → click row "Red Roses Bouquet"
2. **Item Editor slide-over** → change price to 34.99, set availability to "Mon–Sat 9:00–18:00"
3. → Save → table reflects updated price and availability.

**Pause:** Click status badge → Pause Modal → "24 hours" → badge shows "Paused · 24h".

#### Flow SVNV3: Manage categories

1. Click **Categories** tab → see list: Bouquets (4), Single Stems (2), Plants (3), Arrangements (1)
2. → "Add Category" → type name → Enter → new category appears
3. → drag to reorder, inline rename
4. → click item count on "Bouquets" → switches to All Items tab filtered to Bouquets

---

### 3.3 Multi-Venue Flows

> Entry: Scenario Selector → "Burger Chain" → lands on **Venues** tab (business-level tab set).

#### Flow MV1: Business-level per-venue item management (expandable rows)

1. **Venues tab** shows 3 venue cards: "Downtown", "Airport", "Mall".
2. → click **All Items** tab
3. **Business All Items** loads. Table shows collapsed rows:
   - "Classic Burger" | Burgers | $12.00–$14.50 | Active 3/3 | 3/3 venues
   - "Veggie Wrap" | Wraps | $10.00 | Active 2/3 | 2/3 venues
   - "Milkshake" | Drinks | $6.00–$7.50 | Active 2/3 · 1 Out of Stock | 3/3 venues
4. → click expand chevron on "Classic Burger"
5. → three venue sub-rows appear:
   - Downtown: $12.00 | Active
   - Airport: $14.50 | Active
   - Mall: $12.00 | Active
6. → click "$14.50" on Airport sub-row → inline edit → type "15.00" → Enter → price updates. Top-level row range updates to "$12.00–$15.00".
7. → expand "Milkshake" → see: Downtown $6.00 Active | Airport $7.50 Active | Mall $6.00 Out of Stock
8. → click "Out of Stock" badge on Mall sub-row → "Resume Now" → flips to Active. Top-level status updates to "Active 3/3".
9. → expand "Veggie Wrap" → see: Downtown $10.00 Active | Airport: "Not sold" [Add to venue] | Mall $10.00 Active
10. → click "Add to venue" on Airport sub-row → **Quick Add modal**: set price $12.00 → Save → sub-row updates to "$12.00 | Active". Top-level updates to "3/3 venues".
11. **System outcome:** Per-venue offers updated without leaving business-level view.

#### Flow MV2: Drill-down to venue

1. **Venues tab** → click "Downtown" venue card
2. → tab bar swaps to venue-level restaurant tabs (Menus, All Items, Modifiers, Bundles)
3. → breadcrumb appears: "Burger Chain > Downtown"
4. → lands on **Menus tab** for Downtown, directly inside the currently active menu's detail view (restaurant default)
5. → merchant manages menus as single-venue restaurant (SVR flows apply)
6. → click "Burger Chain" in breadcrumb → returns to Venues tab, tab bar swaps back to business-level tabs.

**Alternative: Venue Switcher**
1. While in Downtown venue → click Venue Switcher dropdown in top bar
2. → options: "All Venues (Business)", "Downtown" (current), "Airport", "Mall"
3. → select "Airport" → context switches to Airport venue, tabs stay venue-level, breadcrumb updates.
4. → select "All Venues (Business)" → returns to business level.

#### Flow MV3: Edit shared item details with override confirmation

1. **Business All Items** → click item name "Classic Burger" (on collapsed row)
2. **Item Editor slide-over** opens in business context:
   - Basic Info: title, description, image (shared fields)
   - Price section shows: Default price: $12.00 · "Overridden at 1 venue" (Airport has $15.00)
   - Per-Venue section at bottom: Downtown $12.00 | Airport $15.00 (override indicator) | Mall $12.00
3. → edit default price from $12.00 to $13.00 → click Save
4. **Override Confirmation Modal** appears:
   - "1 of 3 venues has overridden the price for Classic Burger."
   - Option A: "Apply $13.00 to all venues" (Airport's $15.00 override will be replaced)
   - Option B: "Apply $13.00 only to venues using the default" (Airport keeps $15.00)
5. → select Option B → Confirm
6. → slide-over closes. Downtown and Mall update to $13.00. Airport stays at $15.00. Collapsed row shows "$13.00–$15.00".

#### Flow MV4: Create and share a menu to venues

1. **Menus tab** (business level) → click "Create Menu"
2. **New Menu Modal** → name "All Day Menu", hours Mon–Sun 10:00–22:00 → Save
3. → navigates to **Menu Detail (business level)** for "All Day Menu" (empty)
4. → build the menu: Add categories ("Burgers", "Sides", "Drinks"), add items with default prices, attach modifier groups
5. → click "Share to venues" (or the "Not shared yet" indicator)
6. **Share to Venues Modal** → check all 3 venues → Save
7. → indicator updates to "Shared to 3 venues"
8. **System outcome:** Each venue now has this menu. Items create venue-level Offers with default prices.
9. → drill into "Airport" venue → **Menus tab** opens directly into "All Day Menu" detail with "Shared menu" banner (it's the only menu, so it's auto-selected)
10. → Airport manager can adjust prices (e.g., Classic Burger $14.50 instead of default $12.00) and pause items. Cannot add/remove items or categories.
11. → return to business level → **Menus tab** → click "All Day Menu" → add a new item "Fish Burger" to Burgers category → Save
12. → "Fish Burger" automatically appears at all 3 venues with the default price. Venues can then override the price.

#### Flow MV5: Venue adds a local menu alongside shared menu

1. Drilled into "Downtown" venue → **Menus tab** opens into "All Day Menu" detail (shared, via business)
2. → open **Menu Switcher** dropdown → click "Create Menu" → **New Menu Modal** → name "Happy Hour Specials", hours Mon–Fri 16:00–18:00 → Save
3. → **Menu Detail** for "Happy Hour Specials" — full editing (local menu, no restrictions)
4. → add categories and items specific to Downtown's happy hour
5. → **Menu Switcher** dropdown now lists two menus: "All Day Menu" (shared) and "Happy Hour Specials" (local). Merchant can toggle between them.
6. → opening "Manage all menus" from the switcher shows both menus with their hours and sharing status.
7. **System outcome:** Downtown has both a business-managed menu and a locally-managed one.

#### Flow MV6: Create and share a collection to venues (new vertical / hybrid)

1. **Collections tab** (business level) → click "Create Collection"
2. **New Collection Modal** → name "Core Range", status = Active → Save
3. → navigates to **Collection Detail** for "Core Range" (empty)
4. → click "Add Products" → **Product Picker** opens → search/scroll → select 15 products → click "Add selected"
5. → 15 products appear in the collection table with their default prices
6. → click "Share to venues" (or the "Not shared yet" indicator)
7. **Share to Venues Modal** → check 4 of 6 venues → Save
8. → indicator updates to "Shared to 4 venues"
9. **System outcome:** All 15 products are now available at the 4 selected venues with default prices. Each venue's All Items table shows the products with source "Collection: Core Range".
10. → later, add 3 more products to the collection → they automatically appear at all 4 venues.

#### Flow MV7: Bulk assign products to a specific venue (without a collection)

1. **All Items tab** (business level) → select 20 products via checkboxes
2. → bulk action bar appears → click "Add to venues"
3. → **Venue Picker modal** → check "Airport" → Save
4. → all 20 products are now assigned to Airport with default prices
5. **System outcome:** Airport's All Items table gains 20 new products, each with source "Direct".

---

### 3.4 Hybrid Merchant Flows

> Entry: Scenario Selector → "QuickStop Convenience" → lands on **Venues** tab (2 venue cards).

#### Flow H1: Retail assortment + prepared food menus

1. **Venues tab** → click "QuickStop Main St" venue card
2. → lands on **All Items tab** (hybrid default). Tab bar: All Items, Menus, Categories, Modifiers, Bundles.
3. **All Items** table shows all items with "Source" indicator column:
   - "Coca-Cola 330ml" | Beverages | $2.50 | Active | Source: Collection (Essentials)
   - "Phone Charger Cable" | Electronics | $12.99 | Active | Source: Collection (Tech Accessories)
   - "Organic Juice 500ml" | Beverages | $3.99 | Active | Source: Direct
   - "Turkey Club Sandwich" | Deli | $8.99 | Active | Source: Menu (Deli Menu)
4. → click "Add Item" → **Item Editor** → create retail item "Hand Sanitizer", $2.99, category "Health" → Save. Appears with source "Direct".
5. → click **Menus** tab → opens directly into "Deli Menu" detail (Mon–Sun 07:00–20:00, Active)
6. → categories: Sandwiches, Salads. Items have modifiers.
7. → "Add Item" in Sandwiches → **Item Editor** → "BLT Sandwich", $7.99, attach "Bread Type" modifier → Save
8. → back on Menu Detail, "BLT Sandwich" shows with modifier indicator
9. → click **All Items** tab → all items appear: collection items, direct items, and menu items, each with source indicator

#### Flow H2: Manage collections at business level (hybrid)

1. → breadcrumb "QuickStop Stores" → back to business level
2. → click **Collections** tab → shows "Essentials" (shared to 2 venues, 3 products) and "Tech Accessories" (shared to 1 venue, 2 products)
3. → click "Essentials" → **Collection Detail** shows 3 products
4. → click "Add Products" → **Product Picker** → select "Hand Sanitizer" → Add
5. → "Hand Sanitizer" now in Essentials collection → automatically appears at both venues (Main St and Station Kiosk)
6. → click "Shared to 2 venues" → **Share to Venues modal** → can adjust which venues have this collection

---

## 4. System States

### 4.1 Item/Offer Status Model

| Status | Meaning | Visual Treatment | Consumer Impact |
|---|---|---|---|
| **Active** | Selling normally | Dark badge, "Active" label | Visible and orderable |
| **Inactive** | Disabled, not selling | Gray badge, "Inactive" label | Not visible to consumers |
| **Paused** | Temporarily not selling | Outlined badge with clock icon, "Paused" + duration | Not orderable; may be visible as "unavailable" |
| **Out of Stock** | Variant of paused, stock-specific | Same as paused, label = "Out of Stock" | Same as paused |

**Status transitions:**
- Active → Paused (via Pause Modal with duration)
- Active → Inactive (via status dropdown)
- Paused → Active (resume, manual or auto)
- Paused → Inactive
- Inactive → Active
- Out of Stock ↔ Active (same as Paused flow)

### 4.2 Pause Duration

1. **Pause Modal** presents duration options: 1h, 2h, 4h, rest of today, 24h, 1 week, indefinite.
2. System records `paused_at` + `resume_at` (or indefinite flag).
3. Badge shows remaining time: "Paused · 2h 15m left" or "Paused · indefinite".
4. Auto-resumes when `resume_at` is reached.
5. Manual resume: click Paused badge → "Resume Now".
6. Extend: click Paused badge → "Extend" → new Pause Modal.

### 4.3 Modifier Status

- **Modifier Group:** Active / Inactive. Deactivating hides all options.
- **Modifier Option:** Active / Paused / Inactive. Individual options pausable with same duration concept.
- If all options in a required group are paused → parent item shows warning indicator.

### 4.4 Menu Status, Hours, and Overlap

- **Menu status:** Active / Inactive / Draft.
  - Draft: exists but not consumer-visible. Used during setup.
  - Active: consumer-visible during scheduled hours.
  - Inactive: turned off regardless of hours.
- **Menu hours:** Day/time ranges per menu. Outside hours → menu items not orderable.
- **Multiple menus:** A venue can have multiple active menus. Menu Switcher allows jumping between them.
- **Overlapping hours are allowed.** Common patterns:
  - Time-separated: Lunch (11–15), Dinner (17–22). No overlap — only one active at a time.
  - Parallel: "Food Menu" (all day) + "Drinks Menu" (all day). Both active simultaneously.
  - Partial overlap: "Brunch" (10–14) + "All Day" (11–22). Brunch items available during the overlap window.
- **What the consumer sees during overlap** is a consumer-app concern outside this prototype's scope. The merchant mental model: at any given moment, consumers can see items from all currently active menus.
- **Items can appear in multiple menus** (e.g., Margherita Pizza in both Lunch and Dinner).
- **Overlap pricing rule — lowest price wins.** If an item exists in two active menus at different prices, the consumer sees the lower price. This matches the most common real-world scenario: lunch menus, happy hour menus, and early bird menus exist to offer a better deal during a window.
- **UX hint on overlap:** When a merchant adds an item to a menu and it already exists in another menu at a different price, show an inline note: "This item is also in [Other Menu] at $14.00. During overlapping hours, the lower price ($12.00) will apply." This prevents surprises.

### 4.5 Per-Venue Overrides (Business Level)

In the expandable-row All Items view and in the Item Editor's per-venue section:

- **Price**: Each venue can override the default product price. Displayed on venue sub-rows (expandable view) and in Item Editor's per-venue section. If overridden, shows override indicator.
- **Status**: Each venue independently pauses/activates. One venue active, another paused.
- **Availability**: Each venue can set different hours.
- **Title/Description override**: Optional, venue-specific. Not shown by default in the expandable view; accessible via Item Editor per-venue section as expandable fields.

### 4.6 Menu Sharing Model

**Principle:** Business level controls structure. Venues control pricing and operational status.

**What the business-level menu controls:**
- Menu name, categories, category order
- Which items are in the menu, item order
- Item names, descriptions, images
- Modifier group definitions and attachment

**What venues can override on a shared menu:**
- Price per item (creates a venue-level override of the default price)
- Item status (pause/activate — e.g., venue ran out of an ingredient)
- Item availability schedule
- Menu hours (venue may serve lunch until 15:00 instead of 14:00)

**What venues cannot change on a shared menu:**
- Add/remove categories
- Add/remove items
- Reorder categories or items
- Change item names, descriptions, images
- Change modifier definitions

If a venue needs structural differences, they create a **local menu** alongside the shared one.

### 4.7 Collection Sharing Model

**Principle:** Same as menu sharing — business controls membership, venues control pricing and status.

**What a collection is:** A named, flat list of products. No hours, no categories, no internal ordering. Simpler than a menu.

**What the business-level collection controls:**
- Collection name
- Which products are in the collection (add/remove)
- Product names, descriptions, images (via the shared product definition)

**What venues can override on products received via a collection:**
- Price per product
- Product status (pause/activate)
- Product availability schedule

**What venues cannot change on a shared collection:**
- Add/remove products from the collection
- Change product names, descriptions, images

**Products can arrive at a venue from multiple sources:** A product might be in the "Core Range" collection AND directly assigned AND in another collection. Removing the product from one collection doesn't remove it from the venue if another source still provides it.

**When to use collections vs direct assignment:**
- Collections: "I want to manage a named assortment and control which stores carry it." Ongoing, group-level management.
- Direct assignment (bulk or individual): "I want to put these specific products in this specific store." Ad-hoc, product-level.

### 4.8 Override Confirmation (Business-Level Edits)

When a business-level user saves a change to a field that has venue overrides:

1. System detects which venues have overridden the affected field.
2. **Override Confirmation Modal** (Page 14) appears showing count and options.
3. Business owner chooses: apply to all (replace overrides) or apply only to non-overridden venues.
4. Changes propagate accordingly.

**Passive indicator:** Before editing, the Item Editor shows override state: "Price: $12.00 · overridden at 2 venues". This gives visibility without requiring action.

---

## 5. Design Decisions

### 5.1 Why Not Configurable Venue Permissions on Shared Menus

We considered allowing the business level to configure what each venue can change on a shared menu (e.g., toggle permissions for "can add items", "can remove items", "can reorder"). We decided against this for the following reasons:

1. **Undermines the value of sharing.** The point of a shared menu is that the business owner can trust every venue has the same structure. If venues can add items, remove items, and rearrange categories, the menus diverge within weeks. The "shared menu" becomes a fiction — each venue's actual menu is different from the template, and the business owner has no reliable view of what any venue looks like.

2. **Propagation becomes dangerous.** When the business adds a seasonal item, where does it land at a venue that restructured its categories? When the business removes an item, does it also get removed at a venue that moved it to a different category? Every combination of venue-level structural change creates edge cases for propagation.

3. **Mental model overload.** Venue managers would need to learn which fields they can edit, which depends on settings they didn't configure, which may change at any time. "I can edit price and status, and also categories if the business allowed it, but not modifiers unless that's toggled on too" is too many conditional rules.

4. **Cleaner alternative exists.** Venues that genuinely need a different menu structure can create a local menu alongside the shared one. Two menus, each with a clear owner, is simpler than one menu with blurry ownership.

The fixed split — business controls structure, venues control pricing and operational status — provides a single, learnable model. Configurable permissions remain a viable future enhancement once the base sharing model is validated.

---

## 6. Prototype Seed Data

### Scenario 1: Mario's Pizzeria (Single-venue restaurant)

**Venue:** Mario's Pizzeria, 123 Main St

**Menus:**
- Lunch Menu (Mon–Fri 11:00–15:00, Active)
- Dinner Menu (Mon–Sun 17:00–22:00, Active)

**Lunch Menu Categories + Items:**
- Starters: Spring Rolls ($8.50, Active), Bruschetta ($7.00, Active), Garlic Bread ($5.50, Paused until 15:00)
- Mains: Margherita Pizza ($14.00, Active), Pepperoni Pizza ($16.00, Active), Pasta Carbonara ($15.00, Active)
- Drinks: Coke ($3.00, Active), Sparkling Water ($2.50, Active)

**Dinner Menu Categories + Items:**
- Appetizers: Caprese Salad ($9.00, Active), Soup of the Day ($7.50, Active)
- Entrees: Margherita Pizza ($14.00), Truffle Mushroom Pizza ($19.00), Osso Buco ($24.00)
- Desserts: Tiramisu ($8.00), Panna Cotta ($7.00)

**Modifier Groups:**
- Pizza Size: Small (–$2.00) / Medium ($0.00) / Large (+$3.00) — required, pick 1. Attached to all pizzas.
- Extra Toppings: Mushrooms (+$1.50) / Olives (+$1.00) / Peppers (+$1.00) / Extra Cheese (+$2.00) — optional, pick 0–4. Attached to all pizzas.
- Spice Level: Mild / Medium / Hot — required, pick 1. Attached to Spring Rolls.

**Bundles:**
- Lunch Combo: Any pizza + any drink, $15.00

---

### Scenario 2: Bloom & Co (Single-venue flower shop)

**Venue:** Bloom & Co, 45 Garden Ave

**Categories:** Bouquets, Single Stems, Plants, Arrangements

**Items (all in All Items table, no menus):**
- Red Roses Bouquet ($29.99, Active, Bouquets)
- Sunflower Bunch ($19.99, Active, Bouquets)
- White Lily Single ($4.99, Active, Single Stems)
- Orchid Plant ($34.99, Paused · 1 week, Plants)
- Succulent Trio ($22.00, Active, Plants)
- Wedding Table Arrangement ($89.99, Inactive, Arrangements)
- Birthday Bouquet ($39.99, Active, Bouquets)

---

### Scenario 3: Burger Chain (Multi-venue restaurant)

**Business:** Burger Chain Inc.

**Venues:**
- Downtown (101 Center Blvd)
- Airport (Terminal 2, Gate B)
- Mall (Westfield Shopping, Food Court)

**Shared Menu (created at business level, shared to all 3 venues):**
- "All Day Menu" (Mon–Sun 10:00–22:00, Active)
- Categories: Burgers, Sides, Drinks
- Shared to: Downtown, Airport, Mall

**Items + Per-venue offer data:**

| Product | Default Price | Downtown | Airport | Mall |
|---|---|---|---|---|
| Classic Burger | $12.00 | $12.00 (default) | $14.50 (override) | $12.00 (default) |
| Cheese Burger | $13.50 | $13.50 (default) | $16.00 (override) | $13.50 (default), Paused |
| Veggie Wrap | $10.00 | $10.00 (default) | Not Sold | $10.00 (default) |
| Chicken Tenders | $9.00 | $9.00 (default) | $11.00 (override) | $9.00 (default) |
| Fries (Regular) | $4.00 | $4.00 (default) | $5.50 (override) | $4.00 (default) |
| Milkshake | $6.00 | $6.00 (default) | $7.50 (override) | $6.00 (default), Out of Stock |

**Local menu (Downtown only):**
- "Happy Hour Specials" (Mon–Fri 16:00–18:00, Active) — 2 items with discounted prices

**Modifier Groups (shared):**
- Burger Doneness: Rare / Medium / Well Done — required, pick 1
- Add-ons: Bacon (+$2.00) / Avocado (+$1.50) / Extra Patty (+$3.00) — optional, pick 0–3

---

### Scenario 4: QuickStop Convenience (Hybrid, 2 venues)

**Business:** QuickStop Stores

**Venues:**
- Main St (full store)
- Station Kiosk (smaller selection)

**Collections (shared from business level):**
- "Essentials" collection (shared to both venues): Coca-Cola 330ml, Mixed Nuts 200g, Aspirin 20-pack
- "Tech Accessories" collection (shared to Main St only): Phone Charger Cable, USB-C Adapter

**Additional direct assignments:**
- Organic Juice 500ml ($3.99, Active, Beverages) — Main St only, directly assigned (not in a collection)

**Retail Items in All Items table:**
- Coca-Cola 330ml ($2.50, Active, Beverages) — both venues, source: Collection (Essentials)
- Mixed Nuts 200g ($4.50, Active, Snacks) — both venues, source: Collection (Essentials)
- Organic Juice 500ml ($3.99, Active, Beverages) — Main St only, source: Direct
- Aspirin 20-pack ($5.99, Active, Health) — both venues, source: Collection (Essentials)
- Phone Charger Cable ($12.99, Active, Electronics) — Main St only, source: Collection (Tech Accessories)
- USB-C Adapter ($9.99, Active, Electronics) — Main St only, source: Collection (Tech Accessories)

**Deli Menu (prepared food, Main St only — shared from business level to Main St only):**
- "Deli Menu" (Mon–Sun 07:00–20:00, Active)
- Categories: Sandwiches, Salads
  - Turkey Club Sandwich ($8.99, Active)
  - BLT ($7.99, Active)
  - Caesar Salad ($9.50, Active)

**Modifier Groups:**
- Bread Type: White / Wheat / Sourdough — required, pick 1 (attached to sandwiches)
- Salad Dressing: Ranch / Vinaigrette / None — required, pick 1 (attached to salads)

---

## 7. Prototype Page Summary (Quick Reference)

| # | Page/Panel | Type | When Visible |
|---|---|---|---|
| 0 | Scenario Selector | Full page | Prototype entry only |
| 1 | Venues tab | Tab content | Multi-venue, business level |
| 2 | All Items tab (Business) | Tab content | Multi-venue, business level |
| 3 | Menus tab (Business) | Tab content | Multi-venue, business level (restaurant + hybrid) |
| 3a | Share to Venues modal | Modal overlay | From business-level Menus tab, Collections tab, or detail pages |
| 3b | Collections tab (Business) | Tab content | Multi-venue, business level (new vertical + hybrid) |
| 3c | Collection Detail (Business) | Full page (from Collections tab) | After selecting a business-level collection |
| 4 | Menu Detail (Business) | Full page (from Menus tab) | After selecting a business-level menu |
| 5 | Menu Detail (Venue) | Full page (default Menus tab view) | Default view for venue-level Menus tab; auto-selects active menu |
| 5a | Manage All Menus (Venue) | Sub-view (from Menu Switcher) | Via "Manage all menus" in Menu Switcher dropdown |
| 6 | All Items tab (Venue) | Tab content | Venue-level, all verticals |
| 7 | Item Editor | Slide-over | From any items context |
| 8 | Modifiers tab / Library | Tab content | All contexts |
| 9 | Modifier Group Editor | Slide-over | From library or item editor |
| 10 | Bundles tab / List | Tab content | Restaurant + hybrid |
| 11 | Bundle Editor | Slide-over | From bundle list |
| 12 | Categories tab / Manager | Tab content | New vertical + hybrid |
| 13 | Pause Modal | Modal overlay | From any status badge |
| 14 | Override Confirmation Modal | Modal overlay | Business-level save with venue overrides |

**Total: 18 distinct page/panel states.**
