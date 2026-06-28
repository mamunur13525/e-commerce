# Dashboard UI Recreation Prompt

Create a pixel-perfect, production-quality dashboard UI that matches the
attached design as closely as possible.

## Overall Layout

-   Full-screen dashboard
-   Background: `#F6F6F6`
-   Rounded outer container (\~28px)
-   White cards with subtle borders
-   Minimal SaaS aesthetic

Layout: - Left sidebar (320px) - Top header - Main content area

## Sidebar

-   White background
-   28px radius
-   24px padding

Structure: 1. Logo 2. Primary Navigation 3. Divider 4. Management
Section 5. Spacer 6. Help Center 7. Settings 8. User Profile

### Logo

Green circular logo with four rounded leaf shapes.

Title: `TeamSync`

Subtitle: `Semusim Visual Team`

### Primary Navigation

Items: - Dashboard - My Order - Sales Performances - Messages

48px height, 12px radius,.

Active item: - White background - Subtle shadow

### Divider

Thin gray line.

### Management

Label: `MANAGEMENT`

Items: - Customer - Product - Marketing - Shipping - Finance - Connected
Marketplace

### Bottom

Help Center

Settings

User profile: - Avatar - Jacob Farrel - jacobfarrel@gmail.com - Dropdown
icon

## Header

Height: 72px

Left: - Back button - Dashboard title - Subtitle

Right: - Search placeholder - Notification placeholder - Profile
placeholder

Title: `Dashboard`

Subtitle:
`Get an at-a-glance view of your sales performance, key metrics, and business insights all in one place`

## Main Content

Large white rounded container.

24px radius.

Fill remaining viewport.

Leave blank.

## Colors

-   Background: #F6F6F6
-   Cards: #FFFFFF
-   Border: #ECECEC
-   Primary text: #111111
-   Secondary text: #7A7A7A
-   Hover: #F2F2F2
-   Logo green: #2E8B57

## Typography

Inter

Weights: 400, 500, 600, 700

## Border Radius

-   Dashboard: 28px
-   Cards: 24px
-   Buttons: 12px
-   Inputs: 14px
-   Profile: 18px



## Spacing

Use an 8px spacing system.

24px page padding.

## Responsive

Desktop: match screenshot.

Tablet: reduce spacing.

Mobile: sidebar drawer.

## Components

``` text
components/
    sidebar.tsx
    sidebar-item.tsx
    logo.tsx
    header.tsx
    user-profile.tsx
    dashboard-layout.tsx
```

## Accessibility

-   Keyboard accessible
-   ARIA labels
-   Focus states
-   Semantic HTML

## Code Quality

-   Tailwind only
-   Reusable components
-   TypeScript
-   No inline styles

## Goal

Recreate the attached UI with approximately 99% visual accuracy,
matching spacing, typography, alignment, colors, padding, icon
placement, proportions, and overall modern SaaS aesthetic.
