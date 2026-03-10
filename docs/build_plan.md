# Full Prototype Build Plan

> Build the complete clickable grayscale prototype covering all 4 merchant scenarios, 18 page states, and full interactive flows — with drag-and-drop and inline editing deferred to the final phase so core flows are testable early.

---

## Tech Stack

- **Next.js 14** (App Router) + React 18
- **Tailwind CSS** with a strict grayscale palette (black, white, slate grays)
- **shadcn/ui** for base components (Table, Button, Dialog, Sheet, DropdownMenu, Select, Badge, Tabs, etc.)
- **dnd-kit** for drag-and-drop (Phase 7 only)
- **zustand** for client-side state management (all seed data in-memory, no backend)
- All data resets on page reload — no persistence needed

---

## Architecture

**Key state management approach:** A single zustand store holds all demo data (businesses, venues, products, offers, menus, collections, modifiers, bundles). The scenario selector seeds the store. A `context` slice tracks: current scenario, current level (business/venue), current venue ID, active tab. All components read from this shared state.

**Component hierarchy:**
- Scenario Selector → picks merchant → enters App Shell
- App Shell (TopBar + TabBar + Breadcrumb) → renders tab content based on context
- Business-Level Tabs: Venues, All Items (Expandable Rows), Menus, Collections, Modifiers, Bundles
- Venue-Level Tabs: Menus / Menu Detail, All Items, Categories, Modifiers, Bundles
- Slide-overs (Item Editor, Modifier Group Editor, Bundle Editor) open from any tab context
- Modals (Pause, Override Confirmation, Share to Venues, New Menu, etc.) triggered by actions

---

## Build Phases

Phases are ordered so that core flows are testable after each phase. Drag-and-drop and inline editing come last.

### Phase 1: Foundation (Shell + Navigation + Seed Data)

- Next.js project setup, Tailwind config (grayscale palette), shadcn/ui init
- Scenario Selector page (4 cards)
- App Shell: top bar, horizontal tab bar (contextual), breadcrumb, slide-over container
- Venue Switcher dropdown (multi-venue only)
- Tab switching logic: business-level vs venue-level tab sets, adapting by vertical type
- Zustand store with full seed data for all 4 scenarios (data model matching `domain-architecture-and-requirements.md` entities)
- Drill-down from venue card to venue level + back via breadcrumb

### Phase 2: Single-Venue Restaurant (Mario's Pizzeria)

- Menu Detail page: category-grouped item table with status badges, modifier indicators
- Menu Switcher dropdown (swap between menus, "Manage all menus", "Create Menu")
- Manage All Menus sub-view (list of menus with hours/status)
- New Menu modal (name + hours + status)
- Item Editor slide-over: all sections (Basic Info, Price/Availability, Category, Modifiers, Status)
- Create item flow (from within a menu category)
- Pause Modal with duration options + resume flow
- Menu Settings modal
- Reorder via up/down arrow buttons (placeholder for drag-and-drop)

### Phase 3: Modifiers + Modifier Library

- Modifiers tab: list of all modifier groups with option count, usage count, status
- Modifier Group Editor slide-over: name, rules (required/min/max), options list with price deltas and status
- Attach modifier from Item Editor (picker: existing groups + "Create New")
- Pause individual modifier options

### Phase 4: Single-Venue New Vertical (Bloom & Co)

- All Items tab (venue level): flat table with image, name, category, price, status, availability
- Toolbar: search, filter by status, filter by category
- Item Editor reuse (same component, non-menu context)
- Categories tab: list with inline rename, reorder (up/down buttons), item counts
- Click category item count to filter All Items

### Phase 5: Multi-Venue Restaurant (Burger Chain)

- Venues tab: venue cards with name, address, item count, status
- Business All Items with expandable rows: collapsed aggregate row (price range, status summary, venue count) + venue sub-rows (price, status, availability, "Add to venue" / "Not sold")
- Item Editor in business context: shared fields + per-venue section with override indicators ("Overridden at X venues")
- Override Confirmation Modal (apply to all vs preserve overrides)
- Business-level Menus tab: shared menu list with "Shared to X venues" indicators
- Menu Detail in business context: full structural editing + shared-to indicator
- Share to Venues modal (reusable for menus and collections)
- Venue-level Menu Detail for shared menus: shared banner, structural fields read-only, price/status editable
- Local menu creation at venue level
- Venue Switcher full functionality (jump between venues, return to business level)
- Bulk actions on Business All Items: multi-select + "Add to venues" / "Pause at all venues"

### Phase 6: Hybrid + Collections (QuickStop Convenience)

- Collections tab (business level): collection list with product count, sharing status
- Collection Detail: product table, "Add Products" picker, remove products, share to venues
- Source column on venue-level All Items: "Collection: X" / "Menu: Y" / "Direct"
- Hybrid tab config (both Menus and Collections visible)
- Bundles tab + Bundle Editor slide-over (both venue and business level)

### Phase 7: Drag-and-Drop + Inline Editing (Polish)

- Replace up/down arrow buttons with dnd-kit drag handles on:
  - Category headers in Menu Detail (reorder categories)
  - Item rows in Menu Detail (reorder within category, move between categories)
  - Category list in Categories tab
- Inline click-to-edit on table cells:
  - Price cells in venue sub-rows (Business All Items)
  - Price cells in venue-level Menu Detail (shared menu overrides)
  - Category names in Categories tab
- Visual polish: row dimming for paused items, smoother transitions, focus states

---

## File Structure

```
src/
  app/
    page.tsx                    (Scenario Selector)
    [scenario]/
      layout.tsx                (App Shell: top bar, tabs, breadcrumb, slide-over)
      page.tsx                  (redirects to default tab)
  components/
    shell/
      TopBar.tsx
      TabBar.tsx
      Breadcrumb.tsx
      VenueSwitcher.tsx
    tabs/
      VenuesTab.tsx
      AllItemsBusinessTab.tsx
      AllItemsVenueTab.tsx
      MenusBusinessTab.tsx
      MenuDetail.tsx
      ManageAllMenus.tsx
      CollectionsTab.tsx
      CollectionDetail.tsx
      ModifiersTab.tsx
      BundlesTab.tsx
      CategoriesTab.tsx
    editors/
      ItemEditor.tsx            (slide-over)
      ModifierGroupEditor.tsx   (slide-over)
      BundleEditor.tsx          (slide-over)
    modals/
      PauseModal.tsx
      OverrideConfirmModal.tsx
      ShareToVenuesModal.tsx
      NewMenuModal.tsx
      NewCollectionModal.tsx
      ProductPickerModal.tsx
      QuickAddOfferModal.tsx
    shared/
      StatusBadge.tsx
      ExpandableRow.tsx
      ReorderButtons.tsx
  store/
    index.ts                    (zustand store definition)
    types.ts                    (TypeScript types for all entities)
    seedData.ts                 (all 4 scenario datasets)
    selectors.ts                (derived data: aggregates, overrides, etc.)
```

---

## What is Testable After Each Phase

| After Phase | What You Can Test |
|---|---|
| 1 | Navigation model: tab switching, venue drill-down, breadcrumb, venue switcher |
| 2 | Full single-venue restaurant flows: create menu, add items, modifiers, pause, menu switching |
| 3 | Modifier library management, attach/detach from items |
| 4 | Full single-venue new vertical flows: all items table, categories, item editing |
| 5 | Full multi-venue flows: expandable rows, shared menus, overrides, venue drill-down |
| 6 | Full hybrid flows: collections, menus + retail in one system, bundles |
| 7 | Final polish: drag-and-drop reordering, inline editing |

---

## Reference Documents

- [Domain Architecture & Requirements](domain-architecture-and-requirements.md) — entity definitions, relationships, domain rules
- [Solution Proposal](solution_proposal.md) — information architecture, page inventory, flows, system states, seed data
- [UX Walkthrough](ux_walkthrough.md) — plain-language merchant experience walkthroughs
