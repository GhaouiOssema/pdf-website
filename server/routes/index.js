const router = require("express").Router();
const controllers = require("../controllers");
const upload = require("../middleware/upload");

router.get("/:foldername/pdfs", controllers.allPdfs.allPdfs);
router.delete("/pdfs/:id", controllers.deletePdf.delete);
router.get("/pdf/data/:id", controllers.getPdfById.getPdfDataById);
router.post("/upload", upload.single("pdf"), controllers.upload.uploadPdf);
router.get("/pdf/file/:id", controllers.getPdfById.getPdfFile);

router.post("/seconnecter", controllers.userLogin.login);
router.post("/inscription", controllers.userRegister.register);

router.post("/sites/creation", controllers.createSites.addSite);
router.get("/sites", controllers.allSites.sites);
router.delete("/site/:folderId", controllers.deleteSite.delete);
router.put("/site/:folderId", controllers.updateSite.updateFolder);

module.exports = router;
