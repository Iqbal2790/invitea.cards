import { SignJWT, jwtVerify } from 'jose';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("FATAL: JWT_SECRET environment variable is missing.");
  }
  return new TextEncoder().encode(secret);
}

export async function createToken(payload) {
  const key = getJwtSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function verifyToken(token) {
  try {
    const key = getJwtSecret();
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}
