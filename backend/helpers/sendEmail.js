const nodemailer = require('nodemailer');
const { formatRupiah } = require('./formatRupiah');
require('dotenv').config();
const path = require('path');

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
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Hello!</h2>
        <p>You are trying to verify your email using a One-Time Password (OTP).</p>
        <p><strong>Your OTP code is:</strong></p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for <strong>5 minutes</strong>.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p>Active Mandarin Indonesia Team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};


exports.sendLinkForgotPassword = async (email, user, link) => {
  try {
    await transporter.sendMail({
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Hello, ${user.name}!</h2>
        <p>Please confirm that the account you want to reset the password for is correct:</p>
        <ul>
            <li><strong>Name:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Phone Number:</strong> ${user.number || "-"}</li>
        </ul>
        <h4><strong style="color: red;">Reminder!</strong></h4>
        <p><strong style="color: red;">Please do not share the link below with anyone</strong></p>
        <a href="${link}">${link}</a>
        <p>This link will expire in 1 hour.</p>
        <br>
        <p>Best regards,</p>
        <p>Active Mandarin Indonesia Team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.sendTransactionStatusEmail = async (user, brand, transactionId, status, summaryCancel = null) => {
  let subject = "Your Transaction Status";
  let message = "";
  const invoiceLink = `${process.env.FRONTEND_URL}/invoice/${transactionId}`;

  const formattedPrice = brand.discount_price 
    ? `${formatRupiah(brand.discount_price)} (discounted from ${formatRupiah(brand.price)})`
    : `${formatRupiah(brand.price)}`;

  if (status === "success") {
    message = `
      <p>Hello, ${user.name}!</p>
      <p>Your transaction has been <strong>approved</strong>. Thank you for purchasing from Active Mandarin Indonesia!</p>
      <ul>
        <li>Here are the details of your <strong>${brand.category_brand}</strong> order:</li>
        <li><strong>Variant:</strong> ${brand.variant}</li>
        <li><strong>Type:</strong> ${brand.turunan}</li>
        <li><strong>Price:</strong> ${formattedPrice}</li>
      </ul>
      <p>You can view the transaction details at the link below:</p>
      <a href="${invoiceLink}">${invoiceLink}</a>
    `;
  } else if (status === "cancel") {
    message = `
      <p>Hello, ${user.name}!</p>
      <p>We're sorry, your transaction has been <strong>cancelled</strong>.</p>
      <p>Here are the details of your <strong>${brand.category_brand}</strong> order:</p>
      <ul>
        <li><strong>Variant:</strong> ${brand.variant}</li>
        <li><strong>Type:</strong> ${brand.turunan}</li>
        <li><strong>Price:</strong> ${formattedPrice}</li>
        <li><strong>Reason for cancellation:</strong> <em>${summaryCancel}</em></li>
      </ul>
      <p>You can view the transaction details at the link below:</p>
      <a href="${invoiceLink}">${invoiceLink}</a>
    `;
  }

  try {
    await transporter.sendMail({
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: subject,
      html: `
        ${message}
        <br/>
        <p>Warm regards,</p>
        <p>Active Mandarin Indonesia Team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending transaction email:", error);
  }
};

exports.sendNewTransactionNotificationToAdmin = async (user, brand, transactionId, proofTransactionPath) => {
  const invoiceLink = `${process.env.FRONTEND_URL}/invoice/${transactionId}`;
  const approveUrl = `${process.env.FRONTEND_URL}/notifikasi`;

  const formattedPrice = brand.discount_price
    ? `${formatRupiah(brand.discount_price)} (discounted from ${formatRupiah(brand.price)})`
    : `${formatRupiah(brand.price)}`;

  const htmlContent = `
    <p>Hello Admin,</p>
    <p>A <strong>new transaction</strong> has been made and requires your approval.</p>
    <h4>Transaction Details</h4>
    <ul>
      <li><strong>User Name:</strong> ${user.name}</li>
      <li><strong>Email:</strong> ${user.email}</li>
      <li><strong>Product:</strong> ${brand.variant} (${brand.turunan})</li>
      <li><strong>Price:</strong> ${formattedPrice}</li>
    </ul>
    <p>🔗 <strong>Invoice:</strong> <a href="${invoiceLink}">${invoiceLink}</a></p>
    <p>✅ <strong>Approve / Reject:</strong> <a href="${approveUrl}">${approveUrl}</a></p>
    <br>
    <p>Best regards,</p>
    <p>Active Mandarin Indonesia Team.</p>
  `;

  const attachmentPath = path.join(__dirname, '..', proofTransactionPath);

  try {
    await transporter.sendMail({
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Transaction Received - Approval Needed",
      html: htmlContent,
      attachments: [
        {
          filename: path.basename(proofTransactionPath),
          path: attachmentPath
        }
      ]
    });
  } catch (error) {
    console.error("Error sending new transaction email to admin:", error);
  }
};

exports.sendAffiliatorApprovedEmail = async (user, link) => {
  try {
    await transporter.sendMail({
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Your Affiliator Account Has Been Approved!",
      html: `
        <h2>Congratulations, ${user.name}!</h2>
        <p>Your affiliator account has been approved by the admin. Here are your account details:</p>
        <ul>
          <li><strong>Name:</strong> ${user.name}</li>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Phone Number:</strong> ${user.number || "-"}</li>
          <li><strong>Referral Code:</strong> ${user.reveral_code || "-"}</li>
          <li><strong>Default Password:</strong> NewAffiliatorMandarin</li>
        </ul>
        <p><strong>Please change your password immediately for account security!</strong></p>
        <p>Thank you for joining as an affiliator with Active Mandarin Indonesia.</p>
        <p>You can login via the link listed below:</p>
        <a href="${link}">${link}</a>
        <br>
        <p>Warm regards,</p>
        <p>Active Mandarin Indonesia Team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending affiliator approval email:", error);
  }
};

exports.sendAffiliatorRejectedEmail = async (user, summaryCancel) => {
  try {
    await transporter.sendMail({
      from: `"Active Mandarin Indonesia" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Your Affiliator Application Has Been Rejected",
      html: `
        <h2>Hello, ${user.name}</h2>
        <p>We regret to inform you that your application to become an affiliator at Active Mandarin has been rejected.</p>
        <p><strong>Reason:</strong> ${summaryCancel}</p>
        <p>You may contact us for more information.</p>
        <br>
        <p>Warm regards,</p>
        <p>Active Mandarin Indonesia Team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending affiliator rejection email:", error);
  }
};
