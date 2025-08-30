
# FoodWar: A Production-Ready Restaurant E-commerce Template

## 1. Introduction

Welcome to FoodWar! This isn't just a demo; it's a **complete, production-ready frontend template** designed to be a powerful starter kit for any restaurant, café, or food delivery business. Built with React, TypeScript, and Tailwind CSS, it provides a feature-rich, visually stunning, and highly customizable single-page application (SPA) that you can deploy immediately.

The core philosophy of this project is to provide a solid foundation that a business owner can easily configure and a developer can confidently extend.

---

## 2. Key Features

### E-commerce & Ordering
-   **Dynamic Boutique:** Advanced filtering by category and price, multiple sorting options, and dual view modes (grid/list).
-   **Detailed Product Pages:** Rich product views with image galleries, descriptions, related products, and social sharing.
-   **Persistent Shopping Cart & Favorites:** User's cart and favorite items are saved in their browser (`localStorage`), persisting across sessions.
-   **Functional Checkout Process:** Integrated with **Formspree** to send real order notifications to the business owner via email, requiring zero backend code.

### Comprehensive User Account Dashboard
-   **Profile Management:** Users can edit their name and email. The app prompts users to complete their profile before checkout.
-   **Appearance Customization:** Users can change the application's entire theme color and adjust the global font size (Small, Medium, Large) for accessibility.
-   **Personalized Statistics:** A private dashboard visualizes user activity (top products, categories, etc.) with interactive charts (`Chart.js`).
-   **Order History:** Users can view a complete list of their past orders.
-   **Full Data Portability:** Users can export *all* their personal data (profile, cart, favorites, appearance settings, analytics events) to a JSON file and import it back, ensuring total data control and privacy.

### Rich Content & Pages
-   **Integrated Blog & News:** Full-featured sections for articles with shareable, direct-linkable pages.
-   **Essential Business Pages:** Includes a suite of pre-built static pages: Contact, Partnership/Franchise ("Pro"), Our Branches, Our Team, Privacy Policy, and more.

### Advanced Technical Features
-   **No Backend Required:** Fully functional out-of-the-box for small businesses using Formspree for notifications.
-   **Deep Linking:** Direct links to products (`...#product/1`) and articles (`...#article/1`) work on page load, making shared links fully functional.
-   **Centralized Configuration:** Key business details, content, and UI features are managed from two simple files: `constants.tsx` and `featureFlags.ts`.
-   **Maintenance Mode:** A global flag can instantly put the entire site into a user-friendly maintenance mode.
-   **Robust Navigation:** A custom 404 "Page Not Found" page handles invalid routes gracefully.
-   **Interactive UI:** Features an interactive 3D globe on the contact page ([Cobe.js](https://github.com/shuding/cobe)) and dynamic charts for statistics ([Chart.js](https://www.chartjs.org/)).

---

## 3. Technology Stack

-   **Frontend Library**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: React Context API with a `useLocalStorage` custom hook for persistence.
-   **Form Backend**: [Formspree](https://formspree.io/) (for real email notifications without a server).
-   **Icons**: [Material Icons](https://fonts.google.com/icons)
-   **Charts**: [Chart.js](https://www.chartjs.org/) (for the statistics page).
-   **3D Globe**: [Cobe](https://github.com/shuding/cobe) (for the contact page).

---

## 4. Administrator's Customization Guide

This guide is your control panel. All major business information, content, and features are managed from two central files. **You must configure these files before the website is ready for public use.**

-   **Main Configuration File:** `constants.tsx`
-   **UI Feature Toggles:** `featureFlags.ts`

### 4.1. CRITICAL: Enable Order & Contact Forms

To receive real orders, contact messages, and partnership requests via email, you must connect the app to Formspree. **You will need to create three separate forms.**

1.  **Sign Up**: Go to [formspree.io](https://formspree.io) and create a free account.
2.  **Create Three Forms**:
    *   On your Formspree dashboard, click **"+ New form"**. Name it "FoodWar Orders" and set the email address where you want to receive order notifications.
    *   Repeat the process to create a second form named "FoodWar Contact".
    *   Repeat again to create a third form named "FoodWar Partnerships".
3.  **Get Your Form URLs**: For each of the three forms, go to its "Integration" tab. You will see a unique URL that looks like `https://formspree.io/f/YOUR_UNIQUE_ID`. Copy this URL.
4.  **Update the Code**:
    *   Open the file `constants.tsx`.
    *   Find the `FORMSPREE_ENDPOINTS` object.
    *   Paste each unique URL into its corresponding field, replacing the placeholders.

    **Before:**
    ```typescript
    // In constants.tsx
    FORMSPREE_ENDPOINTS: {
      orderSubmission: 'https://formspree.io/f/YOUR_ORDER_FORM_ID',
      contactForm: 'https://formspree.io/f/YOUR_CONTACT_FORM_ID',
      partnershipInquiry: 'https://formspree.io/f/YOUR_PARTNERSHIP_FORM_ID',
    }
    ```
    **After (Example):**
    ```typescript
    // In constants.tsx
    FORMSPREE_ENDPOINTS: {
      orderSubmission: 'https://formspree.io/f/mgejxyab', // Your actual orders URL
      contactForm: 'https://formspree.io/f/xgejyabc',     // Your actual contact URL
      partnershipInquiry: 'https://formspree.io/f/xvoeyzab',// Your actual partnership URL
    }
    ```
    Your forms are now live!

### 4.2. Configure Your Business Information

All your business details are in the `APP_CONFIG` object inside `constants.tsx`.

*   **File to Edit:** `constants.tsx`

```typescript
// In constants.tsx
export const APP_CONFIG = {
  BUSINESS_NAME: "Your Restaurant Name",
  CONTACT_EMAIL: "contact@yourdomain.com",
  CONTACT_PHONE: "+221 77 123 45 67",
  ADDRESS: "123 Main Street, Dakar, Senegal",
  // ... and other settings
};
```

#### How to Update the Google Map

1.  Go to [Google Maps](https://www.google.com/maps).
2.  Search for your business address.
3.  Click the **"Share"** button.
4.  A popup will appear. Click on the **"Embed a map"** tab.
5.  You will see an `<iframe>` code. **Copy only the URL** from inside the `src="..."` attribute.
6.  Paste this URL into the `GOOGLE_MAPS_IFRAME_SRC` field in `APP_CONFIG`.
7.  Do the same for `GOOGLE_MAPS_ITINERARY_LINK` by getting the "Directions" link.

#### How to Change the Logo

In `APP_CONFIG`, find the `LOGO` object. You can use your own image or a simple icon.

-   **To use an image file**:
    1.  Set `TYPE: 'image'`.
    2.  Place your logo file (e.g., `logo.png`) in the project's root directory.
    3.  Set `IMAGE_URL: '/logo.png'`.

-   **To use an icon**:
    1.  Set `TYPE: 'icon'`.
    2.  Choose an icon name from the [Material Icons](https://fonts.google.com/icons) library (e.g., 'ramen_dining').
    3.  Set `ICON: 'ramen_dining'`.
    4.  Customize the shape and colors.

### 4.3. Manage Website Content

All content like products, categories, blog posts, etc., is stored in arrays within `constants.tsx`.

*   **File to Edit:** `constants.tsx`
*   **To Add/Edit Products:** Find the `PRODUCTS` array and modify it. The `content` property for blog posts accepts basic HTML for formatting.
*   **To Add/Edit Categories:** Find the `CATEGORIES` array.
*   **To Add/Edit Blog Posts:** Find the `BLOG_POSTS` array.

### 4.4. Customize Theme & Appearance

You can set the default theme color and the available choices for the user.

*   **File to Edit:** `constants.tsx`
*   **Set Default Color:** In `APP_CONFIG`, change `DEFAULT_THEME` to 'blue', 'emerald', 'rose', or 'violet'.
*   **Customize Options:** Modify the `THEME_OPTIONS` array to change the names or even the color values used throughout the site.

### 4.5. Enable/Disable UI Sections (Feature Flags)

Easily hide or show almost any section of the application from one place.

*   **File to Edit:** `featureFlags.ts`
*   **How it Works:** The `FEATURE_FLAGS` object is organized by page (e.g., `homepage`, `footer`, `accountPage`). To hide a section, change its value from `true` to `false`.

**Example: Hide the Testimonials section on the homepage.**
```typescript
// In featureFlags.ts
export const FEATURE_FLAGS = {
  homepage: {
    //...
    showTestimonials: false, // Changed from true
    //...
  },
};
```

### 4.6. Enable Maintenance Mode

Take the entire site offline and display a user-friendly maintenance message.

*   **File to Edit:** `featureFlags.ts`
*   **To Enable:** Change `MAINTENANCE_MODE` from `false` to `true`.
*   **To Configure:** Adjust the `MAINTENANCE_OPTIONS` to set a countdown timer for when the site will be back online.

---

## 5. Developer's Guide

This section outlines the project's structure and architecture for developers looking to extend its functionality.

### 5.1. Project Structure

```
/
├── components/         # All React components, organized by page or function
├── constants.tsx       # Centralized static data, content, and APP_CONFIG
├── featureFlags.ts     # UI toggles and maintenance mode configuration
├── types.ts            # All TypeScript type definitions
├── index.html          # Main HTML entry point
├── index.tsx           # React application root
├── App.tsx             # Main component: state providers, routing, layout
└── README.md           # This file
```

### 5.2. Architecture Overview

The application is a pure client-side SPA. State management is handled by React's Context API, encapsulated into custom hooks for easy consumption (e.g., `useCart`, `useUser`). A custom `useLocalStorage` hook provides the persistence layer, automatically saving and retrieving state from the browser's local storage.

Routing is managed by a simple state variable (`page`) in the main `App.tsx` component, which conditionally renders the appropriate page component. This lightweight approach avoids the need for a heavy routing library while still supporting deep linking via URL hash fragments.

### 5.3. Evolving the Order Process (Next Steps)

While Formspree is excellent for getting started, a growing business will benefit from a dedicated backend.

**Recommended Evolution:**
1.  **Serverless Function:** Create a serverless function (e.g., on Vercel or AWS Lambda) that accepts the order JSON from the frontend.
2.  **Order Processing:** The function can then:
    *   Save the order to a database (e.g., Supabase, FaunaDB).
    *   Send a transactional email to the customer using a service like **SendGrid** or **Resend**.
    *   Send a notification to the kitchen/admin via Slack, Discord, or even SMS with **Twilio**.
3.  **Gemini API Integration:** Leverage the Google Gemini API (`gemini-2.5-flash`) on the backend to:
    *   **Summarize orders:** Create concise, easy-to-read order summaries for kitchen staff.
    *   **Analyze trends:** Periodically analyze order data to identify popular items or peak hours.

This architecture provides a scalable, professional, and automated system for managing orders.
