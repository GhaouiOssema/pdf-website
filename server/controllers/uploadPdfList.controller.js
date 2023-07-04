const PDF = require("../models/PDF");
const FETCH = require("../middleware/fetchDOE");

module.exports = {
  async uploadPdfList(req, res) {
    try {
      const files = req.files;

      if (!files || files.length === 0) {
        throw new Error("No files provided");
      }

      const savedPDFs = [];

      for (const file of files) {
        const originalFilename = file.originalname;

        let counter = 1;
        let newTitle = `${originalFilename.substring(
          0,
          originalFilename.lastIndexOf(".")
        )}_${counter.toString().padStart(2, "0")}.pdf`;

        const pdf = new PDF({
          filename: newTitle,
          path: file.path,
          title: req.body.pdfTitle,
        });

        const savedPdf = await pdf.save();
        savedPDFs.push(savedPdf);
      }

      const pdfToUpdate = await PDF.findOne({ title: req.body.pdfTitle });

      if (!pdfToUpdate) {
        throw new Error("PDF not found");
      }

      const updatedPDF = await PDF.findOneAndUpdate(
        { title: req.body.pdfTitle },
        { $addToSet: { DOE: { $each: savedPDFs } } },
        { new: true }
      );

      FETCH(files.length);

      res.json({ files: savedPDFs, updatedPDF });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};
