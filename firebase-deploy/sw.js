// ================================================================
// THE PERFECT LOOK BY EMILY — Service Worker (sw.js)
// v2 — service account CI/CD v3 — raw JSON secret fix
// Handles Firebase Cloud Messaging push notifications
// ================================================================
'use strict';

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCvWfCBZ0ZiRhH4OvSs4B3DbLQAmw8b0gQ",
  authDomain: "the-perfect-look-by-emily.firebaseapp.com",
  projectId: "the-perfect-look-by-emily",
  storageBucket: "the-perfect-look-by-emily.firebasestorage.app",
  messagingSenderId: "666646387432",
  appId: "1:666646387432:web:55291b4ef09d4fdf09075d",
  measurementId: "G-RGWTM46YWT"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);
  const notificationTitle = payload.notification?.title || 'The Perfect Look By Emily';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: payload.data || {},
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('https://theperfectlookbyemily.ca/')
    );
  }
});

// Cache key for offline support
const CACHE_NAME = 'the-perfect-look-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/js/square-integration.js',
      ]).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});
