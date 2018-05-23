const express = require('express');
const webPush = require('web-push');
const PushManager = require('./lib/push-manager');
const debug = require('debug')('push-server:server');

const router = express.Router();

const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails('mailto:tomo.masakura+webpush@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

const pushManager = new PushManager();

const wait = miliseconds => new Promise(resolve => setTimeout(resolve, miliseconds));

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

router.post('/buy', (req, res) => {
  res.send(JSON.stringify({}));

  Promise.resolve()
    .then(() => wait(5000))
    .then(() => pushManager.send(req.body, {
      title: '配達中',
      body: 'ただいま配達中です。',
      data: Object.assign({}, req.body.data, { state: 'delivering' }),
    }))
    .then(() => wait(4000))
    .then(() => pushManager.send(req.body, {
      title: '配達完了',
      body: '配達が完了しました。',
      data: Object.assign({}, req.body.data, { state: 'complete' }),
    }))
    .catch(error => debug(error));
});

module.exports = router;
