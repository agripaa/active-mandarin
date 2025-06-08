const db = require('../models');
const { TipeUjian, Ujian } = db;

exports.createTipeUjian = async (req, res) => {
  try {
    const { ujian_id, category_ujian, time, total_soal, total_skor_tipe = 0 } = req.body;

    if (!ujian_id || !category_ujian) {
      return res.status(400).json({
        status: false,
        message: "Field 'ujian_id' dan 'category_ujian' wajib diisi.",
      });
    }

    // 🔒 Cek apakah sudah ada tipe ujian dengan kategori ini untuk ujian yang sama
    const existing = await TipeUjian.findOne({
      where: { ujian_id, category_ujian },
    });

    if (existing) {
      return res.status(400).json({
        status: false,
        message: `Tipe ujian '${category_ujian}' sudah ada untuk ujian ini.`,
        data: existing, // optional: kembalikan yang sudah ada
      });
    }

    // ✅ Jika tidak ada, buat tipe ujian baru
    const newTipe = await TipeUjian.create({
      ujian_id,
      category_ujian,
      time,
      total_soal,
      total_skor_tipe,
    });

    return res.status(201).json({
      status: true,
      message: "Tipe ujian berhasil dibuat.",
      data: newTipe,
    });

  } catch (error) {
    console.error("Error saat membuat tipe ujian:", error);
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat membuat tipe ujian.",
      error: error.message,
    });
  }
};

exports.getAllTipeUjian = async (req, res) => {
  try {
    const tipeUjians = await TipeUjian.findAll({
      include: [{ model: Ujian, as: 'Ujian' }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: tipeUjians });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getTipeUjianById = async (req, res) => {
  try {
    const tipeUjian = await TipeUjian.findByPk(req.params.id, {
      include: [{ model: Ujian, as: 'Ujian' }]
    });

    if (!tipeUjian) {
      return res.status(404).json({ status: false, message: "TipeUjian not found" });
    }

    res.json({ status: true, data: tipeUjian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.updateTipeUjian = async (req, res) => {
  try {
    const { category_ujian, time, total_soal, ujian_id, total_skor_tipe } = req.body;

    const tipeUjian = await TipeUjian.findByPk(req.params.id);
    if (!tipeUjian) {
      return res.status(404).json({ status: false, message: "TipeUjian not found" });
    }

    if (ujian_id) {
      const ujian = await Ujian.findByPk(ujian_id);
      if (!ujian) return res.status(400).json({ status: false, message: "Invalid ujian_id" });
    }

    await tipeUjian.update({
      category_ujian: category_ujian ?? tipeUjian.category_ujian,
      time: time ?? tipeUjian.time,
      total_soal: total_soal ?? tipeUjian.total_soal,
      ujian_id: ujian_id ?? tipeUjian.ujian_id,
      total_skor_tipe: total_skor_tipe ?? tipeUjian.total_skor_tipe
    });

    res.json({ status: true, message: "TipeUjian updated successfully", data: tipeUjian });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.deleteTipeUjian = async (req, res) => {
  try {
    const tipeUjian = await TipeUjian.findByPk(req.params.id);
    if (!tipeUjian) {
      return res.status(404).json({ status: false, message: "TipeUjian not found" });
    }

    await tipeUjian.destroy();
    res.json({ status: true, message: "TipeUjian deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getTipeUjianByUjianId = async (req, res) => {
  try {
    const { ujian_id } = req.query;

    if (!ujian_id) {
      return res.status(400).json({ status: false, message: "ujian_id is required" });
    }

    const tipeUjian = await db.TipeUjian.findAll({
      where: { ujian_id },
    });

    res.json({ status: true, data: tipeUjian }); // ✅ gunakan nama variabel yang benar
  } catch (error) {
    console.error("Error fetching tipeUjian by ujian_id:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
