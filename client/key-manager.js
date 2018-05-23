class Key {
  constructor(text) {
    this.text = text;
    this.binary = this.toBinary(text);
  }

  toBinary(base64) {
    const data = base64.replace(/-/g, '+').replace(/_/g, '/');
    const raw = window.atob(data);
    const binary = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      binary[i] = raw.charCodeAt(i);
    }
    return binary;
  }
}

export class KeyManager {
  async fetch() {
    const response = await fetch('http://localhost:3000/keys/public');
    return (await response.json()).publicKey;
  }

  /**
   * @returns {Promise<Key>}
   */
  async publicKey() {
    const publicKey = await this.fetch();
    return new Key(publicKey);
  }

  async subscribe(subscription) {
    await fetch('http://localhost:3000/keys/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async echo(subscription) {
    await fetch('http://localhost:3000/echo', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async buy(subscription) {
    await fetch('http://localhost:3000/buy', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
