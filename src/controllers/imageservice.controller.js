import Service from "../models/Service";
import ImageService from "../models/ImageService";
import { helperImg,deleteImage } from "../imgConfiguration";
import path from "path";


export const uploadImgs = async (req, res) => {
  try {
    req.files.forEach(async(file) => {
      helperImg(file.path, file.filename, "300");
      helperImg(file.path, file.filename, "700", 700);
      await ImageService.create({
        original_name: file.originalname,
        public_name: file.filename,
        type: file.mimetype,
        size: file.size,
        service_id:req.params.idService
      });
    });
    const service = await Service.findByPk(req.params.idService);

    if(!service.default_image){
      await Service.update({default_image:req.files[0].filename}, {
        where: { id: req.params.idService },
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
    const publicnames = await ImageService.findAll({ where:{service_id:req.params.serviceId},attributes:['public_name','original_name']});
    return res.status(200).json(publicnames);
  } catch (error) {
    
  }
}
export const showImagesByIdService = async (req, res) =>{
  try {
    const images = await ImageService.findAll({ where:{service_id:req.params.serviceId}});
    return res.status(200).json(images);
  } catch (error) {
    
  }
}
export const destroyImage = async (req,res) =>{
  try {
    const nameImage = req.params.publicname;
    await ImageService.destroy({ where:{public_name:req.params.publicname}});
    deleteImage(`images/${nameImage}`);
    deleteImage(`optimizeimg/300/${nameImage}`);
    deleteImage(`optimizeimg/700/${nameImage}`);
    return res.status(200).json({DELETE:true,message:"Las imagenes se eliminaron correctamente."});
  } catch (error) {
    
  }
}

