const express = require('express');
const multer = require('multer');
var cors = require('cors');
const path = require('path');

// Create a connection to MongoDB
const connectDB = require('./config/Database.config');
connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(require('./routes'));
app.use((req, res, next) => {
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self'; style-src 'self' https://fonts.googleapis.com"
	);
	next();
});

// Start the server
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
