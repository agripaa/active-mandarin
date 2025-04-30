const db = require('../models');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../helpers/otpHelper');
const { generateUniqueReveralCode } = require('../helpers/generateReveralCode');
const { sendLinkForgotPassword } = require('../helpers/sendEmail');
require('dotenv').config();

const { User, OTP, Role, AffiliateDetail } = db;

exports.register = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    const roleUser = await Role.findOne({ where: { role_name: "user" } });
    if (!roleUser) return res.status(400).json({ status: false, message: 'Role user is not defined!' });

    const newUser = await User.create({
      name,
      email,
      number,
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

    
    const requiredFields = { name, email, type_affiliate, number, reason, platform, know_program };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: "These fields are required!",
        missing_fields: missingFields
      });
    }
    
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    
    const roleUser = await Role.findOne({ where: { role_name: "affiliator" } });
    if (!roleUser) return res.status(400).json({ status: false, message: 'Role affiliator is not defined!' });

    
    const reveral_code = await generateUniqueReveralCode();

    
    const newAffiliateDetail = await AffiliateDetail.create({
      type_affiliate,
      reason,
      platform,
      know_program
    });

    
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

exports.editUser = async (req, res) => {
  const { userId } = req;
  const { name, email, number, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ status: false, message: "User not found!" });

    let profile_img = user.profile_img;

    if (req.files && req.files.profile_img) {
      const uploadedFile = req.files.profile_img;
      const fileExt = path.extname(uploadedFile.name).toLowerCase();
      const allowedExt = ['.png', '.jpg', '.jpeg', '.webp'];
      const MAX_FILE_SIZE = 300 * 1024; // 300KB
    
      if (!allowedExt.includes(fileExt)) {
        return res.status(400).json({ error: 'Only PNG, JPG, JPEG, and WEBP files are allowed!' });
      }
    
      if (uploadedFile.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: 'Image file size must be less than 300KB!' });
      }
    
      const fileName = `${Date.now()}_${uploadedFile.name.replace(/\s/g, "_")}`;
      const filePath = path.join(__dirname, '../public/profile-user', fileName);
    
      if (user.profile_img) {
        const oldFilePath = path.join(__dirname, '../', user.profile_img);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    
      await uploadedFile.mv(filePath);
      profile_img = `/public/profile-user/${fileName}`;
    }    

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Email is already in use!' });
      }
    }

    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Old password is incorrect!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
    }

    await user.update({ name, email, number, profile_img });

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: { id: user.id, name: user.name, number: user.number, email: user.email, profile_img }
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ status: false, message: "Email tidak ditemukan!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/?reset_password_token=${token}`;

    await sendLinkForgotPassword(email, user, resetLink);

    res.status(200).json({ status: true, message: "Link reset password telah dikirim ke email Anda." });
  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ status: false, message: "Token dan password baru diperlukan" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ status: false, message: "User tidak ditemukan!" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    await user.update({ password: hashedPassword });

    return res.status(200).json({ status: true, message: "Password berhasil diubah!" });
  } catch (error) {
    console.error("🔥 ERROR:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ status: false, message: "Token sudah kadaluarsa!" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ status: false, message: "Token tidak valid!" });
    }

    res.status(500).json({ status: false, error: error.message });
  }
};

exports.resendOTPCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Email not registered!'});
    }

    const otpResponse = await generateOTP(user.id, email);
    if (!otpResponse.success) {
      return res.status(500).json({ status: false, message: "Failed to generate OTP" });
    }

    res.json({ status: true, message: 'OTP resent to email. Please verify to complete login.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}