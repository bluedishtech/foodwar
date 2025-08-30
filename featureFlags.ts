// featureFlags.ts

/**
 * This flag puts the entire application into maintenance mode.
 * When true, all routes will redirect to the MaintenancePage.
 */
export const MAINTENANCE_MODE = false; // Set to true to enable maintenance mode

/**
 * Options for the maintenance page.
 */
export const MAINTENANCE_OPTIONS = {
  /**
   * Set to true to display a countdown timer for when the maintenance is expected to end.
   */
  SHOW_TIMER: true,
  /**
   * The date and time when the maintenance is scheduled to end (ISO 8601 format).
   * Example: '2024-12-31T23:59:59Z'
   */
  END_DATE: '2025-09-20T10:00:00Z',
};


/**
 * This file contains feature flags to easily enable or disable sections of the application.
 * Set a flag to `true` to show the section, and `false` to hide it.
 * This provides granular control over the UI without changing the code.
 */
export const FEATURE_FLAGS = {
  // --- Global Components ---
  global: {
    showBackToTopButton: true,
  },

  // --- Homepage Sections ---
  homepage: {
    // Left Sidebar
    showPlatDuJourWidget: true,
    showTagsWidget: true,
    showDiscountBanner: true,
    // Main Content
    showHeroSection: true,
    showFeaturedProducts: true,
    showCategoryCarousel: true,
    showProductCarousel: true,
    showAdBanners: true,
    showProductList: true,
    // Right Sidebar
    showCallToAction: true,
    showBenefits: true,
    showTestimonials: true,
    showLatestNews: true,
    showBogoBanner: true,
  },
  
  // --- Footer Sections ---
  footer: {
    showBusinessInfoAndLogo: true,
    showSocialLinks: true,
    showMoreLinksSection: true,
    showPhysicalStoreSection: true,
    showLocationMap: true,
    showPolicyLinksBar: true,
  },
  
  // --- Page-Specific Sections ---
  accountPage: {
    showProfileSection: true,
    showAppearanceSection: true,
    showStatsLink: true,
    showDataLink: true,
    showOrderHistoryLink: true,
  },
  articlePages: { // Applies to both Blog and News articles
    showShareButtons: true,
    showRelatedPostsSidebar: true,
    showAdBannerInSidebar: true,
  },
  contactPage: {
    showContactInfoSection: true,
    showGlobeOrMapVisual: true,
    showContactForm: true,
  },
  productDetailPage: {
    showShareButtons: true,
    showRelatedProducts: true,
  },
  boutiquePage: {
    showAdBannerInSidebar: true,
  }
};