const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../helpers/otpHelper');
const { generateUniqueReveralCode } = require('../helpers/generateReveralCode');
require('dotenv').config();

const { User, OTP, Role, AffiliateDetail } = db;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    const roleUser = await Role.findOne({ where: { role_name: "user" } });
    if (!roleUser) return res.status(400).json({ status: false, message: 'Role user is not defined!' });

    const newUser = await User.create({
      name,
      email,
      password,
      role_id: roleUser.id
    });

    res.status(201).json({ status: true, message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    const roleUser = await Role.findOne({ where: { role_name: "admin" } });
    if (!roleUser) return res.status(400).json({ status: false, message: 'Role user is not defined!' });

    const newUser = await User.create({
      name,
      email,
      password,
      role_id: roleUser.id
    });

    res.status(201).json({ status: true, message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerAffiliate = async (req, res) => {
  try {
    const { name, email, type_affiliate, number, reason, platform, know_program } = req.body;

    // Validasi field yang kosong
    const requiredFields = { name, email, type_affiliate, number, reason, platform, know_program };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: "These fields are required!",
        missing_fields: missingFields
      });
    }
    
    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    // Ambil role affiliator
    const roleUser = await Role.findOne({ where: { role_name: "affiliator" } });
    if (!roleUser) return res.status(400).json({ status: false, message: 'Role affiliator is not defined!' });

    // Generate unique referral code
    const reveral_code = await generateUniqueReveralCode();

    // Buat data affiliate detail
    const newAffiliateDetail = await AffiliateDetail.create({
      type_affiliate,
      reason,
      platform,
      know_program
    });

    // Buat user baru sebagai affiliator
    const newUser = await User.create({
      name,
      email,
      number,
      reveral_code, 
      password: "NewAffiliatorMandarin",
      detail_affiliate: newAffiliateDetail.id,
      role_id: roleUser.id
    });

    res.status(201).json({ status: true, message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Email not registered!'});
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, message: 'Invalid password!' });
    }


    const otpResponse = await generateOTP(user.id, email);
    if (!otpResponse.success) {
      return res.status(500).json({ status: false, message: "Failed to generate OTP" });
    }

    res.json({ status: true, message: 'OTP sent to email. Please verify to complete login.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp_code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ status: false, message: 'User not found' });

    const otpEntry = await OTP.findOne({
      where: { user_id: user.id, otp_code },
    });

    if (!otpEntry || new Date(otpEntry.expires_at) < new Date()) {
      return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
    }


    await OTP.destroy({ where: { id: otpEntry.id } });


    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ status: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where:{ id: req.user.id},
      attributes: { exclude: ['password'] },
      include: [{
        model: Role,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      },{
        model: AffiliateDetail,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      }]
    });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
