const jwt = require('jsonwebtoken');
const { User, Role, OTP } = require('../models');
require('dotenv').config();

exports.authenticateUser = async (req, res, next) => {
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

    // Cek apakah OTP sudah diverifikasi
    const otpEntry = await OTP.findOne({ where: { user_id: user.id } });
    if (otpEntry) {
      return res.status(403).json({ status: false, message: "User has not verified OTP yet." });
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
