const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");

router.get("/pdfs", controllers.allPdfs.allPdfs);
router.delete("/pdfs/:id", controllers.deletePdf.delete);
router.get("/pdf/data/:id", controllers.getPdfById.getPdfDataById);
router.post("/upload", upload.single("pdf"), controllers.upload.uploadPdf);
router.get("/pdf/file/:id", controllers.getPdfById.getPdfFile);
router.post("/sites/creation", controllers.createSites.addSite);
router.get("/sites", controllers.allSites.sites);
router.post("/seconnecter", controllers.userLogin.login);
router.post("/inscription", controllers.userRegister.register);

module.exports = router;
