const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const PDF = require("../models/PDF");
const zlib = require("zlib");

module.exports = {
  async getPdfDataById(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const pdf = await PDF.findById(req.params.id);

      if (!pdf) {
        return res.status(404).json({ error: "PDF not found." });
      }

      let filteredPdfData = {};
      const data = req.query.data;

      if (data === "mainDetails") {
        filteredPdfData = {
          _id: pdf._id,
          title: pdf.title,
          pdfDetails: pdf.pdfDetails,
          raports: pdf.raports,
          pdfImage: pdf.pdfImage,
        };
      } else if (data === "plan") {
        filteredPdfData = {
          _id: pdf._id,
          mainPdf: pdf.mainPdf,
        };
      } else if (data === "raport") {
        filteredPdfData = {
          _id: pdf._id,
          raports: pdf.raports,
        };
      } else {
        filteredPdfData = pdf;
      }

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
};

async function compressBase64Image(base64Image) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(base64Image, "base64");
    zlib.gzip(buffer, (err, compressedData) => {
      if (err) {
        reject(err);
      } else {
        const compressedBase64Image = compressedData.toString("base64");
        resolve(compressedBase64Image);
      }
    });
  });
}
