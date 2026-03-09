#!/usr/bin/env node
// ================================================================
// THE PERFECT LOOK BY EMILY — Google Search Console Indexing Script
// ================================================================
// PURPOSE: Submits sitemap + requests immediate URL indexing via
//          Google Search Console API using a GCP Service Account.
//
// SETUP (one-time):
//   1. Go to Google Cloud Console → APIs & Services → Enable:
//      - "Google Search Console API"
//      - "Indexing API" (for individual URL submission)
//   2. Create / reuse service account:
//      github-actions-deployer@the-perfect-look-by-emily.iam.gserviceaccount.com
//   3. Download JSON key → save as gsc-key.json (NEVER commit this file)
//   4. In Google Search Console (search.google.com/search-console):
//      → Settings → Users and permissions → Add user
//      → Enter the service account email → set as Owner
//   5. Run: npm install googleapis
//   6. Run: node scripts/submit-indexing.js
// ================================================================

'use strict';

const { google } = require('googleapis');
const path       = require('path');
const https      = require('https');

// ── CONFIG ─────────────────────────────────────────────────────
const SITE_URL    = 'https://theperfectlookbyemily.ca/';
const SITEMAP_URL = 'https://theperfectlookbyemily.ca/sitemap.xml';
const KEY_FILE    = process.env.GSC_KEY_FILE || path.join(__dirname, '..', 'gsc-key.json');

// URLs to request immediate indexing for
const URLS_TO_INDEX = [
  'https://theperfectlookbyemily.ca/',
  'https://theperfectlookbyemily.ca/#services',
  'https://theperfectlookbyemily.ca/#about',
  'https://theperfectlookbyemily.ca/#gallery',
  'https://theperfectlookbyemily.ca/#book',
  'https://theperfectlookbyemily.ca/#contact',
];

async function main() {
  console.log('\n🔍 The Perfect Look By Emily — Google Indexing Script');
  console.log('══════════════════════════════════════════════════════\n');

  // ── AUTH ─────────────────────────────────────────────────────
  let auth;
  try {
    auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing',
      ],
    });
    console.log('✅ Auth: Service account loaded from', KEY_FILE);
  } catch (err) {
    console.error('❌ Auth failed:', err.message);
    console.log('   → Make sure gsc-key.json exists at:', KEY_FILE);
    process.exit(1);
  }

  const authClient = await auth.getClient();

  // ── STEP 1: Submit sitemap to Search Console ─────────────────
  console.log('\n📋 Step 1: Submitting sitemap to Google Search Console...');
  try {
    const webmasters = google.webmasters({ version: 'v3', auth: authClient });
    await webmasters.sitemaps.submit({
      siteUrl:    SITE_URL,
      feedpath:   SITEMAP_URL,
    });
    console.log('✅ Sitemap submitted:', SITEMAP_URL);
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    console.warn('⚠️  Sitemap submit warning:', msg);
    console.log('   → This may mean the sitemap was already submitted (that is fine).');
  }

  // ── STEP 2: Request immediate URL indexing ───────────────────
  console.log('\n🚀 Step 2: Requesting immediate indexing for', URLS_TO_INDEX.length, 'URLs...');
  const token = await authClient.getAccessToken();
  const accessToken = token.token || token;

  let successCount = 0;
  let failCount    = 0;

  for (const url of URLS_TO_INDEX) {
    try {
      const result = await submitIndexingRequest(accessToken, url);
      console.log('  ✅', url, '→', result.urlNotificationMetadata?.url ? 'queued' : JSON.stringify(result).substring(0, 80));
      successCount++;
    } catch (err) {
      console.warn('  ⚠️ ', url, '→', err.message);
      failCount++;
    }
    // Rate limit: 1 request per second (Google Indexing API limit)
    await sleep(1100);
  }

  // ── STEP 3: Verify sitemap status ───────────────────────────
  console.log('\n🔎 Step 3: Verifying sitemap status in Search Console...');
  try {
    const webmasters = google.webmasters({ version: 'v3', auth: authClient });
    const resp = await webmasters.sitemaps.get({
      siteUrl:  SITE_URL,
      feedpath: SITEMAP_URL,
    });
    const sm = resp.data;
    console.log('  📊 Sitemap status:', sm.lastSubmitted || 'unknown');
    console.log('  📊 Warnings:', sm.warnings || 0);
    console.log('  📊 Errors:', sm.errors || 0);
  } catch (err) {
    console.warn('  ⚠️  Could not retrieve sitemap status:', err.message);
  }

  console.log('\n══════════════════════════════════════════════════════');
  console.log(`✨ Done! ${successCount} URLs queued, ${failCount} warnings.`);
  console.log('   Google typically indexes within 24–48 hours.');
  console.log('   Monitor at: https://search.google.com/search-console\n');
}

function submitIndexingRequest(token, notificationUrl) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      url:  notificationUrl,
      type: 'URL_UPDATED',
    });
    const options = {
      hostname: 'indexing.googleapis.com',
      path:     '/v3/urlNotifications:publish',
      method:   'POST',
      headers:  {
        'Authorization': 'Bearer ' + token,
        'Content-Type':  'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed);
        } catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
