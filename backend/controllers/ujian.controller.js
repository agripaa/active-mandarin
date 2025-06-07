const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Ujian, TipeUjian, Soal, UjianBrand } = require("../models");

exports.createUjian = async (req, res) => {
  try {
    // Ambil dan parse data
    let {
      nama_ujian,
      desc,
      level,
      harga_normal,
      harga_certif,
      harga_diskon,
      commission,
      total_skor,
      tipe_ujian,
      soal,
      ujian_brand,
    } = req.body;

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    // Parse jika masih berupa string
    try {
      if (typeof tipe_ujian === "string") tipe_ujian = JSON.parse(tipe_ujian);
      if (typeof soal === "string") soal = JSON.parse(soal);
      if (typeof ujian_brand === "string") ujian_brand = JSON.parse(ujian_brand);
    } catch (err) {
      return res.status(400).json({ status: false, message: "Format JSON tidak valid di salah satu field." });
    }

    // Upload gambar
    let ujian_img = null;
    if (req.files && req.files.ujian_img) {
      const imgFile = req.files.ujian_img;
      const ext = path.extname(imgFile.name).toLowerCase();
      const allowed = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allowed.includes(ext)) {
        return res.status(400).json({ status: false, message: "File harus berupa gambar JPG/PNG/WebP." });
      }

      if (req.files.ujian_img > MAX_FILE_SIZE) {
        return res.status(400).json({ status: false, message: "Ujian Image file size must be less than 5MB!" });
      }

      const fileName = `${Date.now()}_${imgFile.name.replace(/\s/g, "_")}`;
      const savePath = path.join(__dirname, "../public/ujian", fileName);
      if (!fs.existsSync(path.dirname(savePath))) {
        fs.mkdirSync(path.dirname(savePath), { recursive: true });
      }

      await imgFile.mv(savePath);
      ujian_img = `/public/ujian/${fileName}`;
    }

    const fieldLabels = {
      nama_ujian: "Nama ujian",
      desc: "Deskripsi",
      harga_normal: "Harga normal",
      harga_certif: "Harga + certif",
      level: "Level",
      ujian_img: "Gambar ujian"
    };

    for (const [key, value] of Object.entries(fieldLabels)) {
      const actualValue = key === "ujian_img" ? req.files?.ujian_img : req.body[key];
      if (!actualValue || (typeof actualValue === "string" && actualValue.trim() === "")) {
        return res.status(400).json({
          status: false,
          message: `${value} harus diisi.`
        });
      }
    }
    // Simpan ujian
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
    });

    // Simpan ujian_brand
    if (Array.isArray(ujian_brand)) {
      for (const brandId of ujian_brand) {
        try {
          await UjianBrand.create({ ujian_id: ujian.id, brand_id: brandId });
        } catch (err) {
          console.error(`❌ Gagal simpan UjianBrand brand_id ${brandId}`, err);
        }
      }
    }

    // Simpan tipe ujian & soal
    if (tipe_ujian && typeof tipe_ujian === "object") {
      for (const tipeKey of ["listening", "reading", "writing"]) {
        const tipe = tipe_ujian[tipeKey];
        if (!tipe) continue;

        const tipeData = await TipeUjian.create({
          category_ujian: tipeKey,
          time: tipe.time,
          total_soal: tipe.questionCount,
          ujian_id: ujian.id,
          total_skor_tipe: 0,
        });

        if (soal && soal[tipeKey]) {
          for (let i = 0; i < soal[tipeKey].length; i++) {
            const s = soal[tipeKey][i];

            let file_soal_path = '';
            if (s.image && req.files?.[s.image]) {
              const file = req.files[s.image];
              const MAX_FILE_SIZE = 5 * 1024 * 1024;

              if (file.size > MAX_FILE_SIZE) {
                return res.status(400).json({ status: false, message: `Ukuran file ${s.image} melebihi 5MB.` });
              }

              const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
              const savePath = path.join(__dirname, "../public/soal", fileName);
              if (!fs.existsSync(path.dirname(savePath))) {
                fs.mkdirSync(path.dirname(savePath), { recursive: true });
              }

              await file.mv(savePath);
              file_soal_path = `/public/soal/${fileName}`;
            }

            await Soal.create({
              tipe_ujian_id: tipeData.id,
              index_soal: s.id,
              pertanyaan: s.question,
              file_soal: file_soal_path || '',
              skor_soal: s.point || 0,
              tipe_soal: s.questionType,
              penjelasan: s.explanation || '',
              list_jawaban_id: null,
              mutiple: s.isMultipleAnswer || false,
              point_soal: s.point || 0,
              jawaban_benar: Array.isArray(s.answer) ? s.answer.join(',') : s.answer,
              soal_awal: s.guideForQuestion?.start || null,
              soal_akhir: s.guideForQuestion?.end || null,
            });
          }
        }
      }
    }

    return res.status(201).json({
      status: true,
      message: "Ujian berhasil dibuat",
      result: { id: ujian.id },
    });

  } catch (error) {
    console.error("❌ Error create ujian:", error);
    return res.status(500).json({ status: false, message: "Terjadi kesalahan server: " + error.message });
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
