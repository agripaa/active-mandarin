const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment.controller');

router.get('/', recruitmentController.getAllRecruitments);
router.get('/:id', recruitmentController.getRecruitmentById);
router.post('/', recruitmentController.createRecruitment);
router.patch('/:id', recruitmentController.updateRecruitment);
router.delete('/:id', recruitmentController.deleteRecruitment);

module.exports = router;
