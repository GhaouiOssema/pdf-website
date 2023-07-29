const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");
const imageUpload = require("../middleware/imageUpload");
const multiUpload = require("../middleware/multiUpload");

router.post("/upload", upload.single("file"), controllers.upload.uploadPdf);
// Import the modified middleware

router.post(
  "/FormUpload",
  multiUpload.fields([
    { name: "selectedFile", maxCount: 1 },
    { name: "selectedImage", maxCount: 1 },
    { name: "selectedInfo", maxCount: 1 },
    { name: "selectedDOE", maxCount: 20 },
  ]),
  controllers.formData.uploadData
);

router.post(
  "/inscription",
  imageUpload.single("file"),
  controllers.userRegister.register
);

router.post("/seconnecter", controllers.userLogin.login);
router.post("/sites/creation", controllers.createSites.addSite);
router.post(
  "/public/verification/view/:code",
  controllers.verifyViewCode.verifyCode
);
router.post("/pdfs/:pdfID/raport", controllers.createPdfRaport.addRaport);
router.post("/forgot-password", controllers.forgotUserPassword.forgotPassword);
router.post("/reset-password", controllers.forgotUserPassword.resetPassword);

router.get("/:site/:folder/pdfs", controllers.allPdfs.allPdfs);
router.get(
  "/site/folder/pdf/details/:id",
  controllers.getPdfById.getPdfDataById
);
router.get("/sites", controllers.allSites.sites);
router.get("/pdf/raports", controllers.getRaports.getPdfReportsById);
router.get("/profile/user", controllers.getUserDataById.getData);

router.delete("/:site/:folder/pdfs/:title", controllers.deletePdf.delete);
router.delete("/site/:folderId", controllers.deleteSite.delete);

router.put("/site/:folderId", controllers.updateSite.updateFolder);

module.exports = router;
