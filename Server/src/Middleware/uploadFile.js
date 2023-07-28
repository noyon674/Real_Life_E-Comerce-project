//import files
const multer = require('multer');
const path = require('path');
const createError = require('http-errors');
//file location
const MAX_FILE_SIZE = 1024 * 1024 * 2; //kb to mb and maximume 2 mb
const Allowed_File_Type = ['jpg', 'jpeg', 'png'];
const uploadDirectory ='public/Images/Users';

//image or any typle of file storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      cb(null, Date.now() + '-' + file.originalname.replace(extName, '')+extName);
    }
  });

  const fileFilter = (req, file, cd)=>{
    const extName = path.extname(file.originalname);
    if(!Allowed_File_Type.includes(extName.substring(1))){
        return cd( createError(400, 'File type not allowed'))
    }
    cd(null, true)
  };
  
  const upload = multer({ 
    storage: storage,
    limits: {fileSize: MAX_FILE_SIZE},
    fileFilter,
});

  module.exports = upload;