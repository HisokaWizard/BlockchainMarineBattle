const jwt = require('jsonwebtoken');
const ApiError = require('../exeptions/api-error');
const tokenSchema = require('../models/token');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return tokenData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return tokenData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenSchema.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = tokenSchema.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await tokenSchema.deleteOne({ refreshToken });
    return token;
  }

  async findToken(token) {
    const tokenData = await tokenSchema.findOne({ token });
    return tokenData;
  }
}

module.exports = new TokenService();
