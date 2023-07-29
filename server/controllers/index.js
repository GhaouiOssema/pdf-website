module.exports = {
  upload: require("./upload.controller"),
  getPdfById: require("./getPdfById.controller"),
  allPdfs: require("./getAllPdf.controller"),
  deletePdf: require("./deletePdfById.controller"),
  createSites: require("./createSite.controller"),
  allSites: require("./getAllSites.controller"),
  userLogin: require("./userLogin.controller"),
  userRegister: require("./userRegister.controller"),
  deleteSite: require("./deleteSite.controller"),
  updateSite: require("./updateSite.controller"),
  verifyViewCode: require("./verifyCode.controller"),
  createPdfRaport: require("./createRaport.controller"),
  getRaports: require("./getPdfRaportsById.controller"),
  getDOEData: require("./getDOEFiles.controller"),
  getUserDataById: require("./fetchUserData.controller"),
  formData: require("./formDataUpload.controller"),
  forgotUserPassword: require("./resetPassword.controller"),
};
