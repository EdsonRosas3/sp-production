import TypeService from "../models/TypeService";
import Service from "../models/Service";

export const existService = async (req, res, next) => {
    try{
      const service = await Service.findByPk(req.params.serviceId);
      if(!service){
        return res.status(404).json({ message: "Servicio no encontrado" }); 
      }
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
};

export const existCodeService = async (req, res, next) => {
  try{
    const service = await Service.findOne({ 
      where: { code: req.params.code } 
    });
    if(!service){
      return res.status(404).json({ message: "Codigo de servicio no encontrado" }); 
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const existTypeService = async (req, res, next) => {
  try{
    const type = await TypeService.findByPk(req.params.typeServiceId);
    if(!type){
      return res.status(404).json({ message: "Tipo de servicio no encontrado" }); 
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};