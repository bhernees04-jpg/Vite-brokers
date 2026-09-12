import crypto from 'node:crypto';

// In production on Vercel, set SESSION_SECRET as an environment variable
// (Project Settings -> Environment Variables). This fallback is fine for a
// demo but should not be relied on for anything real.
const SESSION_SECRET = process.env.SESSION_SECRET || 'meridian-demo-secret-change-me';

export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function makeSessionToken(userId) {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = `${userId}.${expires}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, expires, sig] = parts;
  const payload = `${userId}.${expires}`;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  if (sig !== expected) return null;
  if (Date.now() > Number(expires)) return null;
  return Number(userId);
}

export function parseCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

export function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', `session=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure');
}

export async function requireUser(req, res, sql) {
  const cookies = parseCookies(req);
  const userId = verifySessionToken(cookies.session);
  if (!userId) {
    res.status(401).json({ error: 'Not signed in.' });
    return null;
  }
  const { rows } = await sql`SELECT * FROM users WHERE id = ${userId}`;
  if (!rows[0]) {
    res.status(401).json({ error: 'Not signed in.' });
    return null;
  }
  return rows[0];
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    region: user.region,
    baseCurrency: user.base_currency,
  };
}
