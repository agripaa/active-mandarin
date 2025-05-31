const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const { Ujian } = db;

exports.createUjian = async (req, res) => {
  try {
    const {
      nama_ujian,
      level,
      harga_normal,
      harga_diskon,
      harga_certif,
      commission,
      total_skor,
      desc,
      isProgres,
      isDone,
      isCheck,
    } = req.body;

    let ujian_img = null;

    if (req.files && req.files.ujian_img) {
      const imgFile = req.files.ujian_img;
      const ext = path.extname(imgFile.name).toLowerCase();
      const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allowedExt.includes(ext)) {
        return res.status(400).json({ status: false, message: "Only image files are allowed!" });
      }

      const fileName = `${Date.now()}_${imgFile.name.replace(/\s/g, "_")}`;
      const filePath = path.join(__dirname, '../public/ujian', fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      await imgFile.mv(filePath);
      ujian_img = `/public/ujian/${fileName}`;
    }

    const ujian = await Ujian.create({
      nama_ujian,
      level,
      harga_normal,
      harga_diskon,
      harga_certif,
      ujian_img,
      commission,
      total_skor,
      desc,
      isProgres,
      isDone,
      isCheck,
    });

    res.status(201).json({ status: true, message: "Ujian created successfully", data: ujian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getAllUjian = async (req, res) => {
  try {
    const ujian = await Ujian.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: ujian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getUjianById = async (req, res) => {
  try {
    const ujian = await Ujian.findByPk(req.params.id);
    if (!ujian) {
      return res.status(404).json({ status: false, message: "Ujian not found" });
    }
    res.json({ status: true, data: ujian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.updateUjian = async (req, res) => {
  try {
    const ujian = await Ujian.findByPk(req.params.id);
    if (!ujian) {
      return res.status(404).json({ status: false, message: "Ujian not found" });
    }

    const {
      nama_ujian,
      level,
      harga_normal,
      harga_diskon,
      harga_certif,
      commission,
      total_skor,
      desc,
      isProgres,
      isDone,
      isCheck,
    } = req.body;

    let ujian_img = ujian.ujian_img;

    if (req.files && req.files.ujian_img) {
      const imgFile = req.files.ujian_img;
      const ext = path.extname(imgFile.name).toLowerCase();
      const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allowedExt.includes(ext)) {
        return res.status(400).json({ status: false, message: "Only image files are allowed!" });
      }

      const fileName = `${Date.now()}_${imgFile.name.replace(/\s/g, "_")}`;
      const filePath = path.join(__dirname, '../public/ujian', fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      await imgFile.mv(filePath);
      ujian_img = `/public/ujian/${fileName}`;
    }

    await ujian.update({
      nama_ujian,
      level,
      harga_normal,
      harga_diskon,
      harga_certif,
      ujian_img,
      commission,
      total_skor,
      desc,
      isProgres,
      isDone,
      isCheck,
    });

    res.json({ status: true, message: "Ujian updated successfully", data: ujian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.deleteUjian = async (req, res) => {
  try {
    const ujian = await Ujian.findByPk(req.params.id);
    if (!ujian) {
      return res.status(404).json({ status: false, message: "Ujian not found" });
    }

    await ujian.destroy();
    res.json({ status: true, message: "Ujian deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
