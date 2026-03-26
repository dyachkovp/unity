---
description: "Sber Unity design system rules — enforces corporate fonts, icons, colors, and component patterns for all generated code in this project."
globs: "src/**/*.{tsx,ts,css}"
alwaysApply: true
---

# Sber Unity Design System

You are generating code for the **Sber Unity** platform — an internal corporate prototype built with **React 19 + TypeScript + Radix UI Themes + Vite**. All generated code MUST follow these rules.

---

## 1. Typography

### Font families
- **Headings** (`h1`–`h6`, page titles, section titles): `SB Sans Display`
- **Body text** (UI labels, paragraphs, table cells, inputs): `SB Sans Text`
- Fonts are loaded via `src/fonts.css` (already imported in `main.tsx`).
- Radix CSS variables are overridden on `.radix-themes` (NOT on `:root` — Radix sets its own variables on `.radix-themes` which overrides `:root`):
  - `--default-font-family` → SB Sans Text
  - `--heading-font-family` → SB Sans Display

### Available weights
| Font | Weights |
|------|---------|
| SB Sans Display | Thin (100), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700) |
| SB Sans Text | Thin (100), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), Heavy (800) + italics for 300/400/600/700 |

### Rules
- Never use `font-family: sans-serif` or system font stacks directly. Always rely on the CSS variables or the font names above.
- Prefer `font-weight: 500` (Medium) for emphasis in UI, `600` (SemiBold) for strong emphasis, `400` for body.
- Headings default to `font-weight: 600`.

---

## 2. Icons

### Unity icon set
The project uses a **custom SVG icon set** located in `public/icons/`. Each file is named `36-{name}.svg` (36×36 viewBox, monochrome, `fill="black"`).

### Usage
Import and use the `UnityIcon` component:

```tsx
import { UnityIcon } from "../components/UnityIcon";

<UnityIcon name="rocket" size={20} />
<UnityIcon name="magnifying-glass" size={16} />
```

### Props
- `name` (required): icon name without the `36-` prefix and `.svg` extension
- `size` (optional, default 24): width and height in px
- Accepts all standard `<img>` attributes

### Available icons (253 total)
apple-wallet, army-of-russia, arrow-clockwise, arrow-right, arrow-right-chevron-rectangle, arrow-right-trace-line, arrow-right-uturn, arrow-uturn-left, arrows-diagonal, arrows-forward-back, arrows-up-down, atm-banknote, audio, backpack, bag, balloon, ballot-paper, banknote, bar-graph, barrel-drop, basket, battle-helmet, beach-umbrella, beanie, beard, bell, bell-crossed, bill-of-exchange, bolt, brooch, building, bus, calculator, calendar, calendar-checkmark, calendar-graph, camera, capsule, car, card, card-alt1, card-arrow-down-left, card-arrow-up-right, card-bar-graph, card-chevron-left, card-cross, card-grid, card-on-card, card-plus, card-vanishes, card-viewfinder, cards-carousel, cards-stack, cart, case, case-diagram, checkmark-alt1, chess-piece, chevron-down, chevron-up, chin, circle-cross, circle-plus, clock, coin, coin-down, coin-heart, collar, cosmetic, coupon, crest, cross, crown, cursor-rays, digital-banknotes, dish, dna, document, document-cardiogram, document-checkmark, document-magnifying-glass, document-on-document, dots-horizontal, double-arrow-uturn-right, drop, ear, ear-cross, earrings, ellips-viewfinder, exclamation, eye, eye-alt1, eye-crossed, eyebrows, face, face-id, face-oval, face-viewfinder, falling-coin, file-chart, file-doc, file-excel, file-pdf, file-ppt, file-rar, file-spinner, file-zip, fingerprint, flag, flame, funnel, gamepad, gear, gift, glass-with-lid, glasses, hair, hammer, handset, hanger, headphones, heart, heart-hand, house, house-handset, house-percent, img, infinity, info, jacket, key, lamp, leaf, lifebuoy, link, lips, list, lock-closed, lock-opened, magic-wand, magnifying-glass, mail, man-badge, man-wheelchair, map, mask, medal, meteorite, mic, mic-mute, mindmap, mobile, mobile-plus, moneybag, moon-stars, necklace, nose, note, notebook-waves, paper-tray, parking, passport, pause, paw, percent, photo, pie-chart, piechart-sector, piercing, plane, play, postcard-heart, pram, qr-code, receipt, rectangle-on-dashed-rectangle, rectangle-speech-bubble, rectangle-speech-bubble-list, rectangle-speech-bubble-on-speech-bubble, rectangle-watches, red-cross, road-ruble, rocket, round-speech-bubble-arrow-up, round-speech-bubble-checkmark, round-speech-bubble-cross, round-speech-bubble-exclamation, round-speech-bubble-question, round-watches, route, ruble-dollar, ruble-plus, ruler, safe, safe-arrow-down-left, safe-arrow-up-right, safe-cross, safe-diagram, scales, shaking-hands, share-andr, share-ios, shield, shield-check, shield-crossed, shield-lines, shield-lines-circles, shield-percent, shield-ruble, shirt, smile-affable, smile-glad, smile-happy, smile-sad, smile-sullen, social-card, speaker-waves, speedometer, square-on-square, square-pin, star, star-light, steering-wheel, student-hat, sword, table-lamp, tag, tap, telephone, thermometer, thumb-down, thumb-up, trash, tray-down, tree, truck, tv-set, umbrella, usb, user, user-on-user, user-plus, vial, vibration, video, wallet, wallet-lines, watering-can, waves, waves-cross, whistle, wrench, yule

### Rules
- **Always prefer Unity icons** over Radix Icons (`@radix-ui/react-icons`). Only fall back to Radix Icons if the needed icon does not exist in the Unity set.
- Choose the closest matching icon from the list above. If no match exists, note it in a comment so the user can add it later.
- Icon set may grow — always check `public/icons/` for the latest available icons before claiming one doesn't exist.

---

## 3. Colors

### Brand colors
| Name | Hex | Usage |
|------|-----|-------|
| Sber Green | `#21a038` | Brand accent, logo, success states, positive badges |
| Unity Black | `#1a1a1a` | Logo text, primary text in branding contexts |

### System colors (via Radix CSS variables)
- **Backgrounds**: `var(--gray-2)` (page bg), `#fff` (cards/panels), `var(--gray-3)` (hover states)
- **Borders**: `var(--gray-4)` (standard), `var(--gray-6)` (emphasized)
- **Text**: `var(--gray-12)` (primary), `var(--gray-11)` (secondary), `var(--gray-9)` (muted/placeholder)
- **Accent**: `var(--accent-9)` / `rgb(171, 66, 120)` (primary action), `var(--accent-3)` (accent bg). Custom accent scale defined in `fonts.css`
- **Semantic**: `var(--green-9)` (success), `var(--red-9)` (error), `var(--amber-11)` (warning)

### Rules
- Always use Radix CSS variables for grays and semantic colors — never hardcode hex values for grays.
- `#21a038` is the only hardcoded hex allowed (Sber brand green).
- For colored badges/tags, use light background + darker text: e.g., `background: var(--green-3); color: var(--green-11)`.

---

## 4. Component patterns

### Radix UI Themes
All UI components come from `@radix-ui/themes`. Always import from there:
```tsx
import { Button, Flex, Text, Heading, TextField, Badge, Dialog, DropdownMenu, IconButton, Table, Card } from "@radix-ui/themes";
```

### Theme configuration
The app wraps in `<Theme radius="medium" scaling="110%">`. Do not change these values.

### Common patterns used in this project

**Buttons:**
```tsx
<Button variant="soft" size="2">Action</Button>        // Secondary
<Button size="2">Primary</Button>                       // Primary
<Button variant="ghost" size="1">Tertiary</Button>      // Tertiary
<IconButton variant="ghost" size="1"><UnityIcon name="dots-horizontal" size={16} /></IconButton>
```

**Layout:**
- CSS Grid for page-level layouts (sidebar + content)
- Radix `<Flex>` for inline layouts, alignment, spacing
- Custom CSS classes in `App.css` for complex layouts (tri-panel, master-detail)
- Gap/spacing via Radix `gap` prop or CSS `gap` with pixel values

**Cards:**
```tsx
<div className="startup-card">  // Custom styled cards
```
or Radix `<Card>` component for simpler cases.

**Data display:**
- Radix `<Table.Root>` for tabular data
- Custom CSS classes for list items with hover states
- `<Badge>` for status indicators with appropriate `color` prop

**Navigation:**
- Custom sidebar with `.nav-item` / `.nav-item.active` classes
- React Router for routing (`useNavigate`, `<Outlet>`)

### Rules
- Use Radix UI Themes components as the foundation. Custom HTML only when Radix doesn't provide the needed component.
- Styling goes in `App.css` using plain CSS classes — no CSS modules, no CSS-in-JS, no Tailwind.
- Keep all styles in `App.css` (single stylesheet approach).
- Follow existing class naming conventions: lowercase, hyphen-separated (e.g., `.startup-card`, `.scouting-master-detail`).

---

## 5. Language & locale

- All user-facing text is in **Russian** (Cyrillic). Labels, placeholders, headings, buttons — all in Russian.
- Code (variable names, comments) stays in English.

---

## 6. Project structure

```
src/
  main.tsx          — Entry point, Theme wrapper
  App.tsx           — Router setup
  App.css           — All styles (single file)
  fonts.css         — @font-face declarations
  components/       — Reusable components (UnityIcon, Layout, dialogs)
  pages/            — Route-level page components
  context/          — React context providers
  data/             — Mock data
public/
  fonts/            — SB Sans Display & SB Sans Text woff2 files
  icons/            — Unity SVG icon set (36-{name}.svg)
```

### Rules
- New pages go in `src/pages/`.
- New reusable components go in `src/components/`.
- New styles go in `src/App.css` with a section comment: `/* ── SectionName ── */`.
- Mock data goes in `src/data/mockData.ts` or a new file in `src/data/`.
