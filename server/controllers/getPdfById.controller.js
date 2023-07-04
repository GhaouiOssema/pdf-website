const mongoose = require("mongoose");
const PDF = require("../models/PDF");

module.exports = {
  async getPdfDataById(req, res) {
    try {
      const pdf = await PDF.findById(req.params.id);

      if (!pdf) {
        return res.status(404).json({ error: "PDF not found." });
      }

      res.status(200).json({ pdf });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
};
