const router = require('express').Router();
const controllers = require('../controllers');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

router.get('/pdfs', controllers.allPdfs.allPdfs);
router.delete('/pdfs/:id', controllers.deletePdf.delete);
router.get('/pdf/:id', controllers.getPdfById.onePdf);
router.post('/upload', upload.single('pdf'), controllers.upload.uploadPdf);
const uploadDirectory = path.join(__dirname, 'uploads/');

router.get('/download/:id', (req, res) => {
	const { filename } = req.params;
	const filePath = path.join(__dirname, 'uploads', filename);

	// Set the appropriate headers for the download
	res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
	res.setHeader('Content-Type', 'application/pdf');

	// Send the file as the response
	res.sendFile(filePath);
});

module.exports = router;
