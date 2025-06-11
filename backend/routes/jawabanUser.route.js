const express = require('express');
const router = express.Router();
const jawabanUserController = require('../controllers/jawabanUser.controller');
const middleware = require('../middleware/verifyAuth.middleware');

// Get all essay jawaban for a specific user_ujian_progress (by id), with scoring summary
router.get('/essay/user-ujian-progress/:id', middleware.authenticateUser, jawabanUserController.getEssayJawabanByUserUjianProgress);
// API to examine (update poing for each jawabanUser and mark user_ujian_progress as checked)
router.post('/essay/user-ujian-progress/:id/examine', middleware.authenticateUser, jawabanUserController.examineEssayJawaban);
router.get('/exam-results', middleware.authenticateUser, jawabanUserController.getExamUserResults);
router.get('/review/:id', middleware.authenticateUser, jawabanUserController.getReviewJawabanByUserUjian);
router.post('/', middleware.authenticateUser, jawabanUserController.createJawabanUser);
router.get('/', middleware.authenticateUser, jawabanUserController.getAllJawabanUser);
router.get('/:id', middleware.authenticateUser, jawabanUserController.getJawabanUserById);
router.put('/:id', middleware.authenticateUser, jawabanUserController.updateJawabanUser);
router.delete('/:id', middleware.authenticateUser, jawabanUserController.deleteJawabanUser);

module.exports = router;
