const { v4: uuidv4 } = require("uuid");
const RefreshTokenModel = require("../models/refresh-token.model");
const EmployeeModel = require("../models/user");
const {
  getIp,
  getBrowserInfo,
  getCountry,
  encryptText,
  decryptText,
} = require("../utils/utils");

const REFRESH_TOKEN_EXPIRATION_MS = 10080 * 60 * 1000;

const createRefreshToken = async (req, userId) => {
  const refreshTokenData = await RefreshTokenModel.findOne({
    $and: [
      { userId },
      { expireIn: { $gte: new Date() } },
      { $or: [{ revoke: { $eq: null } }, { revoke: { $exists: false } }] },
    ],
  });
  if (refreshTokenData) {
    refreshTokenData.expireIn = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRATION_MS
    );
    await refreshTokenData.save();
    return refreshTokenData.refreshToken;
  } else {
    const refreshToken = new RefreshTokenModel({
      userId,
      refreshToken: uuidv4(),
      ip: getIp(req),
      browser: getBrowserInfo(req),
      country: getCountry(req),
      expireIn: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MS),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }
};

const findRefreshToken = async (token) => {
  return await RefreshTokenModel.findOne({ refreshToken: token });
};

const updateRefreshToken = async (refreshToken) => {
  const refreshTokenData = await RefreshTokenModel.findOne({
    revoke: null,
    refreshToken: decryptText(refreshToken),
  });
  if (refreshTokenData) {
    refreshTokenData.expireIn = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRATION_MS
    );
    return await refreshTokenData.save();
  }
};

const revokeRefreshToken = async (req) => {
  const refreshToken = req.cookies["refresh-token"];
  if (refreshToken) {
    const refreshTokenData = await RefreshTokenModel.findOne({
      refreshToken: decryptText(refreshToken),
    });
    if (refreshTokenData) {
      refreshTokenData.revoke = new Date();
      refreshTokenData.revokeIp = getIp(req);
      await refreshTokenData.save();
    }
  }
};

const setCookie = (cookieName, token, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Number(Date.now()) + REFRESH_TOKEN_EXPIRATION_MS),
    secure: true,
  };
  res.cookie(cookieName, encryptText(token), cookieOptions);
};

const destroyCookie = (cookieName, res) => {
  res.cookie(cookieName, { expires: new Date() });
};

const AuthService = {
  createRefreshToken,
  setCookie,
  findRefreshToken,
  updateRefreshToken,
  revokeRefreshToken,
  destroyCookie,
};

module.exports = AuthService;
