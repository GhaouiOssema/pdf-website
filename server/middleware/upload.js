const multer = require('multer');
var cors = require('cors');
const path = require('path');
// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

module.exports = upload;
