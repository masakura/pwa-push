import { KeyManager } from './key-manager.js';
import { SubscriptionManager } from './subscription-manager.js';

(async () => {
  await Notification.requestPermission();
  const registration = await navigator.serviceWorker.register('sw.js');

  const keyManager = new KeyManager();

  const subscriptionManager = new SubscriptionManager(registration, keyManager);
  const subscription = await subscriptionManager.subscribe();

  document.querySelector('#echo')
    .addEventListener('click', () => subscriptionManager.echo(subscription));
})();
