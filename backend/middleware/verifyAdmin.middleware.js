const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config();

exports.authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'your_secret_key');

    const user = await User.findByPk(decoded.id, {
      include: { model: Role }
    });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found!" });
    }

    // Cek apakah user adalah admin
    if (user.Role.role_name !== "admin") {
      return res.status(403).json({ status: false, message: "Access denied. Only admins can perform this action." });
    }

    req.user = user;
    req.userId = user.id;
    req.userRole = user.Role.role_name;
    req.jwtPayload = decoded;

    next();
  } catch (error) {
    return res.status(400).json({ status: false, message: 'Invalid token' });
  }
};
