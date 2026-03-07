export function getCorsHeaders(origin: string | null) {
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN || 'https://mohana.digital',
    'https://mohana.digital', // Fallback
  ];

  // Allow requests from subpaths
  const isAllowedOrigin =
    origin && allowedOrigins.some(allowed => origin.startsWith(allowed));

  return new Headers({
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
  });
}
