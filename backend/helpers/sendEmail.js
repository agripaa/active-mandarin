const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Active Mandarin" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.sendLinkForgotPassword = async (email, user, link) => {
  try {
    await transporter.sendMail({
      from: `"Active Mandarin" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset Password",
      html: `
        <h2>Hallo, ${user.name}!</h2>
        <p>Pastikan akun yang ingin anda ubah passwordnya sudah benar:</p>
        <ul>
            <li><strong>Nama:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>No. Telepon:</strong> ${user.number || "-"}</li>
        </ul>
        <h4><strong style={{ color: "red" }}>Reminder!</strong></h4>
        <p><strong style="color: red;">Harap jangan berikan link dibawah ini ke orang lain</strong></p>
        <a href="${link}">${link}</a>
        <p>Expired Time: 1 hours.</p>
        <br>
        <p>Salam,</p>
        <p>Tim Active Mandarin</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}