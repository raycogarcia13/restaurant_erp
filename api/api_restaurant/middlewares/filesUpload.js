const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
  destination:  path.join(__dirname, "../public/products"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
  }
});

exports.imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000000 // 10000000 Bytes = 100 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|JPEG)$/)) { 
         return cb(new Error('Please upload a valid image'))
       }
     cb(undefined, true)
  }
}) 
