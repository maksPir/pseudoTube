class TelegramService {
  async getHi() {
    return { hi: 'ПРивет' };
  }
}

module.exports = new TelegramService();
