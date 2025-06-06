const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujian.controller');
const middleware = require("../middleware/verifyAuth.middleware");

router.post('/', middleware.authenticateUser, ujianController.createUjian);
router.get('/', middleware.authenticateUser, ujianController.getAllUjian);
router.get('/:id', middleware.authenticateUser, ujianController.getUjianById);
router.put('/:id', middleware.authenticateUser, ujianController.updateUjian);
router.delete('/:id', middleware.authenticateUser, ujianController.deleteUjian);

module.exports = router;
