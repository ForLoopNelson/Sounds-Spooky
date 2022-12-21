const multer = require("multer")
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG") {
    //   cb(new Error("File type is not supported"), false)
    //   return
    // }
    if (ext !== ".mp3" && ext !== ".wav" && ext !== ".AAC" && ext !== ".AIFF") {
      cb(new Error("File type is not supported!"), false)
      return
    }
    cb(null, true)
  },
})
