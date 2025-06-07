const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Soal, TipeUjian, ListJawaban } = db;

// Helper: Validasi file
const isValidFileType = (filename) => {
  const allowedExt = ['.jpg', '.jpeg', '.png', '.pdf', '.mp4', '.mp3'];
  const ext = path.extname(filename).toLowerCase();
  return allowedExt.includes(ext);
};

// CREATE
exports.createSoal = async (req, res) => {
  try {
    const {
      tipe_ujian_id,
      index_soal,
      pertanyaan,
      skor_soal,
      tipe_soal,
      penjelasan,
      list_jawaban_id,
      mutiple,
      point_soal,
      jawaban_benar,
      soal_awal,
      soal_akhir
    } = req.body;

    const tipeUjian = await TipeUjian.findByPk(tipe_ujian_id);
    if (!tipeUjian) {
      return res.status(404).json({ status: false, message: "TipeUjian not found" });
    }

    let file_soal = null;
    if (req.files && req.files.file_soal) {
      const file = req.files.file_soal;

      if (!isValidFileType(file.name)) {
        return res.status(400).json({ status: false, message: "Invalid file type for soal" });
      }

      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = path.join(__dirname, '../public/soal', fileName);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      await file.mv(filePath);
      file_soal = `/public/soal/${fileName}`;
    }

    const soal = await Soal.create({
      tipe_ujian_id,
      index_soal,
      pertanyaan,
      skor_soal,
      tipe_soal,
      penjelasan,
      list_jawaban_id,
      mutiple: mutiple === 'true' || mutiple === true,
      point_soal,
      jawaban_benar,
      soal_awal,
      soal_akhir,
      file_soal
    });

    res.status(201).json({ status: true, message: "Soal created successfully", data: soal });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// READ ALL
exports.getAllSoal = async (req, res) => {
  try {
    const soals = await Soal.findAll({
      include: [TipeUjian, ListJawaban],
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: soals });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// READ BY ID
exports.getSoalById = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id, {
      include: [TipeUjian, ListJawaban]
    });

    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal not found" });
    }

    res.json({ status: true, data: soal });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// UPDATE
exports.updateSoal = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id);
    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal not found" });
    }

    const {
      tipe_ujian_id,
      index_soal,
      pertanyaan,
      skor_soal,
      tipe_soal,
      penjelasan,
      list_jawaban_id,
      mutiple,
      point_soal,
      jawaban_benar,
      soal_awal,
      soal_akhir
    } = req.body;

    let file_soal = soal.file_soal;

    if (req.files && req.files.file_soal) {
      const file = req.files.file_soal;

      if (!isValidFileType(file.name)) {
        return res.status(400).json({ status: false, message: "Invalid file type for soal" });
      }

      // Delete old file if exists
      if (file_soal && fs.existsSync(path.join(__dirname, '..', file_soal))) {
        fs.unlinkSync(path.join(__dirname, '..', file_soal));
      }

      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = path.join(__dirname, '../public/soal', fileName);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      await file.mv(filePath);
      file_soal = `/public/soal/${fileName}`;
    }

    await soal.update({
      tipe_ujian_id: tipe_ujian_id ?? soal.tipe_ujian_id,
      index_soal: index_soal ?? soal.index_soal,
      pertanyaan: pertanyaan ?? soal.pertanyaan,
      skor_soal: skor_soal ?? soal.skor_soal,
      tipe_soal: tipe_soal ?? soal.tipe_soal,
      penjelasan: penjelasan ?? soal.penjelasan,
      list_jawaban_id: list_jawaban_id ?? soal.list_jawaban_id,
      mutiple: typeof mutiple !== 'undefined' ? (mutiple === 'true' || mutiple === true) : soal.mutiple,
      point_soal: point_soal ?? soal.point_soal,
      jawaban_benar: jawaban_benar ?? soal.jawaban_benar,
      soal_awal: soal_awal ?? soal.soal_awal,
      soal_akhir: soal_akhir ?? soal.soal_akhir,
      file_soal
    });

    res.json({ status: true, message: "Soal updated successfully", data: soal });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// DELETE
exports.deleteSoal = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id);
    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal not found" });
    }

    // Optional: delete associated file
    if (soal.file_soal && fs.existsSync(path.join(__dirname, '..', soal.file_soal))) {
      fs.unlinkSync(path.join(__dirname, '..', soal.file_soal));
    }

    await soal.destroy();
    res.json({ status: true, message: "Soal deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getSoalByTipeUjianId = async (req, res) => {
  try {
    const { tipe_ujian_id } = req.query;

    if (!tipe_ujian_id) {
      return res.status(400).json({ status: false, message: "tipe_ujian_id is required" });
    }

    const soals = await Soal.findAll({
      where: { tipe_ujian_id },
      include: [TipeUjian],
      order: [['index_soal', 'ASC']],
    });

    res.json({ status: true, data: soals });
  } catch (error) {
    console.error("Error fetching Soal by tipe_ujian_id:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
