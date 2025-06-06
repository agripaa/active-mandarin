const db = require('../models');
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
