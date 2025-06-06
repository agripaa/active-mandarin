const db = require('../models');
const { ListJawaban } = db;

// Create
exports.createListJawaban = async (req, res) => {
  try {
    const { jawaban, isTrue, position } = req.body;

    if (!jawaban || !position) {
      return res.status(400).json({ status: false, message: "Jawaban and position are required." });
    }

    const newJawaban = await ListJawaban.create({
      jawaban,
      isTrue: isTrue ?? false,
      position
    });

    res.status(201).json({ status: true, message: "ListJawaban created successfully", data: newJawaban });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Read All
exports.getAllListJawaban = async (req, res) => {
  try {
    const listJawaban = await ListJawaban.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: listJawaban });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Read By ID
exports.getListJawabanById = async (req, res) => {
  try {
    const list = await ListJawaban.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ status: false, message: "ListJawaban not found" });
    }
    res.json({ status: true, data: list });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update
exports.updateListJawaban = async (req, res) => {
  try {
    const { jawaban, isTrue, position } = req.body;
    const list = await ListJawaban.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ status: false, message: "ListJawaban not found" });
    }

    await list.update({
      jawaban: jawaban ?? list.jawaban,
      isTrue: isTrue ?? list.isTrue,
      position: position ?? list.position
    });

    res.json({ status: true, message: "ListJawaban updated successfully", data: list });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete
exports.deleteListJawaban = async (req, res) => {
  try {
    const list = await ListJawaban.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ status: false, message: "ListJawaban not found" });
    }

    await list.destroy();
    res.json({ status: true, message: "ListJawaban deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
