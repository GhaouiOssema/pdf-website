const path = require('path');

module.exports = {
	async pdfView(req, res) {
		const filename = req.params.filename;

		const filePath = path.join(__dirname, 'uploads', filename);

		res.send(`
    <html>
      <body style="margin: 0;">
        <object data="/${filePath}" type="application/pdf" style="width: 100%; height: 100vh;"></object>
      </body>
    </html>
  `);
	},
};
