# 🎨 Visual Design Guide - New Pages

## Color Coding System

### Status Colors
```
🟡 Pending Issues
   Background: bg-yellow-100
   Text: text-yellow-800
   Border: border-yellow-200
   Use Case: Newly reported issues awaiting review

🔵 In Progress Issues
   Background: bg-blue-100
   Text: text-blue-800
   Border: border-blue-200
   Use Case: Issues being actively worked on

🟢 Resolved Issues
   Background: bg-green-100
   Text: text-green-800
   Border: border-green-200
   Use Case: Completed and fixed issues
```

### Page Themes
```
🔴 Reported Issues Page
   Primary: Red (user-centric, urgent)
   Icons: FileText, AlertCircle, Loader2, CheckCircle2
   
🟢 Verified Issues Page
   Primary: Green (trust, authority, official)
   Icons: Shield, CheckCircle2
   Special: Municipality response badge in blue
```

---

## Layout Templates

### Reported Issues Layout
```
┌─────────────────────────────────────┐
│  📝 My Reported Issues              │
│  Track all issues you've reported   │
├─────────────────────────────────────┤
│  [3 Total] [1 Pending] [1 Active]  │
│  [1 Resolved]                       │
├─────────────────────────────────────┤
│  [All (3)] [Pending (1)] [Active]  │
│  [Resolved (1)]                     │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐ │
│  │ 🟡 Pending                    │ │
│  │ Street light not working      │ │
│  │ Description...                │ │
│  │ 📍 Location | Category        │ │
│  │ [↑89] [💬15] [⤴Share] [👁]  │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🔵 In Progress                │ │
│  │ Pothole causing accidents     │ │
│  │ Description...                │ │
│  │ 📍 Location | Category        │ │
│  │ [↑142] [💬23] [⤴Share] [👁] │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Verified Issues Layout
```
┌─────────────────────────────────────┐
│  🛡️ Verified Issues                │
│  Confirmed by municipality          │
├─────────────────────────────────────┤
│  ℹ️ What are Verified Issues?      │
│  These have been reviewed and...    │
├─────────────────────────────────────┤
│  [5 Total] [2 In Progress]         │
│  [3 Resolved]                       │
├─────────────────────────────────────┤
│  [All (5)] [Active (2)] [Done (3)] │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐ │
│  │ ✅ VERIFIED • 1 hour ago      │ │
│  │ 🔵 In Progress                │ │
│  ├───────────────────────────────┤ │
│  │ Pothole on MG Road            │ │
│  │ Description...                │ │
│  │ 📍 Location | Category        │ │
│  │                               │ │
│  │ 📢 Municipality Response:     │ │
│  │ Team dispatched, 2 days ETA   │ │
│  │                               │ │
│  │ [↑142] [💬23] [⤴Share] [👁] │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Component Specifications

### Statistics Card
```
┌─────────────┐
│     142     │ ← 2xl font-bold zinc-900
│   Pending   │ ← sm text zinc-600
└─────────────┘
Size: rounded-xl
Border: border-zinc-200 (or colored)
Padding: p-4
Shadow: shadow-sm
```

### Filter Tab (Active)
```
┌──────────────┐
│ All Issues 3 │ ← bg-red-600 text-white
└──────────────┘
Rounded: rounded-lg
Padding: px-4 py-2.5
Badge: rounded-full bg-red-500
```

### Filter Tab (Inactive)
```
┌──────────────┐
│ Pending   1  │ ← text-zinc-600 hover:bg-zinc-50
└──────────────┘
Badge: bg-zinc-100 text-zinc-600
```

### Issue Card
```
┌────────────────────────────────┐
│ Author Avatar | Name           │ Status Badge
│              | Time            │
├────────────────────────────────┤
│ Title (bold, lg)               │
│ Description (sm, zinc-600)     │
│                                │
│ 📍 Location    Category        │
│ [Images if present]            │
│                                │
├────────────────────────────────┤
│ [↑] [💬] [⤴] [View Map →]    │
└────────────────────────────────┘
```

### Verified Badge
```
┌────────────────────────────────┐
│ 🛡️ VERIFIED BY MUNICIPALITY •  │
│    1 hour ago     [Status]     │
└────────────────────────────────┘
Background: bg-green-50/50
Border: border-green-100
Text: text-green-700 font-semibold
```

### Municipality Response
```
┌────────────────────────────────┐
│ 🛡️ Municipality Response       │
│ Team has been dispatched...    │
└────────────────────────────────┘
Background: bg-blue-50
Border: border-blue-200
Icon: Shield, blue-600
Text: text-blue-800
```

---

## Hero Background Breakdown

```
Layer 1: Base Gradient
─────────────────────────
bg-linear-to-br from-zinc-50 via-white to-red-50/30

Layer 2: Dot Grid (3% opacity)
─────────────────────────
radial-gradient circles at 1px intervals
40px × 40px grid pattern

Layer 3: Gradient Orbs
─────────────────────────
┌─────────────────────────┐
│    [Red Orb]            │ ← Top Right
│                         │
│         [Center]        │ ← 600px blur
│                         │
│            [Zinc Orb]   │ ← Bottom Left
└─────────────────────────┘

Layer 4: Accent Dots
─────────────────────────
• Small red/zinc dots
• Scattered for interest
• 1-2.5px size
• 20-30% opacity
```

---

## Icon Reference

### Reported Page Icons
- 📝 FileText (main page icon)
- ⚠️ AlertCircle (pending status)
- 🔄 Loader2 (in-progress status)
- ✅ CheckCircle2 (resolved status)
- ⏰ Clock (timestamp)
- 📍 MapPin (location)

### Verified Page Icons
- 🛡️ Shield (verification, municipality)
- ✅ CheckCircle2 (status)
- 📍 MapPin (location)
- ⏰ Clock (timestamp)

### Interaction Icons
- ↑ ArrowBigUp (upvote)
- 💬 MessageCircle (comments)
- ⤴ Share2 (share)
- 👁️ MapPin + "View" (view on map)

---

## Spacing Scale

```
Component Gaps:
───────────────
gap-1  → 4px   (tight spacing, inline elements)
gap-2  → 8px   (icon + text)
gap-3  → 12px  (related items)
gap-4  → 16px  (cards in grid)
gap-8  → 32px  (section spacing)

Card Padding:
─────────────
p-4    → 16px  (stats cards)
px-6 py-5 → 24px / 20px (issue cards content)
py-3   → 12px  (interaction bar)

Border Radius:
──────────────
rounded-lg  → 8px  (buttons, small cards)
rounded-xl  → 12px (cards, containers)
rounded-2xl → 16px (modals, special elements)
rounded-full → 9999px (badges, avatars)
```

---

## Typography Hierarchy

```
Page Title
──────────
text-3xl font-bold text-zinc-900
"My Reported Issues"

Page Subtitle
─────────────
text-zinc-600
"Track all issues you've reported"

Card Title
──────────
text-lg font-bold text-zinc-900 leading-snug
"Large pothole on MG Road..."

Card Description
────────────────
text-sm text-zinc-600 leading-relaxed
Body text, descriptions

Labels/Metadata
───────────────
text-xs text-zinc-500
Timestamps, locations

Stat Numbers
────────────
text-2xl font-bold (colored)
142, 3, 5

Stat Labels
───────────
text-sm text-zinc-600
"Total Reports", "Pending"

Badges
──────
text-xs font-semibold
Status, category labels
```

---

## Animation Timing

```
Page Load (Stagger)
───────────────────
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
delay: index * 0.05 (50ms per item)
duration: 0.4s

Hover Effects
─────────────
transition-all
duration: 150-300ms

Card Lift
─────────
hover:translateY(-2px)
hover:shadow-md
150ms ease

Button Press
────────────
active:scale-0.98
100ms ease
```

---

## Interaction States

### Upvote Button

**Not Upvoted:**
```
┌──────┐
│ ↑ 89 │ text-zinc-600 hover:bg-zinc-50
└──────┘
```

**Upvoted:**
```
┌──────┐
│ ↑ 90 │ bg-red-50 text-red-600 (filled icon)
└──────┘
```

### Filter Tab

**Active:**
```
bg-red-600 text-white shadow-sm
(Reported Page)

bg-green-600 text-white shadow-sm
(Verified Page)
```

**Inactive:**
```
text-zinc-600 hover:bg-zinc-50
```

---

## Accessibility Notes

### Color Contrast
- All text: Minimum 7:1 (WCAG AAA)
- Status badges: 4.5:1 minimum
- Interactive elements: Clear focus states

### Focus States
```
focus:ring-2 focus:ring-red-500 focus:ring-offset-2
```

### Screen Reader Text
- Status icons include text labels
- Interactive elements have clear labels
- Semantic HTML throughout

### Keyboard Navigation
- Tab order logical
- Enter/Space for buttons
- Escape closes dropdowns

---

## Responsive Breakpoints

```
Mobile (< 640px)
────────────────
- Stats: 2 columns
- Tabs: Wrap
- Full width cards
- Reduced padding

Tablet (640px - 1024px)
───────────────────────
- Stats: 2-3 columns
- Standard spacing
- Comfortable layout

Desktop (> 1024px)
──────────────────
- Stats: 4 columns
- Max width: 4xl
- Enhanced hover
- Optimal spacing
```

---

## Empty States

### No Issues Found
```
┌─────────────────┐
│       🔍        │ ← bg-zinc-100 rounded-full
│                 │
│  No issues      │ ← font-semibold
│  found          │
│                 │
│  Try adjusting  │ ← text-sm zinc-600
│  your filters   │
│                 │
│  [Report First  │ ← CTA button (if appropriate)
│   Issue]        │
└─────────────────┘
```

---

This visual guide ensures consistency across all new pages and provides a reference for future development! 🎨
