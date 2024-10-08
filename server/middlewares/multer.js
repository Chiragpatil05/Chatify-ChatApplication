import multer from "multer";

const multerUpload = multer({
    limits:{
        fileSize: 1024 * 1024 * 5, // 5MB is the file limit
    }
})

const singleAvatar = multerUpload.single("avatar");

const attachmetsMulter = multerUpload.array("files",5);

export {singleAvatar , attachmetsMulter};

// there are two types of storage : memory(RAM) and disk
// memory means RAM which is temporary and fast - it is deafult 
// disk means hard disk matalab hame yhi ek folder bana ke files upload karni padti
// but we are using cloudinary , so we need temporary buffer data(ram) jaha par files ka data store hoga and then hum usse cloudinary par upload kar denge and temporary storage mese delete kar denge