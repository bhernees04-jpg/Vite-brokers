import { ensureSchema, sql } from './_lib/db.js';
import { requireUser } from './_lib/auth.js';
import { findMarket } from './_lib/markets.js';

export default async function handler(req, res) {
  await ensureSchema();
  const user = await requireUser(req, res, sql);
  if (!user) return;

  if (req.method === 'GET') {
    const { rows: orders } = await sql`
      SELECT * FROM orders WHERE user_id = ${user.id} ORDER BY created_at DESC LIMIT 50
    `;
    return res.status(200).json({ orders });
  }

  if (req.method === 'POST') {
    const { symbol, side, quantity } = req.body || {};
    const qty = Number(quantity);
    if (!symbol || !['buy', 'sell'].includes(side) || !(qty > 0)) {
      return res.status(400).json({ error: 'Provide a symbol, side (buy/sell) and a positive quantity.' });
    }
    const market = findMarket(symbol);
    if (!market) return res.status(404).json({ error: 'Unknown symbol.' });
    const price = market.price;
    const total = price * qty;

    const { rows: holdingRows } = await sql`
      SELECT * FROM holdings WHERE user_id = ${user.id} AND symbol = ${symbol}
    `;
    const holding = holdingRows[0];

    if (side === 'buy') {
      if (total > user.cash_balance) {
        return res.status(400).json({ error: 'Insufficient cash balance for this order.' });
      }
      await sql`UPDATE users SET cash_balance = cash_balance - ${total} WHERE id = ${user.id}`;
      if (holding) {
        const newQty = holding.quantity + qty;
        const newAvg = (holding.avg_price * holding.quantity + total) / newQty;
        await sql`UPDATE holdings SET quantity = ${newQty}, avg_price = ${newAvg} WHERE id = ${holding.id}`;
      } else {
        await sql`
          INSERT INTO holdings (user_id, symbol, quantity, avg_price) VALUES (${user.id}, ${symbol}, ${qty}, ${price})
        `;
      }
    } else {
      if (!holding || holding.quantity < qty) {
        return res.status(400).json({ error: 'You do not hold enough of this asset to sell that quantity.' });
      }
      await sql`UPDATE holdings SET quantity = quantity - ${qty} WHERE id = ${holding.id}`;
      await sql`UPDATE users SET cash_balance = cash_balance + ${total} WHERE id = ${user.id}`;
    }

    await sql`
      INSERT INTO orders (user_id, symbol, side, quantity, price, total)
      VALUES (${user.id}, ${symbol}, ${side}, ${qty}, ${price}, ${total})
    `;

    const { rows: updatedRows } = await sql`SELECT cash_balance FROM users WHERE id = ${user.id}`;
    return res.status(200).json({ ok: true, cashBalance: updatedRows[0].cash_balance, fillPrice: price });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
