export function renderAdminHtml(inquiries = [], orders = []) {
  const paidCount = orders.filter(o => o.status === 'paid').length;
  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>1 Step More | Admin Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #2E7D32;
      --primary-dark: #1B5E20;
      --secondary: #F57C00;
      --bg: #F4F7F4;
      --card-bg: #FFFFFF;
      --text: #1C2B22;
      --text-muted: #5C6F64;
      --border: #E0E7E2;
      --success: #2E7D32;
      --warning: #F57C00;
      --danger: #D32F2F;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 24px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 2px solid var(--border);
    }
    .logo-badge {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
    .brand-title span { color: var(--secondary); }
    .badge-admin {
      background: #E8F5E9;
      color: var(--primary);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--card-bg);
      padding: 20px;
      border-radius: 14px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .stat-card h4 {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .stat-card .stat-num {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
    .tabs-nav {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    .tab-btn {
      padding: 12px 20px;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 700;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--text-muted);
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    .search-bar {
      margin-bottom: 16px;
      display: flex;
      gap: 12px;
    }
    .search-input {
      flex: 1;
      max-width: 400px;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-family: inherit;
      font-size: 0.9rem;
    }
    .table-container {
      background: var(--card-bg);
      border-radius: 14px;
      border: 1px solid var(--border);
      overflow-x: auto;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.88rem;
    }
    th {
      background: #FAFCFA;
      padding: 14px 16px;
      font-weight: 700;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #F8FBF8; }
    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .status-paid { background: #E8F5E9; color: var(--success); }
    .status-pending { background: #FFF3E0; color: var(--warning); }
    .status-failed { background: #FFEBEE; color: var(--danger); }
    .btn-action {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.8rem;
      margin-right: 6px;
    }
    .btn-call { background: #E8F5E9; color: var(--primary); }
    .btn-wa { background: #25D366; color: #FFFFFF; }
    .btn-refresh {
      background: var(--primary);
      color: #FFF;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
    }
    .empty-state {
      padding: 48px;
      text-align: center;
      color: var(--text-muted);
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="logo-badge">
      <div class="brand-title">1 Step <span>More</span></div>
      <div class="badge-admin">Admin Dashboard</div>
    </div>
    <button class="btn-refresh" onclick="location.reload()">🔄 Refresh Leads</button>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <h4>Consultation Enquiries</h4>
      <div class="stat-num">${inquiries.length}</div>
    </div>
    <div class="stat-card">
      <h4>Total Enrolled Orders</h4>
      <div class="stat-num">${orders.length}</div>
    </div>
    <div class="stat-card">
      <h4>Paid Enrollments</h4>
      <div class="stat-num" style="color: var(--primary);">${paidCount}</div>
    </div>
    <div class="stat-card">
      <h4>Total Paid (INR)</h4>
      <div class="stat-num" style="color: var(--secondary);">₹${totalRevenue.toLocaleString('en-IN')}</div>
    </div>
  </div>

  <div class="tabs-nav">
    <button class="tab-btn active" onclick="switchTab('inquiries')">📋 Consultation Enquiries (${inquiries.length})</button>
    <button class="tab-btn" onclick="switchTab('orders')">💳 Paid Orders & Enrollments (${orders.length})</button>
  </div>

  <div class="search-bar">
    <input type="text" id="searchInput" class="search-input" placeholder="Search by name, phone or email..." onkeyup="filterTables()">
  </div>

  <!-- Tab 1: Inquiries -->
  <div id="inquiriesTab" class="table-container">
    ${inquiries.length === 0 ? '<div class="empty-state">No consultation enquiries submitted yet.</div>' : `
    <table id="inquiriesTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Date & Time</th>
          <th>Name</th>
          <th>Phone / Contact</th>
          <th>Email</th>
          <th>Reason / Goal</th>
          <th>City / Address</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        ${inquiries.map((inq, idx) => {
          const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
          const waLink = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : '#';
          return `
          <tr>
            <td><strong>#${inq.id || (idx + 1)}</strong></td>
            <td>${inq.created_at || 'Recently'}</td>
            <td><strong>${escapeHtml(inq.name)}</strong></td>
            <td>
              <a class="btn-action btn-call" href="tel:${inq.phone}">📞 ${escapeHtml(inq.phone)}</a>
              <a class="btn-action btn-wa" href="${waLink}" target="_blank">WhatsApp</a>
            </td>
            <td><a href="mailto:${inq.email}">${escapeHtml(inq.email)}</a></td>
            <td><span class="status-badge" style="background:#E3F2FD;color:#1565C0;">${escapeHtml(inq.reason || 'General')}</span></td>
            <td>${escapeHtml(inq.address || '-')}</td>
            <td style="max-width: 250px;">${escapeHtml(inq.message || '-')}</td>
          </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    `}
  </div>

  <!-- Tab 2: Orders -->
  <div id="ordersTab" class="table-container" style="display: none;">
    ${orders.length === 0 ? '<div class="empty-state">No program orders recorded yet.</div>' : `
    <table id="ordersTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Program</th>
          <th>Duration</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Payment / Order ID</th>
          <th>Medical Details</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map((ord, idx) => {
          const cleanPhone = (ord.phone || '').replace(/[^0-9]/g, '');
          const waLink = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : '#';
          const statusClass = ord.status === 'paid' ? 'status-paid' : ord.status === 'failed' ? 'status-failed' : 'status-pending';
          return `
          <tr>
            <td><strong>#${ord.id || (idx + 1)}</strong></td>
            <td>${ord.created_at || 'Recently'}</td>
            <td><strong>${escapeHtml(ord.name)}</strong><br/><small>${escapeHtml(ord.email)}</small></td>
            <td>
              <a class="btn-action btn-call" href="tel:${ord.phone}">📞 ${escapeHtml(ord.phone)}</a>
              <a class="btn-action btn-wa" href="${waLink}" target="_blank">WhatsApp</a>
            </td>
            <td><strong>${escapeHtml(ord.program_id)}</strong></td>
            <td>${ord.duration} Weeks</td>
            <td><strong>₹${Number(ord.amount).toLocaleString('en-IN')}</strong></td>
            <td><span class="status-badge ${statusClass}">${ord.status}</span></td>
            <td style="font-size:0.75rem; color:var(--text-muted);">
              <strong>Order:</strong> ${escapeHtml(ord.razorpay_order_id || '-')}<br/>
              <strong>Pay:</strong> ${escapeHtml(ord.razorpay_payment_id || '-')}
            </td>
            <td style="font-size:0.8rem;">
              Blood: ${escapeHtml(ord.blood_group || '-')}<br/>
              Age: ${ord.age || '-'} | Wt: ${escapeHtml(ord.weight || '-')}<br/>
              Ht: ${escapeHtml(ord.height || '-')}
            </td>
            <td style="max-width: 180px; font-size: 0.8rem;">${escapeHtml(ord.address || '-')}</td>
          </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    `}
  </div>

  <script>
    function switchTab(tabName) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      if (tabName === 'inquiries') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('inquiriesTab').style.display = 'block';
        document.getElementById('ordersTab').style.display = 'none';
      } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('inquiriesTab').style.display = 'none';
        document.getElementById('ordersTab').style.display = 'block';
      }
    }

    function filterTables() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      document.querySelectorAll('tbody tr').forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
