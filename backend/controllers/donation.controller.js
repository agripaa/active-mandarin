const { Donation } = require('../models');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../public/proof_donation');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.getAllDonation = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Donation.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      status: true,
      total_items: count,
      total_pages: Math.ceil(count / limit),
      current_page: parseInt(page),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findOne({ where: { id } });
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(200).json({ status: true, data: donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDonation = async (req, res) => {
  try {
    if (!req.files || !req.files.proof_payment) {
      return res.status(400).json({ error: 'Image Proof Payment is Required.' });
    }

    const proofPayment = req.files.proof_payment;
    const fileExt = path.extname(proofPayment.name).toLowerCase();
    const extVal = ['.png', 'jpg', '.webp', '.jepg']
    if (extVal.includes(fileExt)) {
      return res.status(400).json({ error: 'Image ext files not allowed!' });
    }

    const fileName = `${Date.now()}_${proofPayment.name}`;
    const filePath = path.join(uploadDir, fileName);

    proofPayment.mv(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed.' });
      }
      try {
        const { nama, email, payment_method } = req.body;
        if (!nama || !email || !payment_method) {
          return res.status(400).json({ error: 'All fields are required.' });
        }

        const newRecruitment = await Donation.create({
          nama,
          email,
          payment_method,
          proof_payment: fileName,
        });

        res.status(201).json({ status: true, data: newRecruitment });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findOne({ where: { id } });
    if (!donation) {
      return res.status(404).json({ error: 'Recruitment not found' });
    }

    const { nama, email, payment_method } = req.body;
    let updatedData = { nama, email, payment_method };

    if (req.files && req.files.proof_payment) {
      const proofPayment = req.files.proof_payment;
      const fileExt = path.extname(proofPayment.name).toLowerCase();
      const extVal = ['.png', 'jpg', '.webp', '.jepg']

      if (extVal.includes(fileExt)) {
        return res.status(400).json({ error: 'Image ext files are allowed!' });
      }

      const fileName = `${Date.now()}_${proofPayment.name}`;
      const filePath = path.join(uploadDir, fileName);
      proofPayment.mv(filePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'File upload failed.' });
        }
      });
      updatedData.proof_payment = fileName;
    }

    await Donation.update(updatedData, { where: { id } });
    res.status(200).json({ status: true, message: 'Donation entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findOne({ where: { id } });
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    await Donation.destroy({ where: { id } });
    res.status(200).json({ status: true, message: 'Donation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
