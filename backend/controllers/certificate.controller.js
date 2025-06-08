const db = require("../models");
const { Certificate, User } = db;

// Create Certificate
exports.createCertificate = async (req, res) => {
  try {
    const { exam_level, ...rest } = req.body;

    // Generate exam_no based on exam_level (e.g., 4 => H4 + timestamp + random 3 digits)
    let examPrefix = "";
    if (exam_level && !isNaN(exam_level)) {
      examPrefix = `H${exam_level}`;
    }
    const timestamp = Date.now().toString().slice(-8); // last 8 digits of timestamp
    const randomDigits = Math.floor(100 + Math.random() * 900); // random 3 digits
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}${mm}${dd}`;
    const exam_no = `${examPrefix}${formattedDate}${randomDigits}`;

    const certificate = await Certificate.create({
      ...rest,
      exam_level,
      exam_no,
    });
    res.status(201).json({ status: true, data: certificate });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Get All Certificates
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.findAll({
      include: {
        model: User,
        attributes: ["name", "profile_img"],
      },
    });
    res.status(200).json({ status: true, data: certificates });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Get Certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      where: { ujian_id: req.params.id, exam_no: req.params.examNo },
      include: {
        model: User,
        attributes: ["name", "profile_img"],
      },
    });
    if (!certificate)
      return res
        .status(404)
        .json({ status: false, message: "Certificate not found" });
    res.status(200).json({ status: true, data: certificate });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Update Certificate
exports.updateCertificate = async (req, res) => {
  try {
    const [updated] = await Certificate.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res
        .status(404)
        .json({ status: false, message: "Certificate not found" });
    const updatedCertificate = await Certificate.findByPk(req.params.id);
    res.status(200).json({ status: true, data: updatedCertificate });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Delete Certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const deleted = await Certificate.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res
        .status(404)
        .json({ status: false, message: "Certificate not found" });
    res.status(200).json({ status: true, message: "Certificate deleted" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Get all certificates for a specific user
exports.getCertificatesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const certificates = await Certificate.findAll({
      where: { user_id: userId },
      include: {
        model: User,
        attributes: ["name", "profile_img"],
      },
    });
    res.status(200).json({ status: true, data: certificates });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};
