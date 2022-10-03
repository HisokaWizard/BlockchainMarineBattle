const userSchema = require('../models/user');
const mailService = require('./mail-service');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const tokenService = require('./token-service');

class UserService {
  async registration(email, password) {
    const candidate = await userSchema.findOne({ email });
    if (candidate) {
      throw new Error(`User with email ${email} already exists.`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid();
    const user = await userSchema.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(
      email,
      `${process.env.APP_URL}/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const candidate = await userSchema.findOne({ email });
    if (!candidate) {
      throw new Error(`User with email ${email} doesn't exist.`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    if (candidate.password !== hashPassword) {
      throw new Error(`Password incorrect.`);
    }
  }
}

module.exports = new UserService();
