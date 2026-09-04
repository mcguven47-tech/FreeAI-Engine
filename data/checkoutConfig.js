// Centralized Payment & Checkout Configuration
// Connected to official FreeAI Engine accounts: Shopier & Buy Me a Coffee

export const CHECKOUT_CONFIG = {
  // $9 Consumer Digital Toolkit: 500+ Prompts, Workflows, Student & Office Templates
  starterVault: {
    priceUSD: 9,
    priceTRY: 350,
    title: 'The 2026 Free AI Starter Vault',
    checkoutUrl: 'https://buymeacoffee.com/freeaiengine',
    shopierUrl: 'https://www.shopier.com/freeaiengine',
  },

  // $3 Coffee Tip / Micro-donation to support open curation
  coffeeTip: {
    priceUSD: 3,
    title: 'Buy the Curation Team a Coffee',
    checkoutUrl: 'https://buymeacoffee.com/freeaiengine',
  },

  // $20 Maker Tier: Featured Tool Listing
  featuredListing: {
    priceUSD: 20,
    priceTRY: 750,
    title: 'Featured Tool 24h Launch',
    checkoutUrl: 'https://buymeacoffee.com/freeaiengine',
    shopierUrl: 'https://www.shopier.com/freeaiengine',
  },
}
