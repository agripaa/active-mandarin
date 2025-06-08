const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');
const middleware = require('../middleware/verifyAuth.middleware');
const middlewareAdmin = require('../middleware/verifyAdmin.middleware');

router.post('/', middlewareAdmin.authenticateAdmin, certificateController.createCertificate);
router.get('/', middleware.authenticateUser, certificateController.getCertificates);
router.get('/:id/:examNo', certificateController.getCertificateById);
router.put('/:id', middleware.authenticateUser, certificateController.updateCertificate);
router.delete('/:id', middleware.authenticateUser, certificateController.deleteCertificate);
router.get('/user/:user_id', middleware.authenticateUser, certificateController.getCertificatesByUserId);

module.exports = router;
