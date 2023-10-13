import path from 'path';
import multer from 'multer';
import __dirname from '../utils.js';

/* const uploader = (folderName) => {
    return multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(`${__dirname}/public/uploads/${folderName}`));
        },
        filename: function (req, file, cb) {
          console.log("🚀 ~ Utils folder ~ multer.js", file);
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      onError: function (err, next) {
        console.log("🚀 Utils folder - multer.js", err.message);
        next();
      },
    })
  }
  
  export default uploader; */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __dirname+'/public/documents')
    },

    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
});

const uploader = multer({ storage });

export default uploader