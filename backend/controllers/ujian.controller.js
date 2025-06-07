const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Ujian, TipeUjian, Soal, UjianBrand, ListJawaban, JawabanUser } = db;

exports.createUjian = async (req, res) => {
  try {
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

    try {
      if (typeof tipe_ujian === "string") tipe_ujian = JSON.parse(tipe_ujian);
      if (typeof soal === "string") soal = JSON.parse(soal);
      if (typeof ujian_brand === "string") ujian_brand = JSON.parse(ujian_brand);
    } catch (err) {
      return res.status(400).json({ status: false, message: "Format JSON tidak valid di salah satu field." });
    }

    let ujian_img = null;
    if (req.files && req.files.ujian_img) {
      const imgFile = req.files.ujian_img;
      const ext = path.extname(imgFile.name).toLowerCase();
      const allowed = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allowed.includes(ext)) {
        return res.status(400).json({ status: false, message: "File harus berupa gambar JPG/PNG/WebP." });
      }

      if (imgFile.size > MAX_FILE_SIZE) {
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

    if (Array.isArray(ujian_brand)) {
      for (const brandId of ujian_brand) {
        await UjianBrand.create({ ujian_id: ujian.id, brand_id: brandId });
      }
    }

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
              const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
              const savePath = path.join(__dirname, "../public/soal", fileName);
              if (!fs.existsSync(path.dirname(savePath))) {
                fs.mkdirSync(path.dirname(savePath), { recursive: true });
              }
              await file.mv(savePath);
              file_soal_path = `/public/soal/${fileName}`;
            }

            const soalBaru = await Soal.create({
              tipe_ujian_id: tipeData.id,
              index_soal: s.id,
              pertanyaan: s.question,
              file_soal: file_soal_path || '',
              skor_soal: s.point || 0,
              tipe_soal: s.questionType,
              penjelasan: s.explanation || '',
              mutiple: s.isMultipleAnswer || false,
              point_soal: s.point || 0,
              jawaban_benar: Array.isArray(s.answer) ? s.answer.join(',') : s.answer,
              soal_awal: s.guideForQuestion?.start || null,
              soal_akhir: s.guideForQuestion?.end || null,
            });

            if (s.questionType === 'multiple-choice' && Array.isArray(s.options)) {
              await Promise.all(s.options.map(async (opt, idx) => {
                await ListJawaban.create({
                  soal_id: soalBaru.id,
                  jawaban: opt.option,
                  isTrue: Array.isArray(s.answer) ? s.answer.includes(opt.id) : s.answer === opt.id,
                  position: String.fromCharCode(65 + idx),
                });
              }));
            }
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

exports.getSoalByUjianId = async (req, res) => {
  try {
    const { id } = req.params;

    const tipeUjianList = await TipeUjian.findAll({
      where: { ujian_id: id },
      include: [{
        model: Soal,
        as: 'Soals',
        include: [{ model: ListJawaban, as: 'ListJawabans' }]
      }],
    });

    if (!tipeUjianList || tipeUjianList.length === 0) {
      return res.status(404).json({ status: false, message: "Soal tidak ditemukan untuk ujian ini." });
    }

    const result = {};
    console.log("📦 Jumlah tipe ujian:", tipeUjianList.length);

    for (const tipe of tipeUjianList) {
      console.log(`🧩 ${tipe.category_ujian} → Jumlah soal:`, tipe.Soals?.length);
      const soalList = tipe.Soals.map((soal) => {
        const options = soal.ListJawabans?.map((jawaban) => ({
          id: jawaban.id,
          option: jawaban.jawaban,
          isTrue: jawaban.isTrue,
          position: jawaban.position,
        })) || [];

        return {
          id: soal.id,
          question: soal.pertanyaan,
          questionType: soal.tipe_soal,
          explanation: soal.penjelasan,
          options: options,
          isMultipleAnswer: soal.mutiple,
          answer: soal.jawaban_benar ? soal.jawaban_benar.split(',').map(j => j.trim()) : [],
          image: soal.file_soal,
          guideForQuestion: {
            start: soal.soal_awal,
            end: soal.soal_akhir,
            guide: ""
          },
          point: soal.point_soal,
          tipeUjian: tipe.category_ujian
        };
      });

      result[tipe.category_ujian] = {
        time: parseInt(tipe.time),
        questions: soalList,
      };
    }

    res.json({ status: true, data: result });
  } catch (error) {
    console.error("❌ Gagal ambil soal ujian:", error);
    res.status(500).json({ status: false, message: error.message });
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

exports.submitJawaban = async (req, res) => {
  try {
    const { soal_id, user_id, input_jawaban } = req.body;

    const soal = await db.Soal.findByPk(soal_id);
    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal tidak ditemukan" });
    }

    const kunci = soal.jawaban_benar?.split(",").map(j => j.trim());
    const tipe = soal.tipe_soal;
    const point = soal.point_soal || 0;

    let isTrue = null;
    let poing = 0;

    if (tipe === "multiple-choice") {
      const jawabanUser = input_jawaban?.split(",").map(j => j.trim()).sort();
      const jawabanBenar = [...kunci].sort();

      if (jawabanUser.join(",") === jawabanBenar.join(",")) {
        isTrue = true;
        poing = point;
      } else {
        isTrue = false;
        poing = 0;
      }
    }

    if (tipe === "order-arrange") {
      const cleanedInput = input_jawaban.replace(/;\s*$/, ""); 
      const jawabanUser = cleanedInput.trim();
      const jawabanBenar = kunci?.join("; ").trim();

      if (jawabanUser === jawabanBenar) {
        isTrue = true;
        poing = point;
      } else {
        isTrue = false;
        poing = 0;
      }
    }

    if (tipe === "essay") {
      isTrue = null;
      poing = 0;
    }

    let jawaban = await db.JawabanUser.findOne({ where: { soal_id, user_id } });

    if (jawaban) {
      await jawaban.update({ input_jawaban, isTrue, poing });
    } else {
      await db.JawabanUser.create({
        soal_id,
        user_id,
        input_jawaban,
        isTrue,
        poing,
      });
    }

    res.status(200).json({ status: true, message: "Jawaban disimpan", isTrue, poing });
  } catch (err) {
    console.error("❌ Gagal simpan jawaban:", err);
    res.status(500).json({ status: false, message: "Gagal simpan jawaban" });
  }
};


exports.getJawabanUserBySoalAndUser = async (req, res) => {
  try {
    const { soal_id, user_id } = req.params;

    const jawaban = await db.JawabanUser.findOne({
      where: { soal_id, user_id },
    });

    if (!jawaban) {
      return res.status(200).json({ status: true, data: null });
    }

    res.status(200).json({
      status: true,
      data: jawaban,
    });
  } catch (error) {
    console.error("❌ Gagal mengambil jawaban user:", error);
    res.status(500).json({ status: false, message: "Gagal mengambil jawaban user" });
  }
};

exports.startUjianPhase = async (req, res) => {
  try {
    const { user_id, ujian_id, exam_phase } = req.body;

    let progress = await db.UjianProgress.findOne({
      where: { user_id, ujian_id, exam_phase }
    });

    if (!progress) {
      progress = await db.UjianProgress.create({
        user_id,
        ujian_id,
        exam_phase,
        started_at: new Date()
      });
    }

    return res.status(200).json({ status: true, data: progress });
  } catch (error) {
    console.error("❌ Error saving ujian progress:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getProgressUjian = async (req, res) => {
  try {
    const { user_id, ujian_id, exam_phase } = req.query;

    const progress = await db.UjianProgress.findOne({
      where: { user_id, ujian_id, exam_phase }
    });

    return res.status(200).json({ status: true, data: progress });
  } catch (error) {
    console.error("❌ Error getting ujian progress:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
