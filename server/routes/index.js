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
	const fileId = req.params.id;
	const filePath = path.join(uploadDirectory, fileId);

	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			console.error('Error accessing PDF file:', err);
			res.sendStatus(404);
			return;
		}

		const fileStream = fs.createReadStream(filePath);
		res.setHeader('Content-Type', 'application/pdf');
		fileStream.pipe(res);
	});
});

module.exports = router;
