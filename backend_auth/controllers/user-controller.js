const userService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/api-error');

const thirtyDaysMillisec = 30 * 24 * 60 * 60 * 1000;

const setRefreshToken = (res, token) => {
  res.cookie('refreshToken', token, {
    maxAge: thirtyDaysMillisec,
    httpOnly: true,
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email, password } = req.body;
      const userResult = await userService.registration(email, password);
      setRefreshToken(res, userResult.refreshToken);
      return res.json(userResult);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userResult = await userService.login(email, password);
      setRefreshToken(res, userResult.refreshToken);
      return res.json(userResult);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.refresh(refreshToken);
      setRefreshToken(res, refreshToken);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
