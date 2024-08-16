import multer from "multer";

const multerUpload = multer({
    limits:{
        fileSize: 1024 * 1024 * 5, // 5MB
    }
})

const singleAvatar = multerUpload.single("avatar");

export {singleAvatar};

// there are two types of storage : memory(RAM) and disk
// memory means RAM which is temporary and fast - it is deafult 
// disk means hard disk matalab hame yhi ek folder bana ke files upload kar padti
// but we are using cloudinary , so we need temporary buffer data(ram) jaha par files ka data store hoga and then hum usse cloudinary par upload kar denge and temporary storage mese delete kar denge