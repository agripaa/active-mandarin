const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

// GET All Recruitments with Pagination
router.get('/', donationController.getAllDonation);
router.get('/:id', donationController.getDonationById);
router.post('/', donationController.createDonation);
router.patch('/:id', donationController.updateDonation);
router.delete('/:id', donationController.deleteDonation);

module.exports = router;
