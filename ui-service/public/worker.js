/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('push', ev => {
  const data = ev.data.json();

  self.registration.showNotification(data.title, {
    body: 'Hello, World!',
    icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
  })
}); 