const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({   
    // destination: './public/profile_image/', 
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            }
           
          });

exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000 
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {       
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
     }
   cb(undefined, true)
  }
  
})