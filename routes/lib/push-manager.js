const webPush = require('web-push');

module.exports = class PushManager {
  send(subscription, message) {
    webPush.sendNotification(subscription, message);
  }

  sendRandomDelay(subscription, message) {
    setTimeout(() => this.send(subscription, message), (Math.random() * 2000) + 3000);
  }
};
