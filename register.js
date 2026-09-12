import crypto from 'node:crypto';
import { ensureSchema, sql } from './_lib/db.js';
import { hashPassword, makeSessionToken, setSessionCookie, publicUser } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  await ensureSchema();

  const { email, password, fullName, region, baseCurrency } = req.body || {};
  if (!email || !password || !fullName || !region || !baseCurrency) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  const normalizedEmail = String(email).toLowerCase();
  const { rows: existing } = await sql`SELECT id FROM users WHERE email = ${normalizedEmail}`;
  if (existing[0]) return res.status(409).json({ error: 'An account with that email already exists.' });

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);
  const startingCash = { USD: 100000, EUR: 92000, BRL: 541000, JPY: 14980000 }[baseCurrency] || 100000;

  const { rows } = await sql`
    INSERT INTO users (email, password_hash, password_salt, full_name, region, base_currency, cash_balance)
    VALUES (${normalizedEmail}, ${hash}, ${salt}, ${fullName}, ${region}, ${baseCurrency}, ${startingCash})
    RETURNING *
  `;
  const user = rows[0];
  setSessionCookie(res, makeSessionToken(user.id));
  return res.status(201).json({ user: publicUser(user) });
}
