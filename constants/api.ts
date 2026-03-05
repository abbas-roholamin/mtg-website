export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000', // fallback for safety
  SETTINGS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`,
} as const;
