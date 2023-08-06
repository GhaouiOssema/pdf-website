const Raport = require("../models/Raport");
const PDF = require("../models/PDF");
const UserAccount = require("../models/USER");
const jwt = require("jsonwebtoken");

module.exports = {
  async addRaport(req, res) {
    try {
      const { pdfID } = req.params;
      const {
        société,
        observation,
        piècesChangées,
        dateProchainEntretien,
        option,
      } = req.body;

      const token = req?.headers?.authorization?.split(" ")[1] || null;

      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        const pdf = await PDF.findById(pdfID);
        if (!pdf) {
          return res.status(404).json({ error: "PDF not found." });
        }

        const user = await UserAccount.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }

        options.push(option);

        const newRaport = new Raport({
          société,
          observation,
          piècesChangées,
          dateProchainEntretien,
          dateDernierEntretien: new Date(),
          pdf: req.body.id,
          user: société,
          options,
        });

        const savedRaport = await newRaport.save();

        pdf.raports.push(savedRaport._id);
        await pdf.save();

        res.status(200).json(savedRaport);
      } else {
        const pdf = await PDF.findById(pdfID);
        if (!pdf) {
          return res.status(404).json({ error: "PDF not found." });
        }

        let options = [];

        options.push(option);

        const newRaport = new Raport({
          société,
          observation,
          piècesChangées,
          dateProchainEntretien,
          dateDernierEntretien: new Date(),
          pdf: req.body.id,
          user: société,
          options,
        });

        const savedRaport = await newRaport.save();

        pdf.raports.push(savedRaport._id);
        await pdf.save();
        res.status(200).json(savedRaport);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the PDF report." });
    }
  },
};
