'use strict';
// ================================================================
// THE PERFECT LOOK BY EMILY — server.js GOLD MASTER
// ================================================================
// ENVIRONMENT VARIABLES REQUIRED (set in Render dashboard):
//   SQUARE_ACCESS_TOKEN — your Live (or Sandbox) Access Token
//   SQUARE_LOCATION_ID  — your Live (or Sandbox) Location ID
//   SQUARE_ENV          — 'sandbox' | 'production'
//   FORMSPREE_ENDPOINT  — xzdjpakd
//   MAILCHIMP_API_KEY   — your Mailchimp API key
//   MAILCHIMP_LIST_ID   — your Mailchimp audience list ID
//   MAILCHIMP_SERVER    — your Mailchimp server prefix (e.g. us14)
// ================================================================
const express    = require('express');
const compression = require('compression');
const helmet     = require('helmet');
const path       = require('path');
const crypto     = require('crypto');
const https      = require('https');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── SQUARE (lazy-require to prevent cold-start crash) ──────────────
const SQUARE_ENV = (process.env.SQUARE_ENV || 'sandbox').toLowerCase();
let squareClient = null;
function getSquareClient() {
  if (squareClient) return squareClient;
  try {
    const { Client, Environment } = require('square');
    squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN || 'REPLACE_WITH_ACCESS_TOKEN',
      environment:
        SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
    });
  } catch (e) {
    console.error('Square client init error:', e.message);
  }
  return squareClient;
}

// ── CORS ────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://theperfectlookbyemily.ca',
  'https://the-perfect-look-by-emily.web.app',
  'https://the-perfect-look-by-emily.firebaseapp.com',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ── MIDDLEWARE ──────────────────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        scriptSrc:   [
          "'self'", "'unsafe-inline'",
          'https://cdn.tailwindcss.com',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://sandbox.web.squarecdn.com',
          'https://web.squarecdn.com',
          'https://www.gstatic.com',
          'https://fonts.googleapis.com',
        ],
        styleSrc:    ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc:     ["'self'", 'https://fonts.gstatic.com'],
        imgSrc:      ["'self'", 'data:', 'https:', 'blob:'],
        connectSrc:  [
          "'self'",
          'https://www.google-analytics.com',
          'https://formspree.io',
          'https://connect.squareupsandbox.com',
          'https://connect.squareup.com',
          'https://firestore.googleapis.com',
          'https://identitytoolkit.googleapis.com',
          'https://securetoken.googleapis.com',
        ],
        frameSrc:    ["'self'", 'https://www.google.com'],
        workerSrc:   ["'self'", 'blob:'],
        mediaSrc:    ["'self'"],
      },
    },
    crossOriginEmbedderPolicy:    false,
    crossOriginResourcePolicy:    { policy: 'cross-origin' },
  })
);

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  next();
});

// ── STATIC FILES ────────────────────────────────────────────────────
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge:     '1y',
    etag:       true,
    index:      false,
    fallthrough: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// ── ROOT ROUTE ──────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ================================================================
// API: POST /api/payment — Square createPayment ($25 CAD deposit)
// ================================================================
app.post('/api/payment', async (req, res) => {
  try {
    const { sourceId, verificationToken, amount, currency, note } = req.body;
    if (!sourceId) {
      return res.status(400).json({ success: false, error: 'Missing sourceId.' });
    }

    const client = getSquareClient();
    if (!client) {
      return res.status(503).json({ success: false, error: 'Payment service unavailable.' });
    }

    const chargeAmount  = amount   || 2500;   // 2500 cents = $25.00 CAD
    const chargeCurrency = currency || 'CAD';
    const idempotencyKey = crypto.randomUUID();
    const locationId    = process.env.SQUARE_LOCATION_ID || 'REPLACE_WITH_LOCATION_ID';

    const paymentBody = {
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount:   BigInt(chargeAmount),
        currency: chargeCurrency,
      },
      locationId,
      note:         note || 'Appointment Deposit — The Perfect Look By Emily',
      autocomplete: true,
    };

    if (verificationToken) {
      paymentBody.verificationToken = verificationToken;
    }

    const { result } = await client.paymentsApi.createPayment(paymentBody);
    const payment = result.payment;
    console.log('[Square] Payment created:', payment.id, payment.status);

    // ── Post-payment: fire Formspree notification ─────────────────
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'xzdjpakd';
    try {
      await postFormspree(formspreeEndpoint, {
        name:     'Deposit Notification',
        email:    'deposit@theperfectlookbyemily.ca',
        message:  `New $25 deposit received. Payment ID: ${payment.id}. Status: ${payment.status}. Amount: ${chargeCurrency} ${(chargeAmount / 100).toFixed(2)}.`,
        _subject: 'New Deposit — The Perfect Look By Emily',
      });
    } catch (fErr) {
      console.warn('[Formspree] Notification failed:', fErr.message);
    }

    return res.status(200).json({
      success:   true,
      paymentId: payment.id,
      status:    payment.status,
      message:   'Deposit confirmed. Emily will be in touch shortly.',
    });
  } catch (err) {
    console.error('[Square] createPayment error:', err);
    const msg = err.result?.errors?.[0]?.detail || err.message || 'Payment processing failed.';
    return res.status(500).json({ success: false, error: msg });
  }
});

// ================================================================
// API: POST /api/contact — Formspree proxy
// ================================================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ success: false, error: 'Email and message are required.' });
    }
    const endpoint = process.env.FORMSPREE_ENDPOINT || 'xzdjpakd';
    await postFormspree(endpoint, { name, email, message });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[Contact] error:', err.message);
    return res.status(500).json({ success: false, error: 'Could not send message.' });
  }
});

// ================================================================
// API: POST /api/subscribe — Mailchimp Inner Circle
// ================================================================
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email required.' });

    const apiKey = process.env.MAILCHIMP_API_KEY || '';
    const listId = process.env.MAILCHIMP_LIST_ID || '';
    const server = process.env.MAILCHIMP_SERVER  || 'us1';

    if (!apiKey || !listId) {
      console.warn('[Mailchimp] Not configured. Skipping subscribe.');
      return res.status(200).json({ success: true, note: 'Mailchimp not configured.' });
    }

    const subscriberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    const mcData = JSON.stringify({
      email_address: email,
      status_if_new: 'subscribed',
      status:        'subscribed',
    });

    const result = await mcRequest(server, apiKey, listId, subscriberHash, mcData);
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('[Mailchimp] error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ================================================================
// UTILITY HELPERS
// ================================================================
function postFormspree(endpoint, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'formspree.io',
      path:     '/f/' + endpoint,
      method:   'POST',
      headers:  {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept':         'application/json',
      },
    };
    const req = https.request(options, (resp) => {
      let raw = '';
      resp.on('data', (chunk) => { raw += chunk; });
      resp.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function mcRequest(server, apiKey, listId, subscriberHash, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: server + '.api.mailchimp.com',
      path:     '/3.0/lists/' + listId + '/members/' + subscriberHash,
      method:   'PUT',
      headers:  {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization':  'Basic ' + Buffer.from('anystring:' + apiKey).toString('base64'),
      },
    };
    const req = https.request(options, (resp) => {
      let raw = '';
      resp.on('data', (chunk) => { raw += chunk; });
      resp.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ================================================================
// SYSTEM ROUTES
// ================================================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status:    'ok',
    env:       SQUARE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://theperfectlookbyemily.ca/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nSitemap: https://theperfectlookbyemily.ca/sitemap.xml');
});

// ── PRIVACY & TERMS ─────────────────────────────────────────────────
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

// ── SPA CATCH-ALL ───────────────────────────────────────────────────
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── START ───────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`The Perfect Look By Emily — running on port ${PORT} [${SQUARE_ENV.toUpperCase()}]`);
});
