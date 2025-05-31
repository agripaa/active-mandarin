const express = require('express');
const router = express.Router();
const ujianBrandController = require('../controllers/ujianBrand.controller');
const middleware = require('../middleware/verifyAuth.middleware');

router.post('/', middleware.authenticateUser, ujianBrandController.createUjianBrand);
router.get('/', middleware.authenticateUser, ujianBrandController.getAllUjianBrands);
router.get('/:id', middleware.authenticateUser, ujianBrandController.getUjianBrandById);
router.put('/:id', middleware.authenticateUser, ujianBrandController.updateUjianBrand);
router.delete('/:id', middleware.authenticateUser, ujianBrandController.deleteUjianBrand);

module.exports = router;
