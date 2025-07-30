const Router = require('express');
const router = new Router();
const telegramController = require('../telegram/controller/telegram.controller');
router.get('/telegram', telegramController.getHi);

module.exports = router;
