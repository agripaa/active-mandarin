const express = require('express');
const router = express.Router();
const soalController = require('../controllers/soal.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', middleware.authenticateUser, soalController.createSoal);
router.get('/', middleware.authenticateUser, soalController.getAllSoal);
router.get('/by-tipe-ujian', middleware.authenticateUser, soalController.getSoalByTipeUjianId);
router.get('/:id', middleware.authenticateUser, soalController.getSoalById);
router.put('/:id', middleware.authenticateUser, soalController.updateSoal);
router.delete('/:id', middleware.authenticateUser, soalController.deleteSoal);

module.exports = router;
