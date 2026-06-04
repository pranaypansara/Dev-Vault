const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_ADMIN_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).json({
          message: "auth failed (invalid token)",
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
  adminAuth: adminAuth,
};
