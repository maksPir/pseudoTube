const telegramService = require('../service/telegram.service');
require('dotenv').config();
class TelegramController {
  async getHi(req, res, next) {
    try {
      const hi = await telegramService.getHi();
      return res.json(hi);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TelegramController();
