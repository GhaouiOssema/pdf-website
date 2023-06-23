const authorizeUser = (req, res, next) => {
  const { userRole } = req.user;

  if (userRole !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

module.exports = authorizeUser;
