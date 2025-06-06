const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujian.controller');
const middleware = require("../middleware/verifyAuth.middleware");
const middlewareRole = require("../middleware/verifyAdmin.middleware");

router.get('/', middleware.authenticateUser, middlewareRole.authenticateAdmin, ujianController.index);
router.get('/:id', middleware.authenticateUser, middlewareRole.authenticateAdmin, ujianController.show);
router.post('/', middleware.authenticateUser, middlewareRole.authenticateAdmin, ujianController.create);
router.put('/:id', middleware.authenticateUser, middlewareRole.authenticateAdmin, ujianController.update);
router.delete('/:id', middleware.authenticateUser, middlewareRole.authenticateAdmin, ujianController.delete);

module.exports = router;
