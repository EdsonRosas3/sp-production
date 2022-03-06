//images
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/storage/images'));
    },
    filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const fileName = `${Date.now()}${ext}`;
        cb(null,fileName );
    },
});

export const helperImg = (filePath, fileName,direcotoryDestination,size=300)=>{
    return sharp(filePath)
            .resize(size)
            .toFile(path.join(__dirname, `/storage/optimizeimg/${direcotoryDestination}/${fileName}`))
}
//middleware
export const upload = multer({storage});

export const deleteImage = (direccion)=>{
    try {

        fs.unlinkSync(path.join(__dirname,`/storage/${direccion}`));
    } catch (error) {
        console.log(error);
    }
}



