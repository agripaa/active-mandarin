const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Ujian, TipeUjian, Soal, UjianBrand, ListJawaban, JawabanUser, UjianProgress, User, Transaction, Certificate, Brand } = db;

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
          total_skor_tipe: 100,
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
              guide: s.guideForQuestion?.guide || null,
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
      include: [{
        model: ListJawaban,
        as: 'ListJawabans',
      }],
    }],
    order: [
      ['id', 'ASC'], // Urutan tipe ujian
      [{ model: Soal, as: 'Soals' }, 'id', 'ASC'], // Urutan soal
      [{ model: Soal, as: 'Soals' }, { model: ListJawaban, as: 'ListJawabans' }, 'position', 'ASC'] // Urutan jawaban
    ]
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
            guide: soal.guide
          },
          point: soal.point_soal,
          tipeUjian: tipe.category_ujian
        };
      });

      result[tipe.category_ujian] = {
        id: tipe.id,
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

    // Proses upload gambar jika ada
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

    // Update data utama ujian
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

    // Update ujian_brand
    let ujian_brand = req.body.ujian_brand;
    try {
      if (typeof ujian_brand === "string") ujian_brand = JSON.parse(ujian_brand);
    } catch (err) {
      return res.status(400).json({ status: false, message: "Format ujian_brand tidak valid" });
    }

    if (Array.isArray(ujian_brand)) {
      // Hapus semua relasi lama
      await UjianBrand.destroy({ where: { ujian_id: ujian.id } });

      let inserted = 0;
      for (const brandId of ujian_brand) {
        if (!brandId || isNaN(brandId)) continue;

        const brand = await Brand.findByPk(brandId);
        if (!brand) {
          console.warn(`⚠️ brand_id ${brandId} tidak ditemukan, dilewati`);
          continue;
        }

        await UjianBrand.create({ ujian_id: ujian.id, brand_id: brandId });
        inserted++;
      }

      if (inserted === 0) {
        return res.status(400).json({ status: false, message: "Minimal satu program (brand) harus valid." });
      }
    }

    // 1. Parsing tipe_ujian dan soal
  let tipe_ujian = req.body.tipe_ujian;
  let soal = req.body.soal;

  try {
    if (typeof tipe_ujian === 'string') tipe_ujian = JSON.parse(tipe_ujian);
    if (typeof soal === 'string') soal = JSON.parse(soal);
  } catch (err) {
    return res.status(400).json({ status: false, message: "Format tipe_ujian atau soal tidak valid" });
  }

  // 2. Loop tiap tipe ujian
  for (const tipeKey of ['listening', 'reading', 'writing']) {
    const tipe = tipe_ujian[tipeKey];
    if (!tipe) continue;

    let tipeUjianInstance;

    // Jika punya id, update
    if (tipe.id) {
      tipeUjianInstance = await TipeUjian.findByPk(tipe.id);
      if (tipeUjianInstance) {
        await tipeUjianInstance.update({ time: tipe.time });
      }
    }

    // Jika tidak ada id, buat baru
    if (!tipeUjianInstance) {
      tipeUjianInstance = await TipeUjian.create({
        ujian_id: ujian.id,
        category_ujian: tipeKey,
        time: tipe.time
      });
    }

    const tipeUjianId = tipeUjianInstance.id;

    // 3. Update atau Tambah Soal
    const soalList = soal[tipeKey];
    if (!Array.isArray(soalList)) continue;

    for (const s of soalList) {
      const soalData = {
        tipe_ujian_id: tipeUjianId,
        pertanyaan: s.question,
        tipe_soal: s.questionType,
        penjelasan: s.explanation || '',
        soal_awal: s.guideForQuestion?.start || null,
        soal_akhir: s.guideForQuestion?.end || null,
        guide: s.guideForQuestion?.guide || null,
        jawaban_benar: Array.isArray(s.answer) ? s.answer.join(',') : '',
        mutiple: s.isMultipleAnswer || false,
        point_soal: s.point || 0,
        file_soal: s.image || '',
      };

      let soalInstance;

      if (s.id) {
        soalInstance = await Soal.findByPk(s.id);
        if (soalInstance) {
          await soalInstance.update(soalData);
        }
      }

      if (!soalInstance) {
        soalInstance = await Soal.create(soalData);
      }

      const soalId = soalInstance.id;

      // 4. Update ListJawaban jika tipe pilihan ganda
      if (s.questionType === 'multiple-choice' && Array.isArray(s.options)) {
        // Bersihkan dulu jawaban lama
        await ListJawaban.destroy({ where: { soal_id: soalId } });

        for (const opt of s.options) {
          await ListJawaban.create({
            soal_id: soalId,
            jawaban: opt.option,
            isTrue: Array.isArray(s.answer) ? s.answer.includes(opt.id) : false,
            position: opt.position || null,
          });
        }
      }
    }
  }


    res.json({ status: true, message: "Ujian updated successfully", data: ujian });

  } catch (error) {
    console.error("❌ Gagal update ujian:", error);
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
    let { soal_id, user_id, input_jawaban } = req.body;
    console.log({soal_id, user_id, input_jawaban})

    const soal = await Soal.findByPk(soal_id);
    if (!soal) {
      return res.status(404).json({ status: false, message: "Soal tidak ditemukan" });
    }

    const kunci = soal.jawaban_benar?.split(/[,;]/).map(j => j.trim()).filter(Boolean); // fleksibel koma/;
    const tipe = soal.tipe_soal;
    const point = soal.point_soal || 0;

    let isTrue = null;
    let poing = 0;

    if (tipe === "multiple-choice") {
      const jawabanUser = [...new Set(input_jawaban?.split(/[,;]/).map(j => j.trim()))].sort();
      const jawabanBenar = [...kunci].sort();

      console.log({ jawabanBenarMutiple: jawabanBenar, jawabanUser });

      const benarSet = new Set(jawabanBenar);
      const userSet = new Set(jawabanUser);

      const benarDipilih = jawabanUser.filter(j => benarSet.has(j)).length;
      const salahDipilih = jawabanUser.filter(j => !benarSet.has(j)).length;

      const totalBenar = jawabanBenar.length;

      if (benarDipilih > 0) {
        const nilaiParsial = (benarDipilih / totalBenar) * point;
        poing = Math.round(nilaiParsial);
        isTrue = poing === point; 
      } else {
        poing = 0;
        isTrue = false;
      }

      input_jawaban = jawabanUser.join(";");
    }

    if (tipe === "order-arrange") {
      const cleanedInput = input_jawaban
        .split(";")
        .map(i => i.trim())
        .filter(Boolean)
        .join(";");

      const jawabanBenar = kunci.map(k => k.trim()).join(";");

      if (cleanedInput === jawabanBenar) {
        isTrue = true;
        poing = point;
      } else {
        isTrue = false;
        poing = 0;
      }

      input_jawaban = cleanedInput;
    }

    if (tipe === "essay") {
      isTrue = null;
      poing = 0;
    }

    let jawaban = await JawabanUser.findOne({ where: { soal_id, user_id } });

    if (jawaban) {
      await jawaban.update({ input_jawaban, isTrue, poing });
    } else {
      await JawabanUser.create({
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

    const jawaban = await JawabanUser.findOne({
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

    let progress = await UjianProgress.findOne({
      where: { user_id, ujian_id, exam_phase }
    });

    if (!progress) {
      progress = await UjianProgress.create({
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

    const progress = await UjianProgress.findOne({
      where: { user_id, ujian_id, exam_phase }
    });

    return res.status(200).json({ status: true, data: progress });
  } catch (error) {
    console.error("❌ Error getting ujian progress:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.finishUjianPhase = async (req, res) => {
  try {
    const { user_id, ujian_id, exam_phase } = req.body;
    console.log(`➡️  [START] Finish Ujian Phase: user_id=${user_id}, ujian_id=${ujian_id}, phase=${exam_phase}`);

    // 1. Ambil tipe ujian + soal
    const tipe = await TipeUjian.findOne({
      where: { ujian_id, category_ujian: exam_phase },
      include: [{ model: Soal, as: 'Soals' }]
    });

    if (!tipe) {
      console.warn(`❌ Fase "${exam_phase}" tidak ditemukan`);
      return res.status(404).json({ status: false, message: "Fase ujian tidak ditemukan." });
    }

    const soalList = tipe.Soals || [];
    const containsEssay = soalList.some(s => s.tipe_soal === "essay");
    const is_done = !containsEssay;
    const is_checking = containsEssay;

    console.log(`📘 Jumlah soal: ${soalList.length}, Mengandung essay: ${containsEssay}`);

    // 2. Update progress
    const progress = await UjianProgress.findOne({ where: { user_id, ujian_id, exam_phase } });
    if (!progress) {
      console.warn(`⚠️ Progress belum dimulai untuk ${exam_phase}`);
      return res.status(404).json({ status: false, message: "Progress belum dimulai." });
    }

    await progress.update({ is_done, is_checking });
    console.log(`✅ Progress updated: is_done=${is_done}, is_checking=${is_checking}`);

    // 3. Jika tidak ada essay, langsung hitung nilai
    if (is_done) {
      console.log(`📊 Menghitung nilai parsial...`);
      await generateNilaiFinal(user_id, ujian_id);
    }

    // 4. Cari semua tipe_ujian yang punya soal
    const tipeDenganSoal = await TipeUjian.findAll({
      where: { ujian_id },
      include: [{
        model: Soal,
        as: 'Soals',
        required: true // <-- hanya ambil yang punya soal
      }]
    });

    const faseAktif = tipeDenganSoal.map(t => t.category_ujian);
    console.log("📚 Fase aktif (yang punya soal):", faseAktif);

    const allProgress = await Promise.all(
      faseAktif.map(phase =>
        UjianProgress.findOne({ where: { user_id, ujian_id, exam_phase: phase } })
      )
    );

    allProgress.forEach((p, idx) => {
      const phase = faseAktif[idx];
      console.log(`  - ${phase}: is_done=${p?.is_done}, is_checking=${p?.is_checking}`);
    });

    const semuaSelesai = allProgress.every(p => p?.is_done === true && p?.is_checking === false);
    console.log(`🔍 Semua fase selesai: ${semuaSelesai}`);

    // 5. Cek apakah masih ada soal essay
    const adaEssay = await Soal.findOne({
      where: { tipe_soal: 'essay' },
      include: [{
        model: TipeUjian,
        as: 'TipeUjian',
        where: { ujian_id }
      }]
    });

    console.log(`📝 Ada soal essay di ujian: ${!!adaEssay}`);

    // 6. Generate nilai akhir + sertifikat jika semua selesai & tidak ada essay
    if (semuaSelesai && !adaEssay) {
      console.log("🏁 Semua fase selesai tanpa essay. Buat nilai akhir dan sertifikat...");
      const finalScore = await generateNilaiFinal(user_id, ujian_id);
      await generateSertifikat(user_id, ujian_id, finalScore);
    } else {
      console.log(`⛔ Sertifikat tidak dibuat: semuaSelesai=${semuaSelesai}, adaEssay=${!!adaEssay}`);
    }

    console.log(`✅ [SELESAI] Finish phase "${exam_phase}" untuk user_id=${user_id}`);
    return res.status(200).json({
      status: true,
      message: "Status fase ujian diperbarui.",
      data: progress
    });

  } catch (err) {
    console.error("❌ Gagal menyelesaikan fase ujian:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.getHasilUjian = async (req, res) => {
  try {
    const jawabanList = await JawabanUser.findAll({
      include: [
        {
          model: Soal,
          include: [
            {
              model: TipeUjian,
              as: 'TipeUjian',
              include: [{ model: Ujian }]
            },
            {
              model: ListJawaban,
              as: 'ListJawabans'
            }
          ]
        },
        {
          model: User
        }
      ]
    });

    const grouped = {};

    for (const jawaban of jawabanList) {
      const soal = jawaban.Soal;
      const tipe = soal?.TipeUjian;
      const ujian = tipe?.Ujian;
      const user = jawaban.User;

      if (!soal || !tipe || !ujian || !user) continue;

      const key = `${ujian.id}-${user.id}-${tipe.category_ujian}`;

      if (!grouped[key]) {
        grouped[key] = {
          nama_ujian: ujian.nama_ujian,
          tipe_ujian: tipe.category_ujian,
          nama_peserta: user.name,
          user_id: user.id,
          ujian_id: ujian.id,
          total_poin: 0,
          total_max: 0,
          semua_essay_ternilai: true
        };
      }

      let poing = 0;

      // 🔄 Jika soal multiple-choice dan belum dinilai manual (isTrue null), hitung otomatis
      if (
        soal.tipe_soal === "multiple-choice" &&
        jawaban.isTrue === null &&
        jawaban.list_jawaban_id &&
        soal.ListJawabans
      ) {
        const jawabanUser = soal.ListJawabans.find(
          j => j.id === jawaban.list_jawaban_id
        );
        if (jawabanUser?.isTrue) {
          poing = soal.point_soal || 0;
        } else {
          poing = 0;
        }
      } else {
        // Gunakan nilai dari DB
        poing = jawaban.poing || 0;
      }

      grouped[key].total_poin += poing;
      grouped[key].total_max += soal.point_soal || 0;

      // ✅ Semua soal dengan isTrue null dianggap belum dinilai
      if (jawaban.isTrue === null) {
        grouped[key].semua_essay_ternilai = false;
      }
    }

    const belum_dinilai = [];
    const sudah_dinilai = [];

    Object.values(grouped).forEach(item => {
      const nilaiStr = `${item.total_poin}/${item.total_max}`;
      const base = {
        nama_ujian: item.nama_ujian,
        nama_peserta: item.nama_peserta,
        tipe_ujian: item.tipe_ujian,
        user_id: item.user_id,
        ujian_id: item.ujian_id
      };

      if (item.semua_essay_ternilai) {
        sudah_dinilai.push({ ...base, nilai_final: nilaiStr });
      } else {
        belum_dinilai.push({ ...base, nilai_sementara: nilaiStr });
      }
    });

    res.json({
      status: true,
      data: {
        belum_dinilai,
        sudah_dinilai
      }
    });

  } catch (error) {
    console.error("❌ Gagal ambil data penilaian:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getExamResultsUser = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        user_id: req.userId,
        ujian_id: { [Op.ne]: null },
        isDelete: false,
        status_transaction: 'success'
      },
      include: [
        {
          model: Ujian,
          as: 'Ujian',
          include: [
            {
              model: UjianProgress,
              as: 'UjianProgresses',
              where: { user_id: req.userId },
              required: false
            }
          ]
        },
        {
          model: User,
          as: 'User'
        }
      ],
      order: [['transaction_date', 'DESC']]
    });

    const result = [];

    for (const tx of transactions) {
      const progresses = tx.Ujian?.UjianProgresses || [];
      const allDone = progresses.length > 0 && progresses.every(p => p.is_done && !p.is_checking);
      const anyChecking = progresses.some(p => p.is_checking);

      let status = "Belum Dinilai";
      if (allDone) status = "Selesai";
      else if (anyChecking) status = "Diperiksa Mentor";

      let nilaiFinal = "-";
      let examNo = null;

      if (status === "Selesai") {
        const certificate = await Certificate.findOne({
          where: {
            user_id: req.userId,
            ujian_id: tx.ujian_id
          }
        });

        if (certificate) {
          const phaseCount = progresses.length || 1;
          const maxScore = phaseCount * 100;
          nilaiFinal = `${certificate.total_score}/${maxScore}`;
          examNo = certificate.exam_no || null;
        }
      }

      result.push({
        id: tx.id,
        ujian_id: tx.ujian_id,
        nama_ujian: tx.Ujian?.nama_ujian || '-',
        nama_peserta: tx.User?.name || '-',
        tipe: tx.Ujian?.level || '-',
        nilai: nilaiFinal,
        exam_no: examNo,
        status
      });
    }

    return res.json({ status: true, data: result });
  } catch (error) {
    console.error("❌ Error getExamResultsUser:", error);
    return res.status(500).json({ status: false, error: error.message });
  }
};


exports.checkUjianAccess = async (req, res) => {
  try {
    const ujianId = parseInt(req.params.ujianId);
    const userId = req.userId;

    const transaction = await Transaction.findOne({
      where: {
        user_id: userId,
        ujian_id: ujianId,
        status_transaction: "success",
        isDelete: false
      }
    });

    if (!transaction) {
      return res.status(403).json({ status: false, message: "Anda belum melakukan transaksi untuk ujian ini" });
    }

    res.json({ status: true, message: "Akses diizinkan" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const generateNilaiFinal = async (user_id, ujian_id) => {
  const jawabanList = await JawabanUser.findAll({
    where: { user_id },
    include: [{
      model: Soal,
      as: 'Soal',
      include: [{
        model: TipeUjian,
        as: 'TipeUjian',
        where: { ujian_id }
      }]
    }]
  });

  const skorPerFase = {
    listening: { point: 0, max: 0 },
    reading: { point: 0, max: 0 },
    writing: { point: 0, max: 0 }
  };

  for (const jawaban of jawabanList) {
    const soal = jawaban.Soal;
    if (!soal) {
      console.warn("❌ Soal null untuk jawaban id:", jawaban.id);
      continue;
    }

    if (!soal.TipeUjian) {
      console.warn(`❌ TipeUjian null untuk soal_id=${soal.id}`);
      continue;
    }
    const tipe = soal.TipeUjian.category_ujian;
    const point = jawaban.poing || 0;
    const maxPoint = soal.point_soal || 0;

    if (skorPerFase[tipe]) {
      skorPerFase[tipe].point += point;
      skorPerFase[tipe].max += maxPoint;
    }
  }

  const phases = ['listening', 'reading', 'writing'];
  let totalPhaseScore = 0;
  let countedPhases = 0;

  for (const phase of phases) {
    const data = skorPerFase[phase];
    if (data.max > 0) {
      const score = Math.round((data.point / data.max) * 100);
      totalPhaseScore += score;
      countedPhases++;
    }
  }

  const finalScore = countedPhases > 0
    ? Math.round(totalPhaseScore / countedPhases)
    : 0;

  await Transaction.update(
    {
      total_skor: finalScore,
      is_done: true,
      is_checking: false
    },
    {
      where: { user_id, ujian_id }
    }
  );

  return finalScore;
};

const generateSertifikat = async (user_id, ujian_id, finalScore) => {
  const transaksi = await Transaction.findOne({
    where: {
      user_id,
      ujian_id,
      include_certif: true,
      status_transaction: 'success',
      isDelete: false,
    }
  });

  if (!transaksi) {
    console.log("❌ Sertifikat tidak dibuat karena transaksi tidak memenuhi syarat.");
    return;
  }

  const ujian = await Ujian.findByPk(ujian_id);
  const user = await User.findByPk(user_id);
  const date = new Date();
  const exam_level = parseInt(ujian.level) || 1;
  const exam_no = `H${exam_level}${date.toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(100 + Math.random() * 900)}`;

  let passing_score;

  if([1, 2].includes(parseInt(ujian.level))) {
    passing_score = 120;
  } else if([3, 4, 5, 6].includes(parseInt(ujian.level))) {
    passing_score =  180;
  }

  const jawabanList = await JawabanUser.findAll({
    where: { user_id },
    include: [{
      model: Soal,
      as: 'Soal',
      required: true,
      include: [{
        model: TipeUjian,
        as: 'TipeUjian',
        where: { ujian_id },
        required: true
      }]
    }]
  });

  const skorPerFase = {
    listening: { point: 0, max: 0 },
    reading: { point: 0, max: 0 },
    writing: { point: 0, max: 0 }
  };

  for (const jawaban of jawabanList) {
    const soal = jawaban.Soal;
    if (!soal) {
      console.warn("❌ Soal null untuk jawaban id:", jawaban.id);
      continue;
    }

    if (!soal.TipeUjian) {
      console.warn(`❌ TipeUjian null untuk soal_id=${soal.id}`);
      continue;
    }
    const tipe = soal.TipeUjian.category_ujian;
    const point = jawaban.poing || 0;
    const maxPoint = soal.point_soal || 0;

    if (skorPerFase[tipe]) {
      skorPerFase[tipe].point += point;
      skorPerFase[tipe].max += maxPoint;
    }
  }

  const listening_score = skorPerFase.listening.max > 0
    ? Math.round((skorPerFase.listening.point / skorPerFase.listening.max) * 100)
    : 0;

  const reading_score = skorPerFase.reading.max > 0
    ? Math.round((skorPerFase.reading.point / skorPerFase.reading.max) * 100)
    : 0;

  const writing_score = skorPerFase.writing.max > 0
    ? Math.round((skorPerFase.writing.point / skorPerFase.writing.max) * 100)
    : 0;

  await Certificate.create({
    user_id,
    exam_level,
    ujian_id ,
    gender: user.gender || 'Male',
    nationality: '印度尼西亚',
    name: user.name,
    exam_date: date,
    exam_no,
    listening_score,
    reading_score,
    passing_score,
    writing_score,
    total_score: finalScore,
    status: finalScore >= 60 ? 'Passed' : 'Not Passed',
  });

  console.log(`✅ Sertifikat berhasil dibuat:
  - User: ${user_id}
  - Ujian: ${ujian_id}
  - Nilai: L=${listening_score}, R=${reading_score}, W=${writing_score}, Total=${finalScore}`);
};

exports.getUjianReviewResult = async (req, res) => {
  try {
    const { ujian_id } = req.params;
    const user_id = req.userId;

    const certificate = await db.Certificate.findOne({
      where: { ujian_id, user_id }
    });

    if (!certificate) {
      return res.status(404).json({ status: false, message: "Sertifikat tidak ditemukan" });
    }

    // Cek fase mana yang aktif berdasarkan keberadaan soal
    const tipeUjianList = await db.TipeUjian.findAll({
      where: { ujian_id },
      include: [{
        model: db.Soal,
        as: 'Soals',
        required: true
      }]
    });

    const availablePhases = tipeUjianList.map(t => t.category_ujian); // yang ada soal

    const phases = ['listening', 'reading', 'writing'];
    const result = {
      total: {
        point: 0,
        max: 0,
        score: 0
      },
      per_phase: {}
    };

    for (const phase of phases) {
      const score = certificate[`${phase}_score`];
      const isAvailable = availablePhases.includes(phase);

      if (isAvailable && score !== null && score !== undefined) {
        result.per_phase[phase] = {
          score,
          point: score,
          max: 100,
          available: true
        };

        result.total.point += score;
        result.total.max += 100;
      } else {
        result.per_phase[phase] = {
          available: false
        };
      }
    }

    result.total.score = result.total.point;

    return res.json({ status: true, data: result });

  } catch (err) {
    console.error("❌ Gagal ambil review nilai ujian:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};
