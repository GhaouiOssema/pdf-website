const jwt = require("jsonwebtoken");
const Raport = require("../models/Raport");
const PDF = require("../models/PDF");

module.exports = {
  async getPdfReportsById(req, res) {
    try {
      const raports = await Raport.find();
      res.json(raports);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve raports" });
    }
  },
};
