import logger from './utils/loggerUtil';

export const register = (username) => {
  if ('serviceWorker' in navigator) {  
    logger.info('Service worker registering...');
    navigator.serviceWorker
      .register('/worker.js', { scope: '/public' })
      .then(async registration => {
        logger.info('Service worker registered!');
        logger.info('Notification subscribing...');
        await delay(1000);
        const subscription = await registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
        });

        await fetch('/subscribe', {
          method: 'POST',
          body: JSON.stringify({ userId: username, subscription}),
          headers: {
            'content-type': 'application/json'
          }
        });
        logger.info('Notification subscribed!');
      })
      .catch(error => logger.error(error));
  }
};

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}; 

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration('/public')
      .then(registration => {
        logger.info('Service worker unregistered');
        registration.unregister();
      })
      .catch(error => {
        logger.error(error.message);
      });
  }
}
