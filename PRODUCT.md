# Product Specification: Invitea Cards

## Product Vision
Invitea Cards is a premium digital invitation platform designed for weddings, engagements, and elegant events. The platform aims to provide a sophisticated, seamless, and highly interactive experience for guests while offering a beautiful presentation for the hosts.

## Target Audience
Couples planning their weddings, event organizers, or individuals hosting elegant gatherings who want a high-end digital alternative to physical invitations.

## Core Features (Landing Page)

### 1. Hero Section
- **Visuals**: A stunning, full-screen (or large) hero image/video background featuring elegant typography.
- **Content**: The names of the couple or the event title, the date, and a prominent but elegant call-to-action (CTA) to "RSVP" or "View Details."

### 2. The Story / About
- A dedicated section to share the couple's story or event background.
- Clean typography with plenty of whitespace and soft imagery.

### 3. Event Details (Time & Location)
- Clear, readable typography detailing the schedule (e.g., Ceremony, Reception).
- Integration with maps or a stylized location pin.
- Add to Calendar functionality (Google Calendar, Apple Calendar).

### 4. RSVP Form
- A beautifully designed form for guests to confirm attendance.
- Fields: Name, Email, Attendance Status (Yes/No), Number of Guests, Dietary Restrictions, and a personalized message.
- Integrated with backend services (Supabase) to store responses and send confirmation emails (Resend).

### 5. Gallery (Optional but Recommended)
- A smooth, interactive masonry or grid gallery showcasing engagement photos or event inspiration.
- Should support lightbox viewing with smooth transitions.

### 6. Wishing Well / Registry
- A polite, elegantly worded section for gift registries or cash funds.
- Can include payment gateway integration (Midtrans) for direct digital gifting.

## Technical Requirements
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Email**: Resend
- **Payments**: Midtrans
- **Performance**: Must be highly optimized for fast loading (essential for mobile users).
- **Responsiveness**: Mobile-first design is critical, as most guests will open the invitation via a link on their smartphones.

## Key Success Metrics
- **Aesthetic Appeal**: The landing page must visually impress the user immediately ("wow factor").
- **Conversion Rate**: High completion rate for the RSVP form.
- **Performance Score**: High Lighthouse scores for speed and accessibility.
