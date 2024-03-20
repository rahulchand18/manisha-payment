const requestIp = require("request-ip");
const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");

const cryptr = new Cryptr("1191J@Vr@HrM$y$teMNew*1221");

function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

function getBrowserInfo(req) {
  return req.headers["user-agent"] || "XX";
}

function getCountry(req) {
  return req.headers["cf-ipcountry"] ? req.headers["cf-ipcountry"] : "XX";
}

function getIp(req) {
  return requestIp.getClientIp(req);
}

function encryptText(text) {
  return cryptr.encrypt(text);
}

function createAccessToken(user) {
  const accessToken = jwt.sign(user, "8tS!QtTA69uP6nk*WG**pM6b", {
    expiresIn: "1d",
  });
  return encryptText(accessToken);
}

function decryptText(encryptedString) {
  const decryptedText = cryptr.decrypt(encryptedString);
  return decryptedText;
}

function getYearMonthDayFromDate(date) {
  const dateYear = new Date(date).getFullYear();
  const dateMonth = new Date(date).getMonth() + 1;
  const dateDay = new Date(date).getDate();
  return { dateYear, dateMonth, dateDay };
}

module.exports = {
  addHoursToDate,
  getBrowserInfo,
  getCountry,
  getIp,
  encryptText,
  createAccessToken,
  decryptText,
  getYearMonthDayFromDate,
};
