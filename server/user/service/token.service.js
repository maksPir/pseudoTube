const jwt = require('jsonwebtoken');
const db = require('../../db');
require('dotenv').config();
class TokenService {
  generatesTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }
  async isExistToken(user_id) {
    const candidate = await db.query(`SELECT count(*) FROM tokens WHERE user_id='${user_id}'`);
    if (Number(candidate.rows[0].count) == 0) return false;
    return true;
  }
  async isExistTokenByToken(token) {
    const candidate = await db.query(`SELECT * FROM tokens WHERE refresh_token='${token}'`);
    if (candidate.rowCount == 0) return false;
    return candidate.rows[0];
  }
  async saveToken(userId, refreshToken) {
    const isExist = await this.isExistToken(userId);
    if (isExist) {
      return await db.query(`UPDATE tokens set refresh_token='${refreshToken}' where user_id=${userId} returning *`);
    } else {
      return await db.query(`INSERT INTO tokens( refresh_token, user_id) values('${refreshToken}',${userId})`);
    }
  }
  async deleteToken(refreshToken) {
    return await db.query(`DELETE FROM tokens WHERE refresh_token='${refreshToken}' returning *`);
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch {
      return null;
    }
  }
}

module.exports = new TokenService();
