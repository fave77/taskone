const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Setting Vapid details
webpush.setVapidDetails('mailto:pbiswas101a@gmail.com', publicVapidKey, privateVapidKey);

module.exports = webpush;