const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const tokenData = tokenService.validateAccessToken(accessToken);

    if (!tokenData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = tokenData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
