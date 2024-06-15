/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('push', ev => {
  const data = ev.data.json();

  console.log(`Notification received for Task ---> ${data.title}`);

  ev.waitUntil(
    self.registration.showNotification(data.title, {
      body: 'Time to finish the task!',
      icon: 'https://drive.usercontent.google.com/download?id=14g471RZoXG4ibl-V043uHd5N6TlJ3OJx',
    })
  );
}); 
