// Centralized Payment & Checkout Configuration
// You can replace these with your actual Buy Me a Coffee, Lemon Squeezy, Shopier, or Stripe links at any time.

export const CHECKOUT_CONFIG = {
  // $9 Consumer Digital Toolkit: 500+ Prompts, Workflows, Student & Office Templates
  starterVault: {
    priceUSD: 9,
    priceTRY: 350,
    title: 'The 2026 Free AI Starter Vault',
    // Paste your BuyMeACoffee extra link, Shopier link, or Lemon Squeezy link below:
    checkoutUrl: process.env.NEXT_PUBLIC_VAULT_CHECKOUT_URL || '',
  },

  // $3 Coffee Tip / Micro-donation to support open curation
  coffeeTip: {
    priceUSD: 3,
    title: 'Buy the Curation Team a Coffee',
    // Paste your BuyMeACoffee profile or tip link below:
    checkoutUrl: process.env.NEXT_PUBLIC_COFFEE_CHECKOUT_URL || '',
  },

  // $20 Maker Tier: Featured Tool Listing
  featuredListing: {
    priceUSD: 20,
    priceTRY: 750,
    title: 'Featured Tool 24h Launch',
    // Paste your Shopier or Lemon Squeezy link below:
    checkoutUrl: process.env.NEXT_PUBLIC_FEATURED_CHECKOUT_URL || '',
  },
}
