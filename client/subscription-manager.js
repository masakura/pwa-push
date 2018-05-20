export class SubscriptionManager {
  constructor(registration, keyManager) {
    this.pushManager = registration.pushManager;
    this.keyManager = keyManager;
  }

  async subscribe() {
    return (await this.pushManager.getSubscription()) ||
      (await this.performSubscribe());
  }

  async performSubscribe() {
    const key = await this.keyManager.publicKey();
    const subscription = await this.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: key.binary,
    });
    return subscription;
  }

  async echo(subscription) {
    this.keyManager.echo(subscription);
  }
}
