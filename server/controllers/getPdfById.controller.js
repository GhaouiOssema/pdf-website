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
      const { raports, pdfDetails, pdfImage, _id } = pdf;

      filteredPdfData = {
        raports,
        pdfDetails,
        pdfImage,
        _id,
      };

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
  async plan(req, res) {
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
      const { mainPdf, _id } = pdf;

      filteredPdfData = {
        _id,
        mainPdf,
      };

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
  async doe(req, res) {
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
      const { doeFiles, _id } = pdf;

      filteredPdfData = {
        _id,
        doeFiles,
      };

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
  async fiche(req, res) {
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
      const { doeFiles, _id } = pdf;

      filteredPdfData = {
        _id,
        doeFiles,
      };

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
  async raports(req, res) {
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
      const { raports, _id } = pdf;

      filteredPdfData = {
        _id,
        raports,
      };

      res.status(200).json({ pdf: filteredPdfData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
};
