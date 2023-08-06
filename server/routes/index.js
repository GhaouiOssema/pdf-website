const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");
const imageUpload = require("../middleware/imageUpload");
const multiUpload = require("../middleware/multiUpload");

router.post("/upload", upload.single("file"), controllers.upload.uploadPdf);
// Import the modified middleware

// router.post(
//   "/FormUpload",
//   multiUpload.fields([
//     { name: "selectedFile", maxCount: 1 },
//     { name: "selectedImage", maxCount: 1 },
//     { name: "selectedInfo", maxCount: 1 },
//     { name: "selectedDOE", maxCount: 20 },
//   ]),
//   controllers.formData.uploadData
// );
router.post(
  "/FormUpload/mainpdf",
  multiUpload.fields([{ name: "selectedFile", maxCount: 1 }]),
  controllers.formData.uploadData
);
router.post(
  "/FormUpload/image",
  multiUpload.fields([{ name: "selectedImage", maxCount: 1 }]),
  controllers.formData.uploadImage
);
router.post(
  "/FormUpload/fiche",
  multiUpload.fields([{ name: "selectedInfo", maxCount: 1 }]),
  controllers.formData.uploadFileInfo
);
router.post(
  "/FormUpload/doe",
  multiUpload.fields([{ name: "selectedDOE", maxCount: 20 }]),
  controllers.formData.uploadDOE
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
router.get("/site/folder/pdf/details/plan/:id", controllers.getPdfById.plan);
router.get("/site/folder/pdf/details/doe/:id", controllers.getPdfById.doeData);
router.get(
  "/site/folder/pdf/details/doefiles/:id",
  controllers.getPdfById.doeFiles
);
router.get("/site/folder/pdf/details/fiche/:id", controllers.getPdfById.fiche);
router.get(
  "/site/folder/pdf/details/raports/:id",
  controllers.getPdfById.raports
);
router.get(
  "/site/folder/pdf/details/image/:id",
  controllers.getPdfById.pdfImage
);

router.get("/sites", controllers.allSites.sites);
router.get("/pdf/raports", controllers.getRaports.getPdfReportsById);
router.get("/profile/user", controllers.getUserDataById.getData);

router.delete("/:site/:folder/pdfs/:title", controllers.deletePdf.delete);
router.delete("/site/:folderId", controllers.deleteSite.delete);

router.put("/site/:folderId", controllers.updateSite.updateFolder);

module.exports = router;
