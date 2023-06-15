const router = require('express').Router();
const controllers = require('../controllers');
const upload = require('../middleware/upload');

router.get('/pdfs', controllers.allPdfs.allPdfs);
router.delete('/pdfs/:id', controllers.deletePdf.delete);
router.get('/pdf/:id', controllers.getPdfById.onePdf);
router.post('/upload', upload.single('pdf'), controllers.upload.uploadPdf);

module.exports = router;
