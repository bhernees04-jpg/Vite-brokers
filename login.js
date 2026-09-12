import { ensureSchema, sql } from './_lib/db.js';
import { hashPassword, makeSessionToken, setSessionCookie, publicUser } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  await ensureSchema();

  const { email, password } = req.body || {};
  const normalizedEmail = String(email || '').toLowerCase();
  const { rows } = await sql`SELECT * FROM users WHERE email = ${normalizedEmail}`;
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  const hash = hashPassword(password || '', user.password_salt);
  if (hash !== user.password_hash) return res.status(401).json({ error: 'Invalid email or password.' });

  setSessionCookie(res, makeSessionToken(user.id));
  return res.status(200).json({ user: publicUser(user) });
}
