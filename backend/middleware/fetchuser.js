const jwt = require("jsonwebtoken");
const JWT_SECRET = "happy Day";
const fetchuser = (req, res, next) => {
  //get the user from the jwt token ans add id to req object
  const token = req.header("auth-token");
  if (!token) {
    req.status(401).send({ error: "please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    req.status(401).send({ error: "please authenticate using a valid token" });
  }
};



module.exports = fetchuser;
