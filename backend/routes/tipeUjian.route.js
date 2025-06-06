const express = require('express');
const router = express.Router();
const tipeUjianController = require('../controllers/tipeujian.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', middleware.authenticateUser, tipeUjianController.createTipeUjian);
router.get('/', middleware.authenticateUser, tipeUjianController.getAllTipeUjian);
router.get('/:id', middleware.authenticateUser, tipeUjianController.getTipeUjianById);
router.put('/:id', middleware.authenticateUser, tipeUjianController.updateTipeUjian);
router.delete('/:id', middleware.authenticateUser, tipeUjianController.deleteTipeUjian);

module.exports = router;
