//file uoload
const multer = require('multer')
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb('file must be an image', false)
        //return cb(appError.create('file must be an image', 400), false)
    }
}
const upload = multer({ 
    storage: diskStorage,
    fileFilter
})


module.exports = upload;
