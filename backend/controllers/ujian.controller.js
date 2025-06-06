const { ujian } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const data = await ujian.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const data = await ujian.findByPk(req.params.id);
      if (!data) return res.status(404).json({ message: 'Ujian not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newUjian = await ujian.create(req.body);
      res.status(201).json(newUjian);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await ujian.findByPk(req.params.id);
      if (!data) return res.status(404).json({ message: 'Ujian not found' });

      await data.update(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await ujian.findByPk(req.params.id);
      if (!data) return res.status(404).json({ message: 'Ujian not found' });

      await data.destroy();
      res.json({ message: 'Ujian deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
