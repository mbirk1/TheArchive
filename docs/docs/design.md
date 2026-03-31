# Design System Strategy: The Mystical Archive

## 1. Overview & Creative North Star

**Creative North Star: "The Ethereal Lexicon"**

This design system is built to bridge the gap between high-performance data management and the immersive, arcane atmosphere of *Magic: The Gathering*. We are moving away from the "flat dashboard" aesthetic and toward a "Digital Relic" experience.

The system utilizes **Intentional Asymmetry** and **Tonal Depth** to evoke the feeling of a mystical interface. We break the grid by allowing card elements to overlap and using high-contrast typography scales that feel more like a premium editorial spread than a standard software tool. The goal is "Professional Mysticism": the interface must feel powerful and ancient, yet respond with modern precision.

---

## 2. Colors & Surface Philosophy

The color palette is rooted in the deep oceanic teals and violets of the void. Visual separation is achieved through luminance shifts, not lines.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off areas of the UI. Boundaries must be defined solely through background color shifts. For example, a sidebar using `surface_container_low` should sit directly against a `background` main area. The transition of color is the border.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of obsidian or frosted mana.
* **Base:** `background` (#13121f)
* **Secondary Sections:** `surface_container_low` (#1b1a27)
* **Interactive Cards:** `surface_container` (#1f1e2c)
* **Elevated Popovers:** `surface_container_highest` (#353342)

### The "Glass & Gradient" Rule
To capture the "magical" quality, use **Glassmorphism** for floating elements (e.g., card hover states or tooltips). Use `surface_variant` with 60% opacity and a `backdrop-blur` of 12px.
* **Signature Textures:** Main CTAs should not be flat. Use a linear gradient from `primary` (#67d3ff) to `on_primary_container` (#0088ae) at a 135-degree angle to provide a "glowing" energy core effect.

---

## 3. Typography

The typography strategy pairs technical precision with aggressive, modern display faces.

* **The Display Voice (Space Grotesk):** Used for `display` and `headline` roles. Its wide apertures and geometric quirks feel futuristic yet "runic." Use `display-lg` for mana totals or deck names to create high-impact editorial moments.
* **The Functional Voice (Inter):** Used for `title`, `body`, and `label` roles. In data-heavy tables (card lists, price histories), use `body-sm` and `label-md` to ensure maximum information density without sacrificing legibility.
* **Hierarchy Note:** Always maintain a high contrast between headings and body text. If a deck title is `headline-lg`, the metadata below it should be `label-md` in `on_surface_variant` to create a sophisticated, tiered look.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional drop shadows or structural dividers.

* **The Layering Principle:** Depth is achieved by "stacking." Place a `surface_container_lowest` card inside a `surface_container_low` section to create a "recessed" effect.
* **Ambient Shadows:** For floating elements like Modals, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow color should never be pure black; it should be a deep tint of the background to feel like natural ambient occlusion.
* **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline_variant` at **20% opacity**. Never use 100% opaque lines.
* **Interaction Glow:** Instead of a border on focus, use a subtle outer glow using the `primary` color at 10% opacity with a 8px blur.

---

## 5. Components

### Buttons
* **Primary:** Gradient (`primary` to `on_primary_container`), `rounded-md` (0.375rem). Text: `label-md` in `on_primary`.
* **Secondary:** Ghost style. No background, `outline_variant` at 20% opacity for the "Ghost Border," text in `secondary`.
* **Tertiary:** Text only in `tertiary_fixed_dim`.

### Cards & Data Lists
* **Constraint:** Forbid divider lines between list items. Use a `1.5` (0.3rem) vertical gap and a subtle background shift (`surface_container_low` vs `surface_container_lowest`) to distinguish rows.
* **Card Hover:** On hover, transition the background to `surface_bright` and apply a `primary` glow at the bottom edge (2px height).

### Magical Components (Context Specific)
* **Mana Orbs:** Use `tertiary` and `secondary` tokens with `blur-sm` to create soft, glowing indicators for mana costs.
* **Rarity Badges:** Use `surface_container_highest` with a `Ghost Border` of the rarity color (e.g., Gold for Mythic) at 40% opacity.
* **Filter Chips:** `rounded-full`, using `surface_container_high`. Selected state uses `secondary_container` with `on_secondary_container` text.

### Input Fields
* **Styling:** Background `surface_container_lowest`, no border, `rounded-sm`. On focus, the background shifts to `surface_container`.

---

## 6. Do's and Don'ts

### Do
* **Do** use the Spacing Scale religiously. Consistent gaps (e.g., `4` for gutters, `8` for section margins) are what make a complex table feel "clean."
* **Do** use `on_surface_variant` for secondary data. It reduces visual noise in tables.
* **Do** allow images (card art) to break the container slightly with a subtle `xl` (0.75rem) rounded corner to emphasize the "Relic" feel.

### Don't
* **Don't** use pure white (#FFFFFF). All "white" text should be `on_surface` (#e4e0f3) to maintain the dark, immersive atmosphere.
* **Don't** use standard "Material" shadows. They are too sharp and sterile for this aesthetic. Stick to Tonal Layering.
* **Don't** use 1px dividers. If you feel you need a line, use a `2.5` (0.5rem) unit of empty space instead.