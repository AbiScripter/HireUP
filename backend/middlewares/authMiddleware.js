const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer" text
  if (!token)
    return res.status(401).json({ msg: "Access Denied: Invalid Token Format" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employer = decoded; // Attach user info to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

module.exports = authMiddleware;
