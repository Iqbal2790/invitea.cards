import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'invitea-super-secret-jwt-key-2026-min-32-chars';
const key = new TextEncoder().encode(secretKey);

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}
