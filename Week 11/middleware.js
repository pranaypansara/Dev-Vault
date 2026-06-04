const jwt = require("jsonwebtoken");
const JWT_SECRET = "jibberish";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "Token was incorrect",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
  JWT_SECRET: JWT_SECRET,
};
