//import files
const multer = require('multer');

//file location
const MAX_FILE_SIZE = 1024 * 1024 * 2; //kb to mb and maximume 2 mb
const Allowed_File_Type = ['image/jpg', 'image/jpeg', 'image/png'];

//image or any typle of file storing
const storage = multer.memoryStorage();

  const fileFilter = (req, file, cd)=>{
   if(!file.mimetype.startsWith('image/')){
    return cb(new Error('Only image files are allow'), false);
   };

   if(file.size > MAX_FILE_SIZE){
    return cb(new Error('File size exceeds the maximum limit'), false);
   };

   if(!Allowed_File_Type.includes(file.mimetype)){
    return cb(new Error('File extension is not allow'), false);
   }
   cd(null, true)
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

  module.exports = upload;