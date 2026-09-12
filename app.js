// Shared helpers used across app pages.

const CATEGORY_LABELS = {
  crypto: 'Crypto',
  fx: 'FX',
  stocks: 'Stocks',
  commodities: 'Commodities',
};

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

function fmtMoney(value, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function fmtPrice(value) {
  const decimals = value >= 1000 ? 2 : value >= 1 ? 4 : 6;
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: decimals });
}

function fmtPct(value) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

const NAV_ITEMS = [
  { href: '/dashboard.html', label: 'Dashboard' },
  { href: '/markets.html', label: 'Markets' },
  { href: '/portfolio.html', label: 'Portfolio' },
  { href: '/account.html', label: 'Account' },
];

async function renderShell(activeHref) {
  const mount = document.getElementById('sidebar-mount');
  if (!mount) return null;
  let user;
  try {
    ({ user } = await api('/api/me'));
  } catch {
    window.location.href = '/login.html';
    return null;
  }

  const links = NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" class="${item.href === activeHref ? 'active' : ''}">${item.label}</a>`
  ).join('');

  mount.innerHTML = `
    <div class="brand"><span class="mark"></span> Meridian</div>
    <nav class="nav-links">${links}</nav>
    <div class="sidebar-foot">
      <div class="user-name">${user.fullName}</div>
      <div class="user-meta">${user.region} · ${user.baseCurrency} account</div>
      <button class="btn btn-secondary btn-sm btn-block" id="logout-btn">Sign out</button>
    </div>
  `;

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await api('/api/logout', { method: 'POST' });
    window.location.href = '/index.html';
  });

  return user;
}
