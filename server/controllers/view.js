module.exports = {
	async pdfView(req, res) {
		const filename = req.params.filename;
		const filePath = path.join(__dirname, 'uploads', filename);
		res.send(`
    <html>
      <body>
        <embed src="${filePath}" width="100%" height="800px" type="application/pdf" />
      </body>
    </html>
  `);
	},
};
