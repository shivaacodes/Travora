import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { serialize, parse } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

// Replace this with a secure key in production
const SECRET_KEY = process.env.JWT_SECRET || "your-secure-secret-key";
const secretKey = new TextEncoder().encode(SECRET_KEY);
const TOKEN_EXPIRATION = "1h";

// Encrypt function
export async function encrypt(payload: object): Promise<string> {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(secretKey);
}

// Decrypt function
export async function decrypt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Set a cookie
export function setSessionCookie(res: NextApiResponse, token: string): void {
  const cookie = serialize("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
  res.setHeader("Set-Cookie", cookie);
}

// Clear the cookie
export function clearSessionCookie(res: NextApiResponse): void {
  const cookie = serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: -1, // Expire immediately
  });
  res.setHeader("Set-Cookie", cookie);
}

// Create session and set the cookie
export async function createSession(
  user: { id: string; email: string },
  res: NextApiResponse
): Promise<void> {
  const payload = { sub: user.id, email: user.email };
  const token = await encrypt(payload);
  setSessionCookie(res, token);
}

// Verify session from the cookie
export async function verifySessionFromCookie(
  req: NextApiRequest
): Promise<JWTPayload | null> {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.session;
  if (!token) {
    return null;
  }
  return await decrypt(token);
}
