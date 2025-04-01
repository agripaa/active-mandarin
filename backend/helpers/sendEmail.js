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

exports.sendTransactionStatusEmail = async (user, brand, transactionId, status, summaryCancel = null) => {
  let subject = "Status Transaksi Anda";
  let message = "";
  const invoiceLink = `${process.env.FRONTEND_URL}/invoice/${transactionId}`;

  const formattedPrice = brand.discount_price 
    ? `${formatRupiah(brand.discount_price)} (diskon dari ${formatRupiah(brand.price)})`
    : `${formatRupiah(brand.price)}`;


  if (status === "success") {
    message = `
      <p>Hallo, ${user.name}!</p>
      <p>Transaksi Anda telah <strong>disetujui</strong>. Terima kasih telah melakukan pembelian di Active Mandarin!</p>
      <p>Detail <strong>${brand.category_brand}</strong> yang anda pesan:</p>
      <p><strong>Variant:</strong> ${brand.variant}</p>
      <p><strong>Turunan:</strong> ${brand.turunan}</p>
      <p><strong>Harga:</strong> ${formattedPrice}</p>
      <p>Anda dapat melihat detail transaksi pada link berikut:</p>
      <a href="${invoiceLink}">${invoiceLink}</a>
    `;
  } else if (status === "cancel") {
    message = `
      <p>Hallo, ${user.name}!</p>
      <p>Maaf, transaksi Anda telah <strong>dibatalkan</strong>.</p>
      <p>Detail <strong>${brand.category_brand}</strong> yang anda pesan:</p>
      <p><strong>Variant:</strong> ${brand.variant}</p>
      <p><strong>Turunan:</strong> ${brand.turunan}</p>
      <p><strong>Harga:</strong> ${formattedPrice}</p>
      <p>Alasan pembatalan: <em>${summaryCancel}</em></p>
      <p>Anda dapat melihat detail transaksi pada link berikut:</p>
      <a href="${invoiceLink}">${invoiceLink}</a>
    `;
  }

  try {
    await transporter.sendMail({
      from: `"Active Mandarin" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: subject,
      html: `
        ${message}
        <br/>
        <p>Salam hangat,</p>
        <p>Tim Active Mandarin</p>
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
    ? `${formatRupiah(brand.discount_price)} (diskon dari ${formatRupiah(brand.price)})`
    : `${formatRupiah(brand.price)}`;

  const htmlContent = `
    <p>Halo Admin,</p>
    <p>Ada transaksi <strong>baru</strong> yang perlu di-approve.</p>
    <h4>Detail Transaksi</h4>
    <ul>
      <li><strong>Nama User:</strong> ${user.name}</li>
      <li><strong>Email:</strong> ${user.email}</li>
      <li><strong>Produk:</strong> ${brand.variant} (${brand.turunan})</li>
      <li><strong>Harga:</strong> ${formattedPrice}</li>
    </ul>
    <p>🔗 <strong>Invoice:</strong> <a href="${invoiceLink}">${invoiceLink}</a></p>
    <p>✅ <strong>Approve / Tolak:</strong> <a href="${approveUrl}">${approveUrl}</a></p>
    <br>
    <p>Salam,</p>
    <p>Tim Active Mandarin</p>
  `;

  const attachmentPath = path.join(__dirname, '..', proofTransactionPath);

  try {
    await transporter.sendMail({
      from: `"Active Mandarin" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Transaksi Baru Masuk - Perlu Persetujuan",
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
