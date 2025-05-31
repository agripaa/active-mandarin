const express = require('express');
const router = express.Router();
const listJawabanController = require('../controllers/listJawaban.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', middleware.authenticateUser, listJawabanController.createListJawaban);
router.get('/', middleware.authenticateUser, listJawabanController.getAllListJawaban);
router.get('/:id', middleware.authenticateUser, listJawabanController.getListJawabanById);
router.put('/:id', middleware.authenticateUser, listJawabanController.updateListJawaban);
router.delete('/:id', middleware.authenticateUser, listJawabanController.deleteListJawaban);

module.exports = router;
