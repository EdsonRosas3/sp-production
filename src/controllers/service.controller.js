import Service from "../models/Service";
import ImageService from "../models/ImageService";
import {deleteImage} from "../imgConfiguration";
import Price from "../models/Price";


export const createService = async (req, res) => {
  try {
    const price = await Price.create(req.body.price);
    req.body.price_id = price.id;

    const services = await Service.findAndCountAll();
    req.body.code = generateCode(services);
    const service = await Service.create(req.body);
    
    return res.status(201).json({ message: "Producto ha sido actualizado",service});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.serviceId);
    const price = await Price.findByPk(service.price_id);
    service.price_id = price;

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//buscar servicio por code
export const getServiceByCode = async (req, res) => {
  try {
    const service = await Service.findOne({ 
      where: { code: req.params.code } 
    });
    const price = await Price.findByPk(service.price_id);
    service.price_id = price;

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//todos los servicios
export const getServices = async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const order_by = req.query.order_by;
    const order_direction = req.query.order_direction;

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 30;
    if (!Number.isNaN(sizeAsNumber) &&!(sizeAsNumber > 30) &&!(sizeAsNumber < 1)) {
      size = sizeAsNumber;
    }

    const allServices = await Service.findAndCountAll({
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while(i < allServices.count){
      const service = allServices.rows[i];
      const price = await Price.findByPk(service.price_id);
      service.price_id = price;
      i++;
    }
    return res.send({
      content: allServices.rows,
      totalPages: Math.ceil(allServices.count / Number.parseInt(size)),
      totalServices: allServices.count
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateServiceById = async (req, res) => {
  try {
    const updateService = await Service.update(req.body, {
      where: { id: req.params.serviceId },
    });

    const service = await Service.findByPk(req.params.serviceId);
    const updatedPrice = await Price.update(req.body.price, {
      where: { id: service.price_id },
    });
    const price = await Price.findByPk(service.price_id);
    service.price_id = price;

    return res.status(201).json({ message: "Servicio ha sido actualizado" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteServiceById = async (req, res) => {
  try {
    const publicnames = await ImageService.findAll({ 
      where:{service_id:req.params.serviceId},attributes:['public_name']
    });

    const service = await Service.findByPk(req.params.serviceId);
    const deleteService = await Service.destroy({
      where: { id: req.params.serviceId },
    });
    const deletePrice = await Price.destroy({
      where: { id: service.price_id },
    });

    publicnames.forEach(image => {
      deleteImage(`images/${image.public_name}`);
      deleteImage(`images/optimizeimg/300/${image.public_name}`);
      deleteImage(`images/optimizeimg/700/${image.public_name}`);
      
    });
    return res.status(200).json({ message: "Servicio ha sido eliminado", deleteService });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//servicios disponibles por tipo de servicio
export const getServiceByTypeIdA = async (req, res) => {
  try{

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const order_by = req.query.order_by;
    const order_direction = req.query.order_direction;
    
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
    let size = 30;
    if (!Number.isNaN(sizeAsNumber) &&!(sizeAsNumber > 30) &&!(sizeAsNumber < 1)) {
      size = sizeAsNumber;
    }
    const serviceByType = await Service.findAndCountAll({
      where: {
        typeService_id: req.params.typeServiceId,
        available: true
      },
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while(i < serviceByType.rows.length){
      const service = serviceByType.rows[i];
      const price = await Price.findByPk(service.price_id);
      service.price_id = price;
      i++;
    }

    return res.send({
      content: serviceByType.rows,
      totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
      totalServices: serviceByType.count
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//servicios no disponibles por tipo de servicio
export const getServiceByTypeIdNoA = async (req, res) => {
  try{

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const order_by = req.query.order_by;
    const order_direction = req.query.order_direction;
    
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
    let size = 30;
    if (!Number.isNaN(sizeAsNumber) &&!(sizeAsNumber > 30) &&!(sizeAsNumber < 1)) {
      size = sizeAsNumber;
    }
    const serviceByType = await Service.findAndCountAll({
      where: {
        typeService_id: req.params.typeServiceId,
        available: false
      },
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while(i < serviceByType.rows.length){
      const service = serviceByType.rows[i];
      const price = await Price.findByPk(service.price_id);
      service.price_id = price;
      i++;
    };

    return res.send({
      content: serviceByType.rows,
      totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
      totalServices: serviceByType.count
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//todos los servicios por tipo de servicio
export const getServiceByTypeId = async (req, res) => {
  try{

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const order_by = req.query.order_by;
    const order_direction = req.query.order_direction;
    
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 30;
    if (!Number.isNaN(sizeAsNumber) &&!(sizeAsNumber > 30) &&!(sizeAsNumber < 1)) {
      size = sizeAsNumber;
    }
    const serviceByType = await Service.findAndCountAll({
        where: {
          typeService_id: req.params.typeServiceId
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]],
    });

    var i = 0;
    while(i < serviceByType.rows.length){
      const service = serviceByType.rows[i];
      const price = await Price.findByPk(service.price_id);
      service.price_id = price;
      i++;
    }

    return res.send({
      content: serviceByType.rows,
      totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
      totalServices: serviceByType.count
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateDefaultImage = async (req, res)=>{
  try {
    const updateService = await Service.update(req.body, {
      where: { id: req.params.serviceId },
    });
    return res.status(201).json({ message: "La imagen principal se actualizo", updateService });
  } catch (error) {
    return res.status(500).json(error);
  }
}

function generateCode(elements){
  
  const length = elements.count;
  let number = elements.count;

  if( length < 9){
    number = "000" + (length+1);
  }
  if( length > 9 && length < 99){
    number = "00" + (length+1);
  }
  if( length > 99 && length < 999){
    number = "0" + (length+1);
  }
  if( length > 9999){
    const r = Math.random()*(10000-1) + 1;
    number = Math.floor(r);
  }
  const codeRandom = generateRandom(4) + number;
  return codeRandom;
}

function generateRandom(num) {
  
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(''),
    result = "";
  if (num > characters.length) return false;
  for (let i = 0; i < num; i++) {
    result += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
  }
  return result;
}