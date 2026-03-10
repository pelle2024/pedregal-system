# Merchant Product Management Platform — Domain Architecture & Requirements (Draft)

> Purpose: Define the **domain architecture**, **entities**, **relationships**, **capabilities**, and **merchant-type-driven variability** for a merchant platform that manages products sold across venues.
>
> Non-goal: This is **not** a proposed UX or solution design. It’s a structured definition of the ecosystem and what must exist for a full working flow.

---

## 1) Core Concepts & Scope

### 1.1 Actors (Who uses the platform)
- **Merchant User**: a person (or system user) who manages one or more venues for a merchant/business.
- **Business-level user**: has access to multiple venues (possibly across countries).
- **Venue-level user**: has access to a single venue.

### 1.2 Core commerce objects (What is managed)
- **Product**: the master definition of a sellable item (title, description, image, etc.).
- **Offer**: a product *as sold at a specific venue*, including price and sellability constraints.
  - A Product may exist even if not currently sold in any venue.
  - An Offer is the venue-specific activation of a Product.
- **Menu**: a structured consumer-facing ordering surface (mostly restaurant-oriented), containing categories, items, hours, and modifier usage.
- **Category**: a grouping used on consumer side to organize items.
- **Modifier Group / Modifier Option**: choice sets attached to Products/Offers, used in ordering customization.
- **Bundle**: a priced grouping of 2–4 items, typically used as a packaged deal.

### 1.3 Merchant types (Drive dynamic complexity)
Merchant “shape” determines which objects must be present and what complexity is required:
- **Single venue restaurant**
- **Single venue new vertical (grocery/electronics/flower shop)**
- **Multi venue restaurant** (similar menus + slight changes)
- **Multi venue new verticals** (different selections per store)
- **Hybrid merchants** (e.g., convenience chain: grocery catalog + prepared food menu)

---

## 2) Hierarchy & Navigation Levels

### 2.1 Structural hierarchy
- **Business** (aka Merchant Org)
  - **Venue Grouping** (optional concept; e.g., regions/countries/brands) *(optional but common in multi-country chains)*
  - **Venue** (store/restaurant location)
    - **Offer Set** (the set of products actively sold at that venue)
    - **Menus** (optional depending on vertical)
    - **Venue-specific overrides** (hours, availability rules, special pricing, etc.)

### 2.2 Required navigation paradigm (capability requirement, not UX)
Platform must support:
- **Business-level management**
  - View and manage multiple venues and what they sell in one place.
  - Bulk / shared operations (where allowed by domain rules).
- **Venue-level management**
  - Drill down into a single venue and manage it standalone.
- **Dynamic default entry**
  - If user only has one venue: default to **venue level** and do not expose business-level navigation.
  - If user has multiple venues: allow entry at business level with drill-down.

---

## 3) Entity Model (Domain Objects)

> This section defines **entities**, their **attributes**, and **relationships**. Attributes listed are the minimum from the prompt; “extensible fields” indicate placeholders for future needs.

### 3.1 Business (Merchant Org)
**Definition:** The top-level merchant entity which may own one or many venues.

**Key attributes**
- business_id
- legal_name / display_name
- vertical_type(s): `restaurant | grocery | electronics | flower | hybrid | other`
- operating_countries / currencies (for multi-country businesses)
- default_language (optional)

**Relationships**
- Business **has many** Venues
- Business **has many** Products (master catalog) *(strongly needed for grocery / large merchants)*
- Business **has many** Users (with permissions) *(permissions model out of scope but implied)*

---

### 3.2 Venue
**Definition:** A single physical (or virtual) location that sells items.

**Key attributes**
- venue_id
- business_id (FK)
- venue_name / store_name
- address / geo (optional)
- timezone
- operational_status (active/inactive)
- venue hours (base hours; menus may have their own hours)

**Relationships**
- Venue **has many** Offers (venue assortment)
- Venue **has zero or many** Menus (restaurants typically require at least one)
- Venue **may have** local overrides of product info via Offer fields

---

### 3.3 Product (Master)
**Definition:** A reusable item definition that may or may not be sold at one or more venues.

**Key attributes**
- product_id
- business_id (FK)
- title
- description
- image(s)
- base metadata (extensible):
  - sku / external_id (common in grocery)
  - brand (common in retail)
  - unit size, weight, etc. (retail)
  - dietary tags, allergens (restaurant)
- default category mapping (optional; category usage may be menu-specific)
- modifier connections (see Modifiers)
- base availability template (optional; often overridden at Offer/Menu levels)

**Relationships**
- Product **has zero or many** Offers (across venues)
- Product **has zero or many** Modifier Groups attached
- Product **may be included in** Bundles (via Offer or Product reference depending on pricing rules)
- Product **may be placed in** Menus (via Offer reference for venue-specific price)

**Notes**
- Products can exist **without** being active in any venue (important for large grocery catalogs).
- Restaurants may primarily manage “active” items; grocery may manage large “inactive/not-yet-shared” catalogs.
- **Single-venue restaurant-facing flows should not expose Product vs Offer**: item creation happens in-menu and is persisted internally as Offer (+ optional backing Product).

---

### 3.4 Offer (Venue-specific Sellable)
**Definition:** A Product that is **attached to a Venue** with sellable properties, chiefly **price** and **availability**.

**Key attributes**
- offer_id
- venue_id (FK)
- product_id (FK)
- price (required for selling)
- currency (if multi-country)
- availability rules (see Availability model)
- discount (optional; can be offer-level)
- venue overrides (optional):
  - title override, description override, image override (if allowed)
  - tax category / deposit fee (retail)
- status: `active | inactive | draft` (recommended)

**Relationships**
- Offer **belongs to** a Venue
- Offer **references** a Product
- Offer **may appear in** Menus (restaurant flow)
- Offer **may appear in** non-menu retail assortment (grocery flow)
- Offer **may participate in** Bundles (bundle is priced grouping)

**Key distinction**
- **Product** = master definition
- **Offer** = venue-specific sellable instance (product + price + constraints)

---

### 3.5 Menu
**Definition:** A structured, consumer-facing ordering construct, primarily required for restaurant (and hybrid prepared food).

**Key attributes**
- menu_id
- venue_id (FK)
- menu_name (e.g., Lunch, Dinner)
- menu_hours (open hours specific to menu)
- status: `active | inactive | draft`
- sorting configuration:
  - category order
  - item order within category
- pricing mode (optional):
  - whether prices are read from Offer or overridden at menu-level (see “Menu Item” below)

**Relationships**
- Menu **belongs to** Venue
- Menu **has many** Menu Categories (ordered)
- Menu Category **has many** Menu Items (ordered)
- Menu Items reference Offers (preferred) or Products (if offers are derived)

**Notes**
- Menus can differ by time (lunch vs dinner), potentially with different prices.
- A menu must support modifiers through product/modifier relationships.

---

### 3.6 Menu Category (Menu-scoped category placement)
**Definition:** Category as used within a specific Menu, including ordering.

**Key attributes**
- menu_category_id
- menu_id (FK)
- category_id (FK)
- display_name override (optional)
- sort_order / position

**Relationships**
- Menu Category **references** a Category
- Menu Category **contains** Menu Items

---

### 3.7 Menu Item (Placement of Offer in Menu)
**Definition:** The presence of a specific sellable item in a menu category, with ordering and potential menu-specific overrides.

**Key attributes**
- menu_item_id
- menu_category_id (FK)
- offer_id (FK) *(preferred)*
- sort_order / position
- menu-specific price override (optional, if allowed)
- menu-specific availability override (optional)
- visibility flags (optional: hidden, featured, etc.)

**Relationships**
- Menu Item **references** Offer (which references Product)
- Menu Item inherits modifier configuration from Product/Offer linkage

---

### 3.8 Category (Global or Business-scoped)
**Definition:** A grouping used to categorize products for consumer presentation.

**Key attributes**
- category_id
- business_id (FK) *(assumed, categories may differ by merchant)*
- name
- description (optional)
- type (optional): `restaurant_menu | retail_aisle | collection | other`
- status

**Relationships**
- Category **contains** Products (logical association)
- In menus, Category is used via Menu Category (menu-scoped ordering)

**Note**
- Categories behave differently across verticals:
  - Restaurants: categories are menu structure primitives.
  - Grocery: categories could represent aisles, taxonomy, or curated collections.

---

### 3.9 Modifiers

#### 3.9.1 Modifier Group
**Definition:** A named set of choices the consumer can make for an item.

**Examples**
- “Select spice level”
- “Add a drink”
- “Choose your side”

**Key attributes**
- modifier_group_id
- business_id (FK)
- name
- selection rules (extensible; at minimum capture):
  - min_selections
  - max_selections
  - required (boolean)
- display rules (optional): single-select / multi-select
- status

**Relationships**
- Modifier Group **has many** Modifier Options
- Modifier Group **is attached to** Product (or Offer if venue-specific)

#### 3.9.2 Modifier Option
**Definition:** A selectable option within a Modifier Group.

**Key attributes**
- modifier_option_id
- modifier_group_id (FK)
- name (e.g., Mild / Medium / Hot)
- price_delta (optional; common)
- default_selected (optional)
- status

**Relationship**
- Option **belongs to** a Modifier Group

#### 3.9.3 Attachment model (critical domain requirement)
Modifiers are “standalone objects” but always used via connection to products:
- Product ↔ Modifier Group attachment
  - supports reuse across multiple products
- Optionally Offer ↔ Modifier Group attachment
  - needed when a venue has a different modifier set than other venues

---

### 3.10 Bundles

**Definition:** A bundle connects 2–4 items and assigns a bundle price.

**Key attributes**
- bundle_id
- business_id (FK) or venue_id (FK) *(depending on whether bundles can be reused across venues)*
- title / display name
- description (optional)
- included items: 2–4 references (see below)
- bundle_price
- availability (bundle-level)
- status

**Bundle composition references**
- Preferred: bundle references **Offers** (so price/availability is venue-specific and explicit)
- Alternative: bundle references **Products** with offer resolution at venue (more complex)

**Relationships**
- Bundle **includes** Offers (2–4)
- Bundle **may appear in** Menu (as a Menu Item-like entity) or be treated as an Offer-like sellable

---

## 4) Availability Model (Shared Requirement)

Availability exists at multiple layers (domain must support at least these):
- **Offer availability**: when product is sellable at a venue.
- **Menu hours**: when a menu is active (restaurant).
- **Menu item availability** (optional override): special case for an item only available at certain times.

**Availability attributes (minimum)**
- schedule (days of week + time ranges)
- start_date / end_date (optional)
- timezone reference (use venue timezone)
- temporary pause (boolean + reason optional)

**Inheritance rules (domain-level)**
- If Menu is inactive due to hours → items in that menu are not sellable through that menu.
- If Offer is inactive → item not sellable, even if placed in an active menu.
- If Menu Item has override availability → it further restricts sellability.

---

## 5) Discount Model (Minimum placeholder)

Discount may be applied to:
- Offer (venue-specific discount)
- Bundle (bundle-specific price is itself a kind of discount)
- Potential future: menu-level promotions or business-level campaigns

**Discount attributes (minimum placeholder)**
- discount_type: `amount_off | percent_off | fixed_price | other`
- value
- start/end (schedule)
- stacking rules (out of scope but should exist as placeholder)

---

## 6) Variation by Merchant Type (Dynamic Requirements)

This section defines **which entities are required** and **which flows must exist** based on merchant type.

### 6.1 Single venue restaurant
Must support:
- Venue-level by default
- Offers (price, availability) *(internally may use Product + Offer, but not exposed)*
- Menus (at least one)
- Categories (menu categories)
- Modifiers (high importance)
- Bundles (optional but common)

Key emphasis:
- Menu editing, category ordering, item ordering, modifier attachment

---

### 6.2 Single venue new vertical (grocery/electronics/flower)
Must support:
- Venue-level by default
- Products (can be large even for single venue)
- Offers (assortment + price)
- Categories (taxonomy / aisles / collections)
- Menu: optional (generally not required)

Key emphasis:
- High-scale product creation/editing
- Managing active assortment vs full catalog

---

### 6.3 Multi venue restaurant (similar menus with slight changes)
Must support:
- Business-level management + drilldown
- Shared Products across venues (reusable catalog)
- Offers per venue (price differences, availability, slight variations)
- Menu reuse patterns (conceptual requirement):
  - ability to have “same menu structure with slight changes”
- Modifiers shared across items/venues where possible

Key emphasis:
- Multi-venue consistency with venue-level overrides

---

### 6.4 Multi venue new verticals (several stores with different selections)
Must support:
- Business-level management + drilldown
- Large shared product catalog
- Venue-specific Offer sets (assortments vary by store)
- Collections (menu-like but retail-friendly) as optional construct

Key emphasis:
- Managing which products are attached to which venues (Offer creation at scale)

---

### 6.5 Hybrid merchants (e.g., convenience chain with grocery + food menu)
Must support:
- Both “retail assortment” and “restaurant menu” constructs in same business
- Some products sold as retail items (no menu needed)
- Some items sold through menus with modifiers (prepared food)

Key emphasis:
- Clear separation or tagging of product types and their selling surfaces

---

## 7) Cross-Cutting Capability Requirements (What must be possible)

> These are platform capabilities implied by your requirements, expressed at a domain level (not UX).

### 7.1 Level-aware experience (business vs venue)
- Identify if user has 1 venue or many.
- Default to venue-level for single-venue users.
- Provide business-level views for multi-venue users.

### 7.2 Manage master catalog vs active assortment
- Create/manage Products that are not attached to a venue (not yet sold).
- Attach Products to Venues to create Offers (activate for sale).
- Detach/deactivate Offers without deleting Products.

### 7.3 Menu management (restaurant & hybrid)
- Create multiple Menus per venue (Lunch/Dinner etc).
- Configure menu hours.
- Order categories within menu.
- Order items within category.
- Ensure modifiers can be used for menu items.

### 7.4 Modifier management
- Create Modifier Groups and Options independently.
- Attach modifier groups to products (and optionally offers).
- Allow reuse of modifier groups across many products.

### 7.5 Bundle management
- Create Bundles containing 2–4 items.
- Price bundles.
- Make bundle availability controllable.

### 7.6 Category management
- Define categories.
- Use categories in menus (ordered).
- Use categories for retail taxonomy or collections (optional but supported).

### 7.7 Scale considerations (restaurant 50 items vs grocery 10,000 items)
- Domain must support:
  - large catalogs
  - many offers across venues
  - multi-country complexity (currency, language placeholders)

---

## 8) Relationship Map (Compact)

- Business 1 → N Venues
- Business 1 → N Products
- Venue 1 → N Offers
- Offer N → 1 Product
- Venue 1 → N Menus (optional)
- Menu 1 → N Menu Categories (ordered)
- Menu Category N → 1 Category
- Menu Category 1 → N Menu Items (ordered)
- Menu Item N → 1 Offer
- Product N ↔ N Modifier Groups (via attachment)
- Modifier Group 1 → N Modifier Options
- Bundle 1 → 2..4 Offers (or Products, but offers recommended)

---

## 9) Domain Rules & Invariants (Minimum)

1. **An Offer must reference exactly one Product and one Venue.**
2. **A Product can exist with zero Offers.**
3. **A Menu belongs to a Venue.**
4. **A Menu Item should reference an Offer (venue-priced sellable).**
5. **A modifier group can be created standalone, but must be attached to a Product/Offer to be used.**
6. **Availability is restricting across levels**: Offer availability AND Menu hours AND Menu Item overrides (if any).
7. **Bundles contain 2–4 items** and have their own price.

---

## 10) Glossary (Strict)

- **Business / Merchant Org**: top-level merchant entity owning multiple venues.
- **Venue**: store/restaurant location.
- **Product**: master item definition, reusable, may be inactive (not sold anywhere).
- **Offer**: product attached to a venue with price + sellability (what’s actually sold).
- **Menu**: restaurant-oriented consumer ordering structure with hours and ordering.
- **Category**: grouping for consumer display; may be menu-scoped ordering.
- **Modifier Group**: named set of options controlling customization (rules: min/max, required).
- **Modifier Option**: a specific selectable choice within a group.
- **Bundle**: 2–4 item grouping sold for a price.

---

## 11) Open Extension Points (Intentionally Not Solved Here)

These are not solutions, just placeholders where complexity usually appears:
- Permissions / roles (business admin vs venue manager)
- Localization (multiple languages), multi-currency pricing
- Inventory / stock (retail)
- Tax / deposits / bottle fees (retail)
- Compliance fields (allergens, nutrition, age restriction)
- Advanced promo stacking and discount rules
- Product variants (size/color) and attribute schemas (retail)

---

## 12) Prototype Flow Coverage Checklist (for later solution/prototype)

Use this as a completeness checklist for the eventual prototype:
- [ ] **Single venue restaurant:** create menu → create categories → create items in-menu (Offer) → add modifiers → set menu hours → pause item/modifier
- [ ] **Single venue grocery:** create product (optional catalog) → create/update offer (price/availability/status) → pause item
- [ ] **Multi venue restaurant:** shared product/modifiers → create/update offers per venue → shared menu structure + venue overrides
- [ ] **Multi venue grocery:** master catalog → attach subsets to different venues (offers) → manage per-venue price/status
- [ ] **Hybrid:** retail assortment + restaurant menu + modifiers + bundles in same business

---

## 13) Core User Flows (Behavioral Requirements)

> These are end-to-end flows that must be supported by the platform, expressed as domain actions.
> Note: The backend may still use Product + Offer, but flows for some merchant types should **not expose** that separation.

---

### 13.1 Single Venue Restaurant — Core Flows

#### Flow SVR1: Create menu and create items directly inside it (no separate product creation flow)
- **Goal:** Merchant builds a menu by creating categories and items that are immediately sellable.
- **Preconditions:** Venue exists. Merchant has single-venue context by default.
- **Behavioral requirements:**
  1. Merchant creates (or selects) a **Menu** (name + hours).
  2. Merchant creates **Categories** in the menu and sets category order.
  3. Merchant creates **Items directly in the menu** with:
     - image, title, description, price, category placement, availability rules
  4. System persists domain objects such that:
     - Item creation results in a sellable venue-scoped entity (**Offer**), and optionally a backing **Product** internally.
- **Result:** Items are sellable through the menu during menu hours.
- **Notes (domain constraint):**
  - Even if the system stores Product + Offer, the merchant should experience a single “create item” flow.

#### Flow SVR2: View and manage menu via a category/item table
- **Goal:** Merchant can quickly audit and manage menu content.
- **Preconditions:** Menu exists with categories and items.
- **Required management view capabilities (table):**
  - Grouped by **Category** (category row/section)
  - For each item row show at minimum:
    - item image, item name, item price
    - item status (live/hidden/paused/out-of-stock)
- **Result:** Merchant can scan, reorder, and access item editing quickly.

#### Flow SVR3: Reorder categories and items
- **Goal:** Adjust consumer-facing ordering.
- **Preconditions:** Items exist in categories.
- **Steps:**
  1. Update **category order** within menu.
  2. Update **item order** within each category.
- **Result:** Ordering changes without deleting items.

#### Flow SVR4: Edit an item from the table (item detail management)
- **Goal:** Merchant edits full item definition.
- **Preconditions:** Item exists and appears in the table.
- **Steps:**
  1. Merchant selects an item row to open **item management** context.
  2. Merchant can update:
     - price, title, description, image
     - category assignment (move between categories)
     - availability schedule
     - status (active/inactive/paused)
     - attached modifiers (see SVR5)
- **Result:** Changes apply to the sellable venue-scoped item (Offer), and product fields if the backend uses Product.

#### Flow SVR5: Create and attach modifiers to items (from either modifiers area or item edit)
- **Goal:** Allow customization (spice level, add-ons, etc.).
- **Preconditions:** At least one item exists.
- **Behavioral requirements:**
  - Merchant can create **Modifier Groups** (min/max, required) and **Options** (price delta optional).
  - Merchant can attach modifiers:
    - from a modifier management context (attach to item), OR
    - from item edit context (create/attach while editing item)
- **Result:** Item supports ordering customizations.

#### Flow SVR6: Temporarily disable items or modifiers when out of stock
- **Goal:** Merchant can pause selling an item or modifier option for a defined time.
- **Preconditions:** Item/modifier exists.
- **Steps:**
  1. Merchant toggles item (or modifier/option) to **paused/out-of-stock**.
  2. Merchant can optionally set a **duration** (e.g., 24 hours, 1 week) after which it can return to active (automatic vs manual is a later solution choice).
- **Result:** Item/modifier is not sellable while paused.
- **Notes (domain):**
  - Status must exist at least on Offers and Modifier Options; optionally on Modifier Groups too.

#### Flow SVR7: Edit menu settings and switch menus quickly
- **Goal:** Manage multiple menus (lunch/dinner) without friction.
- **Preconditions:** Venue has 1+ menus.
- **Behavioral requirements:**
  - Merchant can edit **menu settings** (menu name, hours, status).
  - Merchant can **switch active working context** between menus quickly (toggle/selector concept).
- **Result:** Merchant can manage and verify multiple menus efficiently.

---

### 13.2 Single Venue New Vertical (Grocery / Electronics / Flower) — Core Flows

#### Flow SVNV1: Manage sellable products in a main table (menu optional)
- **Goal:** Merchant manages their store assortment primarily as “all items”.
- **Preconditions:** Venue exists.
- **Required management view capabilities (table):**
  - A primary table listing items sold (Offers) with at minimum:
    - image, name, price
    - live status (active/inactive/paused)
    - availability configuration
  - Ability to distinguish:
    - items currently live/sellable vs not live (inactive/paused)
- **Result:** Merchant can operate their store without relying on menu constructs.

#### Flow SVNV2: Edit item details and sellability (price, availability, status)
- **Goal:** Keep retail assortment accurate and up to date.
- **Preconditions:** Item exists in table.
- **Steps:**
  1. Merchant opens an item management context.
  2. Merchant updates:
     - name, image, description (as needed)
     - price
     - availability schedule (when it is sold)
     - temporary “run out” pause with optional duration
- **Result:** Item sellability updates at venue level.

#### Flow SVNV3: Manage catalog vs assortment (optional but important for large stores)
- **Goal:** Support large catalogs where not all products are currently sold.
- **Preconditions:** Business-level product catalog exists (or will).
- **Steps:**
  1. Merchant can view/store items that are actively sold (Offers).
  2. Merchant can optionally manage broader catalog items (Products) not yet attached to venue.
  3. Merchant can activate items for sale by creating venue sellables (Offers).
- **Result:** Works for both smaller and very large retail merchants.

---

### 13.3 Multi-Venue (Restaurants + New Verticals) — Core Flows

#### Flow MV1: Business-level view of venue offers with per-venue adjustments
- **Goal:** Merchant can oversee and edit what each venue sells from a higher-level context.
- **Preconditions:** Business has 2+ venues; user has business-level access.
- **Behavioral requirements:**
  - Merchant can see an item and its sellable state **per venue**:
    - price per venue
    - status per venue (active/inactive/paused)
    - availability per venue
  - Merchant can make adjustments (e.g., price change) at the venue level without leaving the business context.
- **Result:** Centralized multi-venue management is possible.

#### Flow MV2: Drill-down from business level to venue level and back
- **Goal:** Merchant can operate at both levels depending on task.
- **Preconditions:** Business-level access exists.
- **Steps:**
  1. From business level, merchant selects a venue.
  2. Venue context shows venue-specific menus (restaurant) or assortment table (retail).
  3. Merchant can return to business view without losing context.
- **Result:** Clear navigation between levels.

#### Flow MV3: Shared definitions with venue-specific overrides (conceptual requirement)
- **Goal:** Support “similar menus with slight changes” (restaurants) and “shared catalog with different assortments” (retail).
- **Preconditions:** Multiple venues.
- **Behavioral requirements:**
  - Some entity definitions can be shared (e.g., product definitions, modifier groups, categories/collections).
  - Venue-specific sellability remains editable (Offer price, availability, status).
- **Result:** Scales from “mostly identical venues” to “highly varied venues”.

---

### 13.4 Hybrid Merchant — Core Flows

#### Flow H1: Operate retail assortment and prepared-food menus in the same venue/business
- **Goal:** Support both a retail assortment (no menu required) and a menu-driven prepared food surface with modifiers.
- **Preconditions:** Business tagged as hybrid; venue exists.
- **Steps:**
  1. Manage retail items as **Offers** (table-driven assortment management).
  2. Manage prepared food as **Menu + Menu Categories + Menu Items** referencing Offers.
  3. Attach **Modifiers** to prepared food items (and optionally to select retail items if allowed).
- **Result:** One platform supports both selling paradigms.
- **Variations:**
  - Some items exist only in retail taxonomy, some only in menus, some may appear in both (if allowed).

---