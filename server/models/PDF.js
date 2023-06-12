const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
	filename: String,
	path: String,
	title: String,
	owner: String,
	creationDate: { type: Date, default: Date.now },
	publicOrPrivate: { type: String, enum: ['public', 'private'] },
});

// Create a mongoose model for the PDF
module.exports = mongoose.model('PDFs', pdfSchema);
