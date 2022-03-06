import Category from "../models/Category";
import Product from "../models/Product";

export const existProduct = async (req, res, next) => {
    try{
      const product = await Product.findByPk(req.params.productId);
      if(!product){
        return res.status(404).json({ message: "Producto no encontrado" }); 
      }
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
};

export const existCodeProduct = async (req, res, next) => {
  try{
    const product = await Product.findOne({ 
      where: { code: req.params.code } 
    });
    if(!product){
      return res.status(404).json({ message: "Codigo de producto no encontrado" }); 
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const existCategory = async (req, res, next) => {
  try{
    const category = await Category.findByPk(req.params.categoryId);
    if(!category){
      return res.status(404).json({ message: "Categoria no encontrada" }); 
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};