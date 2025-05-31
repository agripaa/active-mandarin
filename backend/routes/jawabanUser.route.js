const express = require('express');
const router = express.Router();
const jawabanUserController = require('../controllers/jawabanUser.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', middleware.authenticateUser, jawabanUserController.createJawabanUser);
router.get('/', middleware.authenticateUser, jawabanUserController.getAllJawabanUser);
router.get('/:id', middleware.authenticateUser, jawabanUserController.getJawabanUserById);
router.put('/:id', middleware.authenticateUser, jawabanUserController.updateJawabanUser);
router.delete('/:id', middleware.authenticateUser, jawabanUserController.deleteJawabanUser);

module.exports = router;
