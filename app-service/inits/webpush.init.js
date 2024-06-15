const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Singleton object to manage web push configuration
const WebPushSingleton = (() => {
  let instance;

  function createInstance() {
    webpush.setVapidDetails(
      'mailto:pbiswas101a@gmail.com', 
      publicVapidKey, 
      privateVapidKey
    );

    return webpush;
  }

  return {
    // Public method to get the web push instance
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

module.exports = WebPushSingleton;
