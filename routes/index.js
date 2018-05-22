const express = require('express');
const webPush = require('web-push');
const PushManager = require('./lib/push-manager');

const router = express.Router();

const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails('mailto:tomo.masakura+webpush@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

const pushManager = new PushManager();

router.get('/keys/public', (req, res) => {
  res.json({
    publicKey: vapidKeys.publicKey,
  });
});

router.post('/echo', (req, res) => {
  res.send(JSON.stringify({}));

  const message = JSON.stringify({
    title: 'こんにちは!',
    body: `今は ${new Date()} です。`,
    data: req.body.data,
  });

  pushManager.sendRandomDelay(req.body, message);
});

module.exports = router;
