const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");
const uploadFilesMiddleware = require("../middleware/uploadPdfList");
const fs = require("fs");
const path = require("path");

router.post("/upload", upload.single("file"), controllers.upload.uploadPdf);
router.post(
  "/multiupload",
  uploadFilesMiddleware,
  controllers.multiUpload.uploadPdfList
);

router.post("/seconnecter", controllers.userLogin.login);
router.post("/sites/creation", controllers.createSites.addSite);
router.post("/inscription", controllers.userRegister.register);
router.post(
  "/public/verification/view/:code",
  controllers.verifyViewCode.verifyCode
);
router.post("/pdfs/:pdfID/raport", controllers.createPdfRaport.addRaport);

router.get("/:site/:folder/pdfs", controllers.allPdfs.allPdfs);
router.get(
  "/site/folder/pdf/details/:id",
  controllers.getPdfById.getPdfDataById
);
router.get("/sites", controllers.allSites.sites);
router.get("/pdf/raports", controllers.getRaports.getPdfReportsById);
router.get("/pdf/doe/:id", controllers.getDOEData.getFile);
router.get("/profile/user", controllers.getUserDataById.getData);

router.get("/DOE/:username/:folder", async (req, res) => {
  const username = req.params.username;
  const folder = req.params.folder;

  const folderPath = path.join(__dirname, "DOE", username, folder);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  try {
    const files = fs.readdirSync(folderPath);

    const fileCount = files.length;

    res.json({ fileCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:site/:folder/pdfs/:title", controllers.deletePdf.delete);
router.delete("/site/:folderId", controllers.deleteSite.delete);

router.put("/site/:folderId", controllers.updateSite.updateFolder);

module.exports = router;
