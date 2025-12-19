const multer = require("multer");

// Railway disk is ephemeral, so use memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
