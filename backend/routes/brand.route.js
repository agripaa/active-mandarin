const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.get('/category', brandController.getCategoryTurunanBrand);
router.get('/grouped', brandController.getGroupedBrands);
router.get('/latest-programs', brandController.getLatestPrograms);
router.get('/turunan', brandController.getTurunanOptions);
router.get('/:id', middleware.authenticateUser, brandController.getBrandById);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
