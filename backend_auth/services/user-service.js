const userSchema = require('../models/user');
const mailService = require('./mail-service');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const tokenService = require('./token-service');
const ApiError = require('../exeptions/api-error');

const updateAndSetToken = async (user, tokenService) => {
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

class UserService {
  async registration(email, password) {
    const candidate = await userSchema.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists.`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid();
    const user = await userSchema.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(
      email,
      `${process.env.SERVER_URL}/activate/${activationLink}`,
    );
    return updateAndSetToken(user, tokenService);
  }

  async login(email, password) {
    const user = await userSchema.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} doesn't exist.`);
    }
    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      throw ApiError.BadRequest(`Password incorrect.`);
    }
    return updateAndSetToken(user, tokenService);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink) {
    const user = await userSchema.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(`Activation link is not correct.`);
    }
    user.isActivated = true;
    await user.save();
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const validatedToken = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!validatedToken || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = userSchema.findById(tokenFromDb.userId);
    return updateAndSetToken(user, tokenService);
  }

  async getAllUsers() {
    const allUsers = await userSchema.find();
    return allUsers;
  }
}

module.exports = new UserService();
