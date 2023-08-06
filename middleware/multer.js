const multer = require("multer")
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== ".mp3" && ext !== ".wav" && ext !== ".AAC" && ext !== ".AIFF") {
      req.flash('error','File type is not supported!')
      cb(null, false)
      return
    }
    cb(null, true)
  },
})
