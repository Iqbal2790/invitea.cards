// Simple in-memory rate limiter for Next.js Middleware (Edge/Node compatible)
// ponytail: using local memory Map for rate limiting. In multi-instance serverless deployments (e.g. Vercel),
// this only limits per-instance. Upgrade to Upstash Redis or similar distributed cache if deploying to serverless.

const rateLimitMap = new Map();

export function isRateLimited(ip, limit = 60, windowMs = 60 * 1000) {
  const now = Date.now();
  const key = ip;

  // Cleanup expired entries periodically to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) {
        rateLimitMap.delete(k);
      }
    }
  }

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const rateLimitInfo = rateLimitMap.get(key);

  if (now > rateLimitInfo.resetTime) {
    rateLimitInfo.count = 1;
    rateLimitInfo.resetTime = now + windowMs;
    return false;
  }

  rateLimitInfo.count++;
  if (rateLimitInfo.count > limit) {
    return true; // Yes, rate limited
  }

  return false;
}
