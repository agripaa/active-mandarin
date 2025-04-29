const { TurunanBrand } = require('../models');
const {Op} = require('sequelize');

exports.getAllTurunan = async (req, res) => {
  try {
    const { search } = req.query;

    let where = {};
    if (search) {
      where = {
        turunan: {
          [Op.iLike]: `%${search}%`
        }
      };
    }

    const turunanList = await TurunanBrand.findAll({ where });

    res.status(200).json({ status: true, data: turunanList });
  } catch (error) {
    console.error('Error fetching Turunan:', error);
    res.status(500).json({ status: false, message: 'Failed to fetch turunan', error: error.message });
  }
};

exports.getTurunanById = async (req, res) => {
  try {
    const { id } = req.params;
    const turunan = await TurunanBrand.findByPk(id);

    if (!turunan) {
      return res.status(404).json({ status: false, message: 'Turunan not found' });
    }

    res.status(200).json({ status: true, data: turunan });
  } catch (error) {
    console.error('Error fetching Turunan by ID:', error);
    res.status(500).json({ status: false, message: 'Failed to fetch turunan', error: error.message });
  }
};

exports.createTurunan = async (req, res) => {
  try {
    const { title, sub_title, turunan } = req.body;

    if (!title || !turunan) {
      return res.status(400).json({ status: false, message: 'Title and Turunan fields are required' });
    }

    const newTurunan = await TurunanBrand.create({ title, sub_title, turunan });

    res.status(201).json({ status: true, message: 'Turunan created successfully', data: newTurunan });
  } catch (error) {
    console.error('Error creating Turunan:', error);
    res.status(500).json({ status: false, message: 'Failed to create turunan', error: error.message });
  }
};

exports.updateTurunan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sub_title, turunan } = req.body;

    const turunanExist = await TurunanBrand.findByPk(id);

    if (!turunanExist) {
      return res.status(404).json({ status: false, message: 'Turunan not found' });
    }

    await turunanExist.update({ title, sub_title, turunan });

    res.status(200).json({ status: true, message: 'Turunan updated successfully', data: turunanExist });
  } catch (error) {
    console.error('Error updating Turunan:', error);
    res.status(500).json({ status: false, message: 'Failed to update turunan', error: error.message });
  }
};

exports.deleteTurunan = async (req, res) => {
  try {
    const { id } = req.params;

    const turunanExist = await TurunanBrand.findByPk(id);

    if (!turunanExist) {
      return res.status(404).json({ status: false, message: 'Turunan not found' });
    }

    await turunanExist.destroy();

    res.status(200).json({ status: true, message: 'Turunan deleted successfully' });
  } catch (error) {
    console.error('Error deleting Turunan:', error);
    res.status(500).json({ status: false, message: 'Failed to delete turunan', error: error.message });
  }
};
