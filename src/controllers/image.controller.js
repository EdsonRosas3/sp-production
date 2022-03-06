import Product from "../models/Product";
import Image from "../models/Image";
import { helperImg,deleteImage } from "../imgConfiguration";
import path from "path";


export const uploadImgs = async (req, res) => {
  try {
    req.files.forEach(async(file) => {
      helperImg(file.path, file.filename, "300");
      helperImg(file.path, file.filename, "700", 700);
      await Image.create({
        original_name: file.originalname,
        public_name: file.filename,
        type: file.mimetype,
        size: file.size,
        product_id:req.params.idProduct
      });
    });
    const product = await Product.findByPk(req.params.idProduct);

    if(!product.default_image){
      await Product.update({default_image:req.files[0].filename}, {
        where: { id: req.params.idProduct },
      });
    }
  
    res.json({ UPLOAD: true, message: "Imagenes guardado" });
  } catch (error) {
    res.json({ UPLOAD: false, message: "Error en la carga" });
  }
};

export const sendFile = (req, res) => {
  try {
    const dir = path.join(
      __dirname,
      `../storage/optimizeimg/${req.params.size}/${req.params.filename}`
    );
    res.sendFile(dir);
  } catch (error) {
    
  }
};

export const showNameImgs = async (req, res) =>{
  try {
    const publicnames = await Image.findAll({ where:{product_id:req.params.productId},attributes:['public_name','original_name']});
    return res.status(200).json(publicnames);
  } catch (error) {
    
  }
}
export const showImagesByIdProduct = async (req, res) =>{
  try {
    const images = await Image.findAll({ where:{product_id:req.params.productId}});
    return res.status(200).json(images);
  } catch (error) {
    
  }
}
export const destroyImage = async (req,res) =>{
  try {
    const nameImage = req.params.publicname;
    await Image.destroy({ where:{public_name:req.params.publicname}});
    deleteImage(`images/${nameImage}`);
    deleteImage(`optimizeimg/300/${nameImage}`);
    deleteImage(`optimizeimg/700/${nameImage}`);
    return res.status(200).json({DELETE:true,message:"Las imagenes se eliminaron correctamente."});
  } catch (error) {
    
  }
}

