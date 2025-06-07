const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujian.controller');
const middleware = require("../middleware/verifyAuth.middleware");

router.post('/', middleware.authenticateUser, ujianController.createUjian);
router.get('/', middleware.authenticateUser, ujianController.getAllUjian);
router.post('/jawaban', middleware.authenticateUser, ujianController.submitJawaban);
router.post('/finish-phase', ujianController.finishUjianPhase);
router.get('/jawaban-user/:soal_id/:user_id', middleware.authenticateUser, ujianController.getJawabanUserBySoalAndUser);
router.post('/start', middleware.authenticateUser, ujianController.startUjianPhase);
router.get('/progress', middleware.authenticateUser, ujianController.getProgressUjian);
router.get('/soal/:id', middleware.authenticateUser, ujianController.getSoalByUjianId);
router.get('/:id', middleware.authenticateUser, ujianController.getUjianById);
router.put('/:id', middleware.authenticateUser, ujianController.updateUjian);
router.delete('/:id', middleware.authenticateUser, ujianController.deleteUjian);

module.exports = router;
