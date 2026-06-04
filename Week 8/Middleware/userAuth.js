const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function userAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_USER_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).json({
          message: "auth failed",
        });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: "auth failed",
    });
  }
}

module.exports = {
  userAuth: userAuth,
};
