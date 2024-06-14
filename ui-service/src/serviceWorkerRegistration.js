import logger from './utils/loggerUtil';

export const register = () => {
  if ('serviceWorker' in navigator) {  
    run().catch(error => logger.error(error));
  }
};

const run = async () => {
  logger.info('Registering service worker');
  const registration = await navigator.serviceWorker.register('/worker.js', { scope: '/public' });
  logger.info('Registered service worker');

  const subscription = await registration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
    });
  logger.info('Registering push notification');

  await fetch(process.env.REACT_APP_API_URL + '/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  logger.info('Registered push notification');
}

   

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        logger.error(error.message);
      });
  }
}
