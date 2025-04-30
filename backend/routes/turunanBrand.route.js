const express = require('express');
const router = express.Router();
const turunanBrandController = require('../controllers/turunanBrand.controller');

router.get('/', turunanBrandController.getAllTurunan);
router.get('/:id', turunanBrandController.getTurunanById);
router.post('/', turunanBrandController.createTurunan);
router.put('/:id', turunanBrandController.updateTurunan);
router.delete('/:id', turunanBrandController.deleteTurunan);

module.exports = router;
