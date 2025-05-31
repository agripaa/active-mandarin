const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Soal, TipeUjian, ListJawaban } = db;

//  Create
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
    if (!tipeUjian) return res.status(404).json({ status: false, message: "TipeUjian not found" });

    let file_soal = null;

    if (req.files && req.files.file_soal) {
      const file = req.files.file_soal;
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = ['.jpg', '.jpeg', '.png', '.pdf', '.mp4', '.mp3'];

      if (!allowedExt.includes(ext)) {
        return res.status(400).json({ status: false, message: "Invalid file type for soal" });
      }

      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = path.join(__dirname, '../public/soal', fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

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
      mutiple,
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

// Read All
exports.getAllSoal = async (req, res) => {
  try {
    const soals = await Soal.findAll({
      include: [
        { model: TipeUjian, as: 'TipeUjian' },
        { model: ListJawaban, as: 'ListJawaban' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: soals });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Read By ID
exports.getSoalById = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id, {
      include: [
        { model: TipeUjian, as: 'TipeUjian' },
        { model: ListJawaban, as: 'ListJawaban' }
      ]
    });

    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal not found" });
    }

    res.json({ status: true, data: soal });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update
exports.updateSoal = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id);
    if (!soal) return res.status(404).json({ status: false, message: "Soal not found" });

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
      const ext = path.extname(file.name).toLowerCase();
      const allowedExt = ['.jpg', '.jpeg', '.png', '.pdf', '.mp4', '.mp3'];

      if (!allowedExt.includes(ext)) {
        return res.status(400).json({ status: false, message: "Invalid file type for soal" });
      }

      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = path.join(__dirname, '../public/soal', fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

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
      mutiple: mutiple ?? soal.mutiple,
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

// Delete
exports.deleteSoal = async (req, res) => {
  try {
    const soal = await Soal.findByPk(req.params.id);
    if (!soal) return res.status(404).json({ status: false, message: "Soal not found" });

    await soal.destroy();
    res.json({ status: true, message: "Soal deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
