import { randomBytes } from 'crypto';

/**
 * Generate a random token for email verification
 * @returns A random string token
 */
export function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Calculate token expiration date (24 hours from now)
 * @returns Date object set to 24 hours from now
 */
export function getTokenExpiration(): Date {
  const date = new Date();
  date.setHours(date.getHours() + 24);
  return date;
}

/**
 * Check if a token is expired
 * @param expiryDate The token expiration date
 * @returns Boolean indicating if the token is expired
 */
export function isTokenExpired(expiryDate: Date | null): boolean {
  if (!expiryDate) return true;
  return new Date() > expiryDate;
}
