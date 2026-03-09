// ================================================================
// THE PERFECT LOOK BY EMILY — API Integration Test Suite
// ================================================================
// Run: npm install --save-dev jest node-fetch
// Then: npx jest scripts/api.test.js --verbose
// ================================================================

'use strict';

const BASE_URL = process.env.API_URL || 'https://perfectlookbyemily.onrender.com';

// Use built-in fetch (Node 18+) or node-fetch
const fetchFn = typeof fetch !== 'undefined' ? fetch : require('node-fetch');

// ── Helpers ───────────────────────────────────────────────────
async function api(path, options = {}) {
  const res = await fetchFn(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json', 'Origin': 'https://theperfectlookbyemily.ca', ...options.headers },
    ...options,
  });
  let body;
  try { body = await res.json(); } catch { body = {}; }
  return { status: res.status, body, headers: res.headers };
}

// ================================================================
// SUITE 1: Health & Availability
// ================================================================
describe('Health & Availability', () => {
  test('GET /health returns 200 with status ok', async () => {
    const { status, body } = await api('/health');
    expect(status).toBe(200);
    expect(body.status).toBe('ok');
    expect(body.env).toMatch(/sandbox|production/);
    expect(body.timestamp).toBeDefined();
  });

  test('GET /health includes env field', async () => {
    const { body } = await api('/health');
    expect(['sandbox', 'production']).toContain(body.env);
  });

  test('GET /sitemap.xml returns 200 with valid XML', async () => {
    const res = await fetchFn(BASE_URL + '/sitemap.xml');
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('theperfectlookbyemily.ca');
  });

  test('GET /robots.txt returns 200 with User-agent directive', async () => {
    const res = await fetchFn(BASE_URL + '/robots.txt');
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('User-agent');
    expect(text).toContain('Sitemap:');
  });
});

// ================================================================
// SUITE 2: CORS Headers
// ================================================================
describe('CORS — API endpoints allow Firebase origin', () => {
  const endpoints = ['/api/contact', '/api/payment', '/api/subscribe'];

  endpoints.forEach(endpoint => {
    test(`OPTIONS ${endpoint} returns 204 with CORS methods header`, async () => {
      const { status, headers } = await api(endpoint, { method: 'OPTIONS' });
      expect(status).toBe(204);
      const methods = headers.get('access-control-allow-methods') || '';
      expect(methods).toContain('POST');
    });
  });

  test('POST /api/contact includes ACAO header matching Firebase origin', async () => {
    const { headers } = await api('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'CORS Test', email: 'test@test.com', message: 'cors check' }),
      headers: { 'Origin': 'https://theperfectlookbyemily.ca', 'Content-Type': 'application/json' }
    });
    const acao = headers.get('access-control-allow-origin') || '';
    expect(acao).toBe('https://theperfectlookbyemily.ca');
  });
});

// ================================================================
// SUITE 3: Contact Form — Formspree Proxy
// ================================================================
describe('POST /api/contact — Formspree proxy', () => {
  test('returns 200 with success:true for valid payload', async () => {
    const { status, body } = await api('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test Client', email: 'test@example.com', message: 'Integration test' }),
    });
    expect(status).toBe(200);
    expect(body.success).toBe(true);
  });

  test('returns 400 when email is missing', async () => {
    const { status, body } = await api('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', message: 'No email' }),
    });
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  test('returns 400 when message is missing', async () => {
    const { status, body } = await api('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', email: 'test@example.com' }),
    });
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });
});

// ================================================================
// SUITE 4: Subscribe — Mailchimp Inner Circle
// ================================================================
describe('POST /api/subscribe — Mailchimp', () => {
  test('returns 200 for valid email (Mailchimp not configured = graceful)', async () => {
    const { status, body } = await api('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'innerCircle@test.com' }),
    });
    expect(status).toBe(200);
    expect(body.success).toBe(true);
  });

  test('returns 400 when email is missing', async () => {
    const { status, body } = await api('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });
});

// ================================================================
// SUITE 5: Square Payment — /api/payment
// ================================================================
describe('POST /api/payment — Square sandbox', () => {
  test('returns 400 when sourceId is missing', async () => {
    const { status, body } = await api('/api/payment', {
      method: 'POST',
      body: JSON.stringify({ verificationToken: 'test' }),
    });
    expect(status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('sourceId');
  });

  test('returns 4xx/5xx (not CORS error) for invalid nonce — endpoint is reachable', async () => {
    const { status } = await api('/api/payment', {
      method: 'POST',
      body: JSON.stringify({ sourceId: 'cnon:invalid-nonce-test' }),
    });
    // Should reach Square and fail with auth/card error, NOT a network/CORS error
    expect([400, 500, 422]).toContain(status);
  });

  // ManyChat lead capture slot — activate when ManyChat Page ID is configured
  // test('ManyChat → Square: mock lead passes through booking flow', async () => {
  //   // When ManyChat webhook fires with a lead, it should:
  //   // 1. POST to /api/contact with client details (captured lead)
  //   // 2. Square appointment would be created via Square Appointments API
  //   // This test validates step 1 (contact endpoint as lead capture):
  //   const { status, body } = await api('/api/contact', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: 'ManyChat Lead',
  //       email: 'manychat-lead@test.com',
  //       message: 'ManyChat booking request — Service: Balayage, Date: TBD',
  //     }),
  //   });
  //   expect(status).toBe(200);
  //   expect(body.success).toBe(true);
  // });
});

// ================================================================
// SUITE 6: Security Headers
// ================================================================
describe('Security headers on all responses', () => {
  test('X-Content-Type-Options is nosniff', async () => {
    const { headers } = await api('/health');
    expect(headers.get('x-content-type-options')).toBe('nosniff');
  });

  test('Strict-Transport-Security is present', async () => {
    const { headers } = await api('/health');
    const hsts = headers.get('strict-transport-security') || '';
    expect(hsts).toContain('max-age=');
  });

  test('X-Frame-Options is SAMEORIGIN', async () => {
    const { headers } = await api('/health');
    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
  });
});
