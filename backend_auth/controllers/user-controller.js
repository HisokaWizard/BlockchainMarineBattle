const userService = require('../services/user-service');

const thirtyDaysMillisec = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userResult = await userService.registration(email, password);
      res.cookie('refreshToken', userResult.refreshToken, {
        maxAge: thirtyDaysMillisec,
        httpOnly: true,
      });
      res.send(userResult);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userResult = await userService.login(email, password);
      res.cookie('refreshToken', userResult.refreshToken, {
        maxAge: thirtyDaysMillisec,
        httpOnly: true,
      });
      res.send(userResult);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async active(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json([{ name: 'Petr', surname: 'Nikolaev', age: 29 }]);
    } catch (error) {}
  }
}

module.exports = new UserController();
