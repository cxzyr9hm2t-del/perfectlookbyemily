// ================================================================
// THE PERFECT LOOK BY EMILY â square-integration.js  GOLD MASTER
// ================================================================
// SANDBOX â PRODUCTION SWITCH:
//   In firebase-deploy/index.html, change these two consts:
//     const SQUARE_APP_ID      = 'sandbox-sq0idb-...'  â 'sq0idp-...'
//     const SQUARE_LOCATION_ID = 'L...'                â your live ID
//   AND change the SDK script src:
//     sandbox.web.squarecdn.com/v1/square.js â web.squarecdn.com/v1/square.js
// ================================================================

'use strict';

// ââ State ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
let _squarePayments = null;
let _squareCard     = null;
let _sqInitialized  = false;

// ââ Glassmorphic card-field style config âââââââââââââââââââââââââ
const SQ_STYLE = {
  '.input-container': {
    borderColor:  '#8b5cf6',
    borderRadius: '12px',
  },
  '.input-container.is-focus': {
    borderColor: '#2dd4bf',
    boxShadow:   '0 0 0 2px rgba(45,212,191,0.25)',
  },
  '.input-container.is-error': {
    borderColor: '#ef4444',
  },
  '.message-text': { color: '#9ca3af' },
  '.message-icon': { color: '#9ca3af' },
  'input': {
    color:      '#e2e8f0',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize:   '15px',
  },
  'input::placeholder': {
    color: '#6b7280',
  },
};

// ================================================================
// initSquare() â called on DOMContentLoaded
// ================================================================
async function initSquare() {
  const container = document.getElementById('square-card-container');
  if (!container) return;

  if (!window.Square) {
    console.warn('[Square] SDK not loaded â check script src.');
    _setSquareStatus('Payment system unavailable. Please call (613) 929-8711.', 'error');
    return;
  }

  // Pull credentials from inline consts set in index.html
  const appId      = (typeof SQUARE_APP_ID      !== 'undefined') ? SQUARE_APP_ID      : '';
  const locationId = (typeof SQUARE_LOCATION_ID !== 'undefined') ? SQUARE_LOCATION_ID : '';

  if (!appId || appId.includes('REPLACE')) {
    console.log('[Square] Credentials not set â deposit panel disabled.');
    _sandboxHelperVisible(true);
    return;
  }

  try {
    _squarePayments = window.Square.payments(appId, locationId);

    _squareCard = await _squarePayments.card({ style: SQ_STYLE });
    await _squareCard.attach('#square-card-container');

    console.log('[Square] Card fields initialized.');

    // Show or hide sandbox helper based on ENV
    const env = (typeof ENV !== 'undefined') ? ENV : 'sandbox';
    _sandboxHelperVisible(env === 'sandbox');

    _sqInitialized = true;
  } catch (err) {
    console.error('[Square] initSquare error:', err);
    _setSquareStatus('Card fields failed to load. Please try again.', 'error');
  }
}

// ================================================================
// handleSquarePayment() â called by Pay button onclick
// ================================================================
async function handleSquarePayment() {
  if (!_sqInitialized || !_squareCard) {
    _setSquareStatus('Payment system is initialising â please wait a moment.', 'error');
    return;
  }

  const currentUser = (typeof auth !== 'undefined') ? auth.currentUser : null;
  if (!currentUser) {
    _setSquareStatus('Please sign in before paying.', 'error');
    return;
  }

  const payBtn = document.getElementById('square-pay-btn');
  _setSquareStatus('', '');
  _btnLoading(payBtn, true);

  try {
    // Step 1 â Tokenize card
    const tokenResult = await _squareCard.tokenize();
    if (tokenResult.status !== 'OK') {
      const msg = tokenResult.errors
        ? tokenResult.errors.map(e => e.message).join(' ')
        : 'Card error â please check your details.';
      _setSquareStatus(msg, 'error');
      _btnLoading(payBtn, false);
      return;
    }

    // Step 2 â verifyBuyer (SCA â required for Canada)
    let verificationToken = null;
    try {
      const verifyResult = await _squarePayments.verifyBuyer(
        tokenResult.token,
        {
          intent:        'CHARGE',
          amount:        '25.00',
          currencyCode:  'CAD',
          countryCode:   'CA',
          billingContact: {
            givenName:    (currentUser.displayName || 'Client').split(' ')[0],
            familyName:   (currentUser.displayName || '').split(' ').slice(1).join(' ') || '',
            email:        currentUser.email || '',
          },
        }
      );
      if (verifyResult) verificationToken = verifyResult.token;
    } catch (sca) {
      console.warn('[Square] SCA skipped (acceptable in sandbox):', sca.message);
    }

    // Step 3 â POST to backend /api/payment
    _setSquareStatus('Processing paymentâ¦', 'info');

    const service = document.getElementById('bkService')?.value || 'Appointment';
    const response = await fetch('https://perfectlookbyemily.onrender.com/api/payment', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceId:          tokenResult.token,
        verificationToken: verificationToken,
        amount:            2500,
        currency:          'CAD',
        note:              'Deposit â ' + service,
      }),
    });

    const data = await response.json();

    if (data.success) {
      _onPaymentSuccess(service, currentUser);
    } else {
      _setSquareStatus(data.error || 'Payment failed â please try again.', 'error');
      _btnLoading(payBtn, false);
    }

  } catch (err) {
    console.error('[Square] handleSquarePayment error:', err);
    _setSquareStatus('Network error: ' + err.message, 'error');
    _btnLoading(payBtn, false);
  }
}

// ================================================================
// _onPaymentSuccess() â show success state + submit booking
// ================================================================
function _onPaymentSuccess(service, user) {
  // Hide payment UI
  const hideIds = ['square-card-container','square-status-msg','square-pay-btn','sandbox-helper'];
  hideIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Hide the "Secure Your Appointment" header row inside the teal panel
  const panelHeader = document.querySelector('.glass-teal .flex');
  if (panelHeader) panelHeader.style.display = 'none';

  // Show success panel
  const successPanel = document.getElementById('square-success-panel');
  if (successPanel) successPanel.classList.remove('hidden');

  // Toast
  if (typeof showToast === 'function') {
    showToast('Deposit Confirmed! Check your email for your Consultation Guide.');
  }

  // Fire booking submission (bypass payment re-check)
  if (typeof db !== 'undefined' && user) {
    const booking = {
      userId:        user.uid,
      userEmail:     user.email,
      name:          document.getElementById('bkName')?.value || user.displayName || '',
      service:       service,
      date:          document.getElementById('bkDate')?.value  || '',
      time:          document.getElementById('bkTime')?.value  || '',
      notes:         document.getElementById('bkNotes')?.value || '',
      depositPaid:   true,
      depositAmount: 2500,
      status:        'pending',
      createdAt:     firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection('bookings').add(booking)
      .then(() => console.log('[Booking] Saved with deposit flag.'))
      .catch(e  => console.error('[Booking] Save error:', e.message));
  }

  // Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      currency: 'CAD',
      value:    25.00,
      items: [{ item_name: service, price: 25.00, quantity: 1 }],
    });
  }
}

// ================================================================
// PRIVATE HELPERS
// ================================================================
function _setSquareStatus(msg, type) {
  const el = document.getElementById('square-status-msg');
  if (!el) return;
  el.textContent = msg;
  el.className   = 'text-sm mb-3 min-h-5 ';
  if (type === 'error') el.className += 'text-red-400';
  else if (type === 'info') el.className += 'text-teal-400';
  else el.className += '';
}

function _btnLoading(btn, loading) {
  if (!btn) return;
  btn.disabled    = loading;
  btn.textContent = loading
    ? 'Processing...'
    : 'Pay $25 Deposit & Request Appointment';
}

function _sandboxHelperVisible(show) {
  const el = document.getElementById('sandbox-helper');
  if (el) el.style.display = show ? 'block' : 'none';
}
