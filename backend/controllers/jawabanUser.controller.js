const db = require('../models');
const { Op } = require('sequelize');
const { JawabanUser, User, Soal, ListJawaban } = db;

//  Create
exports.createJawabanUser = async (req, res) => {
  try {
    const { soal_id, input_jawaban, list_jawaban_id, poing, isTrue } = req.body;
    const user_id = req.userId; // Didapat dari middleware autentikasi

    if (!soal_id || !user_id) {
      return res.status(400).json({ status: false, message: "soal_id and user_id are required" });
    }

    const soal = await Soal.findByPk(soal_id);
    if (!soal) return res.status(404).json({ status: false, message: "Soal not found" });

    const jawaban = await JawabanUser.create({
      soal_id,
      user_id,
      input_jawaban,
      list_jawaban_id,
      poing,
      isTrue
    });

    res.status(201).json({ status: true, message: "JawabanUser created successfully", data: jawaban });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

//  Read All
exports.getAllJawabanUser = async (req, res) => {
  try {
    const jawabanList = await JawabanUser.findAll({
      include: [
        { model: User, as: 'User' },
        { model: Soal, as: 'Soal' },
        { model: ListJawaban, as: 'ListJawaban' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: jawabanList });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

//  Read By ID
exports.getJawabanUserById = async (req, res) => {
  try {
    const jawaban = await JawabanUser.findByPk(req.params.id, {
      include: [
        { model: User, as: 'User' },
        { model: Soal, as: 'Soal' },
        { model: ListJawaban, as: 'ListJawaban' }
      ]
    });

    if (!jawaban) return res.status(404).json({ status: false, message: "JawabanUser not found" });

    res.json({ status: true, data: jawaban });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

//  Update
exports.updateJawabanUser = async (req, res) => {
  try {
    const jawaban = await JawabanUser.findByPk(req.params.id);
    if (!jawaban) return res.status(404).json({ status: false, message: "JawabanUser not found" });

    const { input_jawaban, list_jawaban_id, poing, isTrue } = req.body;

    await jawaban.update({
      input_jawaban: input_jawaban ?? jawaban.input_jawaban,
      list_jawaban_id: list_jawaban_id ?? jawaban.list_jawaban_id,
      poing: poing ?? jawaban.poing,
      isTrue: isTrue ?? jawaban.isTrue
    });

    res.json({ status: true, message: "JawabanUser updated successfully", data: jawaban });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

//  Delete
exports.deleteJawabanUser = async (req, res) => {
  try {
    const jawaban = await JawabanUser.findByPk(req.params.id);
    if (!jawaban) return res.status(404).json({ status: false, message: "JawabanUser not found" });

    await jawaban.destroy();
    res.json({ status: true, message: "JawabanUser deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get all JawabanUser for a specific user and ujian (by user_ujian_progress id), only for essay questions, with scoring summary
exports.getEssayJawabanByUserUjianProgress = async (req, res) => {
  try {
    const progressId = req.params.id;
    // Find the user_ujian_progress record
    const progress = await db.UjianProgress.findByPk(progressId);
    if (!progress) return res.status(404).json({ status: false, message: "User ujian progress not found" });
    const userId = progress.user_id;
    const ujianId = progress.ujian_id;

    // Find all user_ujian_progress records for this user and ujian (all phases)
    const allProgress = await db.UjianProgress.findAll({
      where: { user_id: userId, ujian_id: ujianId }
    });

    // Find all Soal with tipe_soal 'essay' for the given ujian
    const tipeUjians = await db.TipeUjian.findAll({ where: { ujian_id: ujianId } });
    const tipeUjianIds = tipeUjians.map(t => t.id);
    const soalEssay = await db.Soal.findAll({
      where: {
        tipe_ujian_id: tipeUjianIds,
        tipe_soal: 'essay'
      }
    });
    const soalAll = await db.Soal.findAll({
      where: {
        tipe_ujian_id: tipeUjianIds
      }
    });
    const soalIds = soalEssay.map(s => s.id);
    const soalAllIds = soalAll.map(s => s.id);

    // Get all JawabanUser for these soal and for this user (all progress/phase)
    const jawabanList = await db.JawabanUser.findAll({
      where: {
        soal_id: soalIds,
        user_id: userId
      },
      include: [
        { model: db.User, as: 'User' },
        { model: db.Soal, as: 'Soal' }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Fetch ujian to get the level
    const ujian = await db.Ujian.findByPk(ujianId);
    let maxScore = 200;
    if (ujian && ujian.level && Number(ujian.level) > 2) {
      maxScore = 300;
    }
    // Calculate current poing sum for this ujian (for this user, only essay, all phases, same as getExamUserResults)
    let currentScore = 0;
    if (soalAllIds.length > 0) {
      const allJawaban = await db.JawabanUser.findAll({
        where: {
          soal_id: soalAllIds,
          user_id: userId
        }
      });
      currentScore = allJawaban.reduce((sum, j) => sum + (j.poing || 0), 0);
    }

    res.json({
      status: true,
      data: jawabanList,
      user: jawabanList[0]?.User || null,
      maxScore,
      currentScore,
      allProgress // return all user_ujian_progress records for this user/ujian
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// API to examine (update poing for each jawabanUser and mark all user_ujian_progress for this user/ujian as checked)
exports.examineEssayJawaban = async (req, res) => {
  try {
    const progressId = req.params.id;
    // Find the user_ujian_progress record
    const progress = await db.UjianProgress.findByPk(progressId);
    if (!progress) return res.status(404).json({ status: false, message: "User ujian progress not found" });
    const userId = progress.user_id;
    const ujianId = progress.ujian_id;
    const { points } = req.body; // points: [{jawabanUserId, poing}]
    if (!Array.isArray(points)) {
      return res.status(400).json({ status: false, message: "Points array is required" });
    }
    // Update each JawabanUser's poing
    for (const { jawabanUserId, poing } of points) {
      await db.JawabanUser.update(
        { poing },
        { where: { id: jawabanUserId } }
      );
    }
    // Mark all user_ujian_progress for this user and ujian as checked
    await db.UjianProgress.update(
      { is_done: true, is_checking: false },
      { where: { user_id: userId, ujian_id: ujianId } }
    );

    // Check if certificate should be included
    let certificate = null;
    const transaction = await db.Transaction.findOne({
      where: { user_id: userId, ujian_id: ujianId }
    });
    console.log("Transaction for userId:", userId, "ujianId:", ujianId, "is", transaction);
    console.log("Transaction include_certif:", transaction?.include_certif);
    if (transaction && transaction.include_certif) {
      try {
      // Fetch user and ujian info for certificate fields
      const user = await db.User.findByPk(userId);
      const ujian = await db.Ujian.findByPk(ujianId);
      // Get all tipe ujian for this ujian
      const tipeUjians = await db.TipeUjian.findAll({ where: { ujian_id: ujianId } });

      // For each tipeUjian, get all soal for that tipe (not just one)
      const tipeSoalMap = {};
      for (const tipe of tipeUjians) {
        const soalList = await db.Soal.findAll({ where: { tipe_ujian_id: tipe.id } });
        tipeSoalMap[tipe.category_ujian] = soalList.map(s => s.id);
      }

      // Get all jawaban user for these soal and this user (all phases, but only sum once)
      let listening_score = 0;
      let reading_score = 0;
      let writing_score = 0;

      // Flatten all soal ids
      const allSoalIds = Object.values(tipeSoalMap).flat();
      let jawabanList = [];
      if (allSoalIds.length > 0) {
        jawabanList = await db.JawabanUser.findAll({
        where: {
          soal_id: allSoalIds,
          user_id: userId
        },
        include: [{ model: db.Soal, as: 'Soal' }]
        });
      }

      // Sum poing for each category_ujian
      for (const tipe of tipeUjians) {
        const category = tipe.category_ujian;
        const tipeSoalIds = tipeSoalMap[category] || [];
        const phaseJawaban = jawabanList.filter(j => tipeSoalIds.includes(j.soal_id));
        const phaseScore = phaseJawaban.reduce((sum, j) => sum + (j.poing || 0), 0);
        if (category === 'listening') listening_score = phaseScore;
        if (category === 'reading') reading_score = phaseScore;
        if (category === 'writing') writing_score = phaseScore;
      }

      const total_score = listening_score + reading_score + writing_score;
      // Generate exam_no as in certificate.controller.js
      let examPrefix = ujian && ujian.level ? `H${ujian.level}` : '';
      const date = new Date();
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}${mm}${dd}`;
      const randomDigits = Math.floor(100 + Math.random() * 900);
      const exam_no = `${examPrefix}${formattedDate}${randomDigits}`;
      // Find or create certificate
      certificate = await db.Certificate.create({
        user_id: userId,
        exam_level: ujian.level,
        ujian_id: ujianId,
        gender: user.gender || 'Male',
        nationality: user.nationality || '印度尼西亚',
        name: user.name,
        exam_date: formattedDate,
        exam_no,
        listening_score,
        reading_score,
        writing_score,
        total_score,
        status: 'Passed'
      });
      } catch (certErr) {
      console.error('Certificate creation error:', certErr);
      }
    }

    res.json({ status: true, message: "Examination completed and points updated for all phases.", certificate });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// API to get list of exam user results after exam is done or being checked, grouped by user_id and ujian_id
exports.getExamUserResults = async (req, res) => {
  try {
    // Find all user_ujian_progress that are being checked or done
    const progresses = await db.UjianProgress.findAll({
      where: {
        [Op.or]: [
          { is_checking: true },
          { is_done: true }
        ]
      },
      include: [
        { model: db.User, attributes: ['id', 'name'] },
        { model: db.Ujian, attributes: ['id', 'nama_ujian', 'level'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Group by user_id and ujian_id, pick the latest progress for each
    const grouped = {};
    for (const progress of progresses) {
      const key = `${progress.user_id}_${progress.ujian_id}`;
      if (!grouped[key] || new Date(progress.createdAt) > new Date(grouped[key].createdAt)) {
        grouped[key] = progress;
      }
    }

    // For each grouped progress, get nilai sementara (sum all poing for this user & ujian only ONCE, not per phase)
    const results = await Promise.all(Object.values(grouped).map(async (progress) => {
      // Get all tipe ujian for this ujian
      const tipeUjians = await db.TipeUjian.findAll({ where: { ujian_id: progress.ujian_id } });
      const tipeUjianIds = tipeUjians.map(t => t.id);
      // Get all soal for this ujian
      const soal = await db.Soal.findAll({
        where: {
          tipe_ujian_id: tipeUjianIds,
        }
      });
      const soalIds = soal.map(s => s.id);
      // Get all jawaban user for these soal and this user (all phases, but only sum once)
      let current = 0;
      if (soalIds.length > 0) {
        const jawabanList = await db.JawabanUser.findAll({
          where: {
            soal_id: soalIds,
            user_id: progress.user_id
          }
        });
        current = jawabanList.reduce((sum, j) => sum + (j.poing || 0), 0);
      }
      // Tipe ujian (level)
      let tipeUjian = '-';
      let maxScore = 200;
      if (progress.Ujian && progress.Ujian.level) {
        tipeUjian = `HSK ${progress.Ujian.level}`;
        if (Number(progress.Ujian.level) > 2) maxScore = 300;
      }
      const nilaiSementara = `${current}/${maxScore}`;
      // Status
      let status = 'is_checking';
      if (progress.is_done) status = 'is_done';
      return {
        id: progress.id,
        nama_ujian: progress.Ujian?.nama_ujian || '-',
        nama_peserta: progress.User?.name || '-',
        tipe_ujian: tipeUjian,
        nilai_sementara: nilaiSementara,
        status,
        user_id: progress.user_id
      };
    }));

    res.json({ status: true, data: results });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getReviewJawabanByUserUjian = async (req, res) => {
  try {
    const rawId = req.params.id;
    const userId = req.userId;

    let progress = await db.UjianProgress.findByPk(rawId);

    // Jika bukan progressId, berarti rawId adalah ujianId
    if (!progress) {
      progress = await db.UjianProgress.findOne({
        where: {
          user_id: userId,
          ujian_id: rawId
        },
        order: [['createdAt', 'DESC']] // ambil progress terakhir
      });
    }

    if (!progress) {
      return res.status(404).json({ status: false, message: "Progress ujian tidak ditemukan" });
    }

    const ujianId = progress.ujian_id;

    // Ambil semua tipe ujian untuk ujian ini
    const tipeUjians = await db.TipeUjian.findAll({ where: { ujian_id: ujianId } });
    const tipeUjianIds = tipeUjians.map(t => t.id);

    const soalList = await db.Soal.findAll({
      where: {
        tipe_ujian_id: tipeUjianIds,
        // tipe_soal: 'multiple-choice'
      },
      include: [{
        model: db.ListJawaban,
        as: 'ListJawabans'
      }]
    });

    const soalIds = soalList.map(s => s.id);

    const jawabanList = await db.JawabanUser.findAll({
      where: {
        soal_id: soalIds,
        user_id: progress.user_id
      },
      attributes: ['soal_id', 'input_jawaban', 'poing', 'isTrue']
    });

    const response = soalList.map(soal => {
    const jawabanUser = jawabanList.find(j => j.soal_id === soal.id);

    let jawaban_benar;
    if (soal.tipe_soal === 'multiple-choice') {
      jawaban_benar = soal.ListJawabans.filter(j => j.isTrue).map(j => j.position?.trim());
   } else if (soal.tipe_soal === 'order-arrange') {
      const raw = String(soal.jawaban_benar || '').trim();
      jawaban_benar = raw
        .split(';')
        .map(s => s.trim())
        .filter(Boolean);
    }


    return {
      soal_id: soal.id,
      pertanyaan: soal.pertanyaan,
      tipe_soal: soal.tipe_soal,
      jawaban_benar: 
        soal.tipe_soal === 'multiple-choice'
          ? soal.ListJawabans.filter(j => j.isTrue).map(j => j.position?.trim())
          : soal.tipe_soal === 'order-arrange'
            ? (soal.jawaban_benar || '').split(';').map(s => s.trim())
            : undefined,
      list_jawaban: soal.ListJawabans,
      jawaban_user: jawabanUser
        ? {
            input_jawaban: jawabanUser.input_jawaban,
            poing: jawabanUser.poing,
            isTrue: jawabanUser.isTrue
          }
        : null
    };
  });

    return res.json({ status: true, data: response });

  } catch (error) {
    console.error("Error in getReviewJawabanByUserUjian:", error);
    return res.status(500).json({ status: false, message: "Terjadi kesalahan server", error: error.message });
  }
};
