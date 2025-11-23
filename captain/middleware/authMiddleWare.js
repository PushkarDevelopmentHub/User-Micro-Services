const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklisttokenModel = require("../models/blacklisttoken.model");

module.exports.captainAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const isBlacklisted = await blacklisttokenModel.find({ token });

    if (isBlacklisted.length) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decoded.id);

    if (!captain) {
      return res
        .status(401)
        .json({ message: "Unauthorized: captain not found" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
