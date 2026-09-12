import { ensureSchema, sql } from './_lib/db.js';
import { requireUser, publicUser } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });
  await ensureSchema();
  const user = await requireUser(req, res, sql);
  if (!user) return; // requireUser already sent the response
  return res.status(200).json({ user: publicUser(user) });
}
