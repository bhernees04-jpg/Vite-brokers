import { ensureSchema, sql } from './_lib/db.js';
import { requireUser } from './_lib/auth.js';
import { findMarket } from './_lib/markets.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });
  await ensureSchema();
  const user = await requireUser(req, res, sql);
  if (!user) return;

  const { rows: holdings } = await sql`
    SELECT * FROM holdings WHERE user_id = ${user.id} AND quantity > 0
  `;

  const enriched = holdings.map((h) => {
    const market = findMarket(h.symbol);
    const currentPrice = market ? market.price : h.avg_price;
    const marketValue = currentPrice * h.quantity;
    const costBasis = h.avg_price * h.quantity;
    return {
      symbol: h.symbol,
      name: market ? market.name : h.symbol,
      category: market ? market.category : null,
      quantity: h.quantity,
      avgPrice: h.avg_price,
      currentPrice,
      marketValue,
      pnl: marketValue - costBasis,
      pnlPct: costBasis ? ((marketValue - costBasis) / costBasis) * 100 : 0,
    };
  });

  const holdingsValue = enriched.reduce((sum, h) => sum + h.marketValue, 0);
  return res.status(200).json({
    cashBalance: user.cash_balance,
    holdingsValue,
    totalEquity: user.cash_balance + holdingsValue,
    baseCurrency: user.base_currency,
    holdings: enriched,
  });
}
