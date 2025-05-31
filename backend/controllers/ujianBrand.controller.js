const db = require('../models');
const { Op } = require('sequelize');

const { UjianBrand, Ujian, Brand } = db;

// Create
exports.createUjianBrand = async (req, res) => {
  try {
    const { ujian_id, brand_id } = req.body;

    const ujian = await Ujian.findByPk(ujian_id);
    if (!ujian) return res.status(404).json({ status: false, message: "Ujian not found" });

    const brand = await Brand.findByPk(brand_id);
    if (!brand) return res.status(404).json({ status: false, message: "Brand not found" });

    const ujianBrand = await UjianBrand.create({ ujian_id, brand_id });

    res.status(201).json({ status: true, message: "UjianBrand created successfully", data: ujianBrand });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Read All
exports.getAllUjianBrands = async (req, res) => {
  try {
    const ujianBrands = await UjianBrand.findAll({
      include: [
        { model: db.Ujian, as: 'Ujian' },
        { model: db.Brand, as: 'Brand' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ status: true, data: ujianBrands });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Read By ID
exports.getUjianBrandById = async (req, res) => {
  try {
    const ujianBrand = await UjianBrand.findByPk(req.params.id, {
      include: [
        { model: db.Ujian, as: 'Ujian' },
        { model: db.Brand, as: 'Brand' }
      ]
    });

    if (!ujianBrand) {
      return res.status(404).json({ status: false, message: "UjianBrand not found" });
    }

    res.json({ status: true, data: ujianBrand });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update
exports.updateUjianBrand = async (req, res) => {    
  try {
    const { ujian_id, brand_id } = req.body;

    const ujianBrand = await UjianBrand.findByPk(req.params.id);
    if (!ujianBrand) {
      return res.status(404).json({ status: false, message: "UjianBrand not found" });
    }

    // Validasi: wajib isi setidaknya satu field untuk update
    if (!ujian_id && !brand_id) {
      return res.status(400).json({ status: false, message: "At least one of ujian_id or brand_id must be provided" });
    }

    // Validasi data jika diubah
    if (ujian_id) {
      const ujian = await Ujian.findByPk(ujian_id);
      if (!ujian) return res.status(400).json({ status: false, message: "Invalid ujian_id" });
    }

    if (brand_id) {
      const brand = await Brand.findByPk(brand_id);
      if (!brand) return res.status(400).json({ status: false, message: "Invalid brand_id" });
    }

    // Update hanya field yang dikirim
    const updated = await ujianBrand.update({
      ujian_id: ujian_id || ujianBrand.ujian_id,
      brand_id: brand_id || ujianBrand.brand_id
    });

    res.json({ status: true, message: "UjianBrand updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};


// Delete
exports.deleteUjianBrand = async (req, res) => {
  try {
    const ujianBrand = await UjianBrand.findByPk(req.params.id);
    if (!ujianBrand) {
      return res.status(404).json({ status: false, message: "UjianBrand not found" });
    }

    await ujianBrand.destroy();
    res.json({ status: true, message: "UjianBrand deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
