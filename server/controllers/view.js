const path = require('path');

module.exports = {
	async pdfView(req, res) {
		{
			const filename = req.params.filename;
			const filePath = path.join(__dirname, 'uploads', filename);

			res.sendFile(filePath);
		}
	},
};
