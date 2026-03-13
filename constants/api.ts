export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000', // fallback for safety
  SETTINGS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`,
  FAQ: `${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs`,
  BRANCHES: `${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`,
  BLOG: `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`,
  GALLERY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery`,
  FEATURED_GALLARY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/featured `,
} as const;
