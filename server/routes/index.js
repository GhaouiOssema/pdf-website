const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");
const uploadPdfList = require("../middleware/uploadPdfList");

router.post("/upload", upload.single("file"), controllers.upload.uploadPdf);
router.post(
  "/multiUpload",
  uploadPdfList,
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
router.get("/pdf/doe", controllers.getDOEData.getFile);

router.delete("/:site/:folder/pdfs/:title", controllers.deletePdf.delete);
router.delete("/site/:folderId", controllers.deleteSite.delete);

router.put("/site/:folderId", controllers.updateSite.updateFolder);

module.exports = router;
