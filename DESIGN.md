# Design System: Invitea Cards

## Style Overview
**Theme**: Feminine, Minimalist, and Elegant
**Vibe**: Romantic, sophisticated, clean, and airy.

## 1. Color Palette
The color palette focuses on soft, subtle, and romantic tones that evoke elegance without being overwhelming.

- **Primary (Brand Color)**: Soft Blush Pink (`#F4E1E1`) or Rose Gold (`#B76E79`) - Used for primary buttons and accents.
- **Secondary**: Soft Sage Green (`#E3E8E3`) or Warm Sand (`#F2ECE7`) - Used for subtle backgrounds or secondary elements.
- **Background**: Off-White / Pearl (`#FAFAFA` or `#FCFBF9`) - To keep the interface clean and minimalist.
- **Text (Primary)**: Deep Charcoal (`#333333`) or Soft Navy (`#2C3E50`) - For high readability while remaining softer than pure black.
- **Text (Secondary/Muted)**: Warm Gray (`#888888`) - For less important information.

## 2. Typography
Typography should balance classic elegance with modern readability.

- **Headings (H1, H2, H3)**: Elegant Serif (e.g., *Playfair Display*, *Cormorant Garamond*, or *Cinzel*).
  - Weight: Normal or Semi-bold.
  - Letter-spacing: Slightly spaced out for a luxurious feel.
- **Body Text (Paragraphs, Labels, Buttons)**: Clean Sans-Serif (e.g., *Inter*, *Montserrat*, or *Lato*).
  - Weight: Light or Regular.
  - Line-height: Generous (1.6 - 1.8) to allow the text to breathe.

## 3. UI Components & Layout

### 3.1. Whitespace
- **Generous Spacing**: The core of a minimalist design is whitespace. Sections should have large paddings (e.g., `py-24` or `py-32`) to ensure the page feels airy and uncluttered.

### 3.2. Shapes & Borders
- **Soft Edges**: Use rounded corners (e.g., `rounded-xl` or `rounded-2xl`) for images, cards, and buttons to maintain a soft and feminine look. Avoid sharp corners.
- **Borders**: Thin, delicate borders (e.g., 1px solid `#EAEAEA` or a very faint rose gold) can be used to separate content gracefully.

### 3.3. Effects
- **Glassmorphism**: Subtle frosted glass effects (blur backgrounds with slight white transparency) for floating navbars or overlapping cards.
- **Shadows**: Very soft, diffused drop shadows (e.g., `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`). Avoid harsh or dark shadows.

## 4. Imagery & Photography
- **Placeholder Style**: Use high-quality, aesthetic placeholder imagery with warm, soft lighting (e.g., floral arrangements, soft fabrics, elegant venues).
- **Treatment**: Images can have a subtle warm filter or be slightly desaturated to match the elegant tone of the website.

## 5. Animations & Interactions
- **Scroll Animations**: Smooth, slow, and graceful. Elements should gently fade in and slide up (e.g., `translate-y-4 opacity-0` to `translate-y-0 opacity-100` over 800ms-1000ms).
- **Hover Effects**: Subtle transitions. Buttons might gently lift or change to a slightly deeper shade over a slow duration (300ms). No sudden or aggressive movements.

## 6. Iconography
- **Icons**: Thin, line-based, delicate icons (using Lucide React with `strokeWidth={1.5}` or `1`). Avoid chunky or filled icons.

---
*Note: This design document serves as a guideline for all future UI/UX decisions within the Invitea Cards project, ensuring a consistent and premium user experience.*
