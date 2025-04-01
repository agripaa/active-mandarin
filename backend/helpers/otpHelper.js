const db = require('../models');
const { sendOTP } = require('./sendEmail');

const OTP = db.OTP;

// **Fungsi untuk generate OTP**
exports.generateOTP = async (userId, email) => {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expired dalam 5 menit

    // Simpan OTP ke database
    const otpExist = await OTP.findOne({where: { user_id: userId }});
    
    if(otpExist) {
      await OTP.update({ otp_code: otpCode, expires_at: expiresAt }, {where: {id: otpExist.id}})
    } else {
      await OTP.create({ user_id: userId, otp_code: otpCode, expires_at: expiresAt });
    }

    // Kirim OTP ke email user
    await sendOTP(email, otpCode);

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error generating OTP:", error);
    return { success: false, message: "Failed to generate OTP" };
  }
};
