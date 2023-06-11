// app.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
var cors = require('cors');
const path = require('path');

// Create a connection to MongoDB
mongoose.connect(
	'mongodb+srv://pargingv1:JrwEMqycyjRxF1gs@cluster0.cm8saha.mongodb.net/',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Create a mongoose schema for the PDF model
const pdfSchema = new mongoose.Schema({
	filename: String,
	path: String,
});

// Create a mongoose model for the PDF
const PDF = mongoose.model('PDF', pdfSchema);

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// Create multer instance with storage configuration
const upload = multer({ storage });

// Create Express application
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route for uploading a PDF file
app.post('/upload', upload.single('pdf'), async (req, res) => {
	// Check if a file was uploaded
	if (!req.file) {
		res.status(400).json({ error: 'No file uploaded.' });
	}
	const { filename, path } = req.file;

	// Create a new PDF document
	const newPDF = new PDF({
		filename,
		path,
	});

	try {
		// Save the PDF document to the database
		const savedPDF = await newPDF.save();
		res.status(200).json({ message: 'PDF uploaded successfully.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to upload PDF.' });
	}
});

app.get('/pdfs', async (req, res) => {
	try {
		// Fetch all PDF documents from the database
		const pdfs = await PDF.find({}, 'filename path');

		res.status(200).json({ pdfs });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch PDF files.' });
	}
});
app.delete('/pdfs/:id', async (req, res) => {
	try {
		const pdf = await PDF.deleteOne({ _id: req.params.id });
		if (pdf.deletedCount === 0) {
			return res.status(404).json({ message: 'PDF not found.' });
		}
		return res.status(200).json({ message: 'PDF deleted successfully.' });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Failed to delete PDF.', error: error.message });
	}
});

app.get('/pdf/:id', async (req, res) => {
	try {
		const pdfId = req.params.id;

		// Find the PDF in the database by ID
		const pdf = await PDF.findById(pdfId);

		if (!pdf) {
			return res.status(404).json({ error: 'PDF not found' });
		}

		// Compare the ID from the URL with the ID in the database
		if (pdf._id.toString() !== pdfId) {
			return res.status(400).json({ error: 'Invalid PDF ID' });
		}

		// Return the PDF data
		res.json(pdf);
	} catch (error) {
		console.error('Error retrieving PDF data:', error);
		res.status(500).json({ error: 'Server error' });
	}
});

// Start the server
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
