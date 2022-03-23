const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.Key, (err, user) => {
        if (err) {
          return res.status(403).send("unauthorized");
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).send("Access Denied.Not Authorized User");
    }
  } catch (err) {
    console.log(err);
  }
};
