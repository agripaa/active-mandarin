const { Recruitment } = require('../models');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Konfigurasi Upload CV (PDF Only)
const uploadDir = path.join(__dirname, '../public/cv');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Get All Recruitment Data with Pagination
exports.getAllRecruitments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Recruitment.findAndCountAll({
      where: { isDelete: false },
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

// Get Recruitment by ID
exports.getRecruitmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const recruitment = await Recruitment.findOne({ where: { id, isDelete: false } });
    if (!recruitment) {
      return res.status(404).json({ error: 'Recruitment not found' });
    }
    res.status(200).json({ status: true, data: recruitment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecruitment = async (req, res) => {
  try {
    if (!req.files || !req.files.cv_file) {
      return res.status(400).json({ error: 'CV file is required and must be a PDF.' });
    }

    const cvFile = req.files.cv_file;
    const fileExt = path.extname(cvFile.name).toLowerCase();
    if (fileExt !== '.pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed!' });
    }

    const fileName = `${Date.now()}_${cvFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    cvFile.mv(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed.' });
      }
      try {
        const { nama, email, telepon, domisili, posisi, portofolio } = req.body;
        if (!nama || !email || !telepon || !domisili || !posisi || !portofolio) {
          return res.status(400).json({ error: 'All fields are required.' });
        }

        const newRecruitment = await Recruitment.create({
          nama,
          email,
          telepon,
          domisili,
          posisi,
          portofolio,
          cv_file: fileName,
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

// Update Recruitment Entry
exports.updateRecruitment = async (req, res) => {
  try {
    const { id } = req.params;
    const recruitment = await Recruitment.findOne({ where: { id, isDelete: false } });
    if (!recruitment) {
      return res.status(404).json({ error: 'Recruitment not found' });
    }

    const { nama, email, telepon, domisili, posisi, portofolio } = req.body;
    let updatedData = { nama, email, telepon, domisili, posisi, portofolio };

    if (req.files && req.files.cv_file) {
      const cvFile = req.files.cv_file;
      const fileExt = path.extname(cvFile.name).toLowerCase();
      if (fileExt !== '.pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed!' });
      }
      const fileName = `${Date.now()}_${cvFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      cvFile.mv(filePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'File upload failed.' });
        }
      });
      updatedData.cv_file = fileName;
    }

    await Recruitment.update(updatedData, { where: { id } });
    res.status(200).json({ status: true, message: 'Recruitment entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft Delete Recruitment Entry
exports.deleteRecruitment = async (req, res) => {
  try {
    const { id } = req.params;
    const recruitment = await Recruitment.findOne({ where: { id, isDelete: false } });
    if (!recruitment) {
      return res.status(404).json({ error: 'Recruitment not found' });
    }
    await Recruitment.update({ isDelete: true }, { where: { id } });
    res.status(200).json({ status: true, message: 'Recruitment entry soft deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
