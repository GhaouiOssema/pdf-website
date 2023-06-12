const path = require('path');

module.exports = {
	async pdfView(req, res) {
		const filename = req.params.filename;

		// Assuming the PDF files are stored in the "uploads" directory
		const filePath = path.join(__dirname, 'uploads', filename);

		res.send(`
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          #viewerContainer {
            width: 100%;
            height: 100%;
          }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
      </head>
      <body>
        <div id="viewerContainer"></div>
        <script>
          const url = '/${filename}';
          const pdfContainer = document.getElementById('viewerContainer');
          pdfjsLib.getDocument(url).promise.then(pdf => {
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
              pdf.getPage(pageNumber).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({
                  canvasContext: context,
                  viewport
                }).promise.then(() => {
                  pdfContainer.appendChild(canvas);
                });
              });
            }
          });
        </script>
      </body>
    </html>
  `);
	},
};
