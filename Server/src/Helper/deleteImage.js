//import files
const fs = require('fs').promises;

//delete image function
const deleteImage =  async (userImagePath)=>{
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log('User Image was deleted');
    } catch (error) {
        console.error('User Image does not exist.')
    }
};

//export
module.exports = deleteImage;