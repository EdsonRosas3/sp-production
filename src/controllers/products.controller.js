import Product from "../models/Product";
import Image from "../models/Image";
import { deleteImage } from "../imgConfiguration";
import Price from "../models/Price";
import Category from "../models/Category";

export const createProduct = async (req, res) => {
  try {
    const price = await Price.create(req.body.price);
    req.body.price_id = price.id;

    const products = await Product.findAndCountAll();
    req.body.code = generateCode(products);
    const product = await Product.create(req.body);

    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const price = await Price.findByPk(product.price_id);
    product.price_id = price;

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//buscar producto por code
export const getProductByCode = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { code: req.params.code },
    });
    const price = await Price.findByPk(product.price_id);
    product.price_id = price;
    var category = await Category.findByPk(product.category_id);
    const navigation = {urlpath:""};
    switch (category.name) {
      case "Maquinaria":
        navigation.urlpath = "/all/maquinarias";
        break;
      case "Invernaderos":
        navigation.urlpath = "/all/invernaderos";
        break;
      case "Riegos":
        navigation.urlpath = "/all/riegos";
        break;
      case "Laboratorios":
        navigation.urlpath = "/all/laboratorios";
        break;
      default :
        break;
    }
    product.category_id = navigation;
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//todos los productos
export const getProducts = async (req, res) => {
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
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 30) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const allProducts = await Product.findAndCountAll({
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while (i < allProducts.count) {
      const product = allProducts.rows[i];
      const price = await Price.findByPk(product.price_id);
      product.price_id = price;
      i++;
    }

    return res.send({
      content: allProducts.rows,
      totalPages: Math.ceil(allProducts.count / Number.parseInt(size)),
      totalProducts: allProducts.count,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updateProduct = await Product.update(req.body, {
      where: { id: req.params.productId },
    });

    const product = await Product.findByPk(req.params.productId);
    const updatedPrice = await Price.update(req.body.price, {
      where: { id: product.price_id },
    });
    const price = await Price.findByPk(product.price_id);
    product.price_id = price;

    return res
      .status(201)
      .json({ message: "Producto ha sido actualizado", product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const publicnames = await Image.findAll({
      where: { product_id: req.params.productId },
      attributes: ["public_name"],
    });

    const product = await Product.findByPk(req.params.productId);
    const deleteProduct = await Product.destroy({
      where: { id: req.params.productId },
    });
    const deletePrice = await Price.destroy({
      where: { id: product.price_id },
    });

    publicnames.forEach((image) => {
      deleteImage(`images/${image.public_name}`);
      deleteImage(`optimizeimg/300/${image.public_name}`);
      deleteImage(`optimizeimg/700/${image.public_name}`);
    });
    return res
      .status(200)
      .json({ message: "Producto ha sido eliminado", deleteProduct });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//productos disponibles por categoria
export const getProductByCategoryIdA = async (req, res) => {
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
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 30) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
    const productsByCategory = await Product.findAndCountAll({
      where: {
        category_id: req.params.categoryId,
        available: true,
      },
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while (i < productsByCategory.rows.length) {
      const product = productsByCategory.rows[i];
      const price = await Price.findByPk(product.price_id);
      product.price_id = price;
      i++;
    }

    return res.send({
      content: productsByCategory.rows,
      totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
      totalProducts: productsByCategory.count,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//productos no disponibles por categoria
export const getProductByCategoryIdNoA = async (req, res) => {
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
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 30) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
    const productsByCategory = await Product.findAndCountAll({
      where: {
        category_id: req.params.categoryId,
        available: false,
      },

      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while (i < productsByCategory.rows.length) {
      const product = productsByCategory.rows[i];
      const price = await Price.findByPk(product.price_id);
      product.price_id = price;
      i++;
    }

    return res.send({
      content: productsByCategory.rows,
      totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
      totalProducts: productsByCategory.count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//todos los productos por categoria
export const getProductByCategoryId = async (req, res) => {
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
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 30) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
    const productsByCategory = await Product.findAndCountAll({
      where: {
        category_id: req.params.categoryId,
      },
      limit: size,
      offset: page * size,
      order: [[order_by, order_direction]],
    });

    var i = 0;
    while (i < productsByCategory.rows.length) {
      const product = productsByCategory.rows[i];
      const price = await Price.findByPk(product.price_id);
      product.price_id = price;
      i++;
    }

    return res.send({
      content: productsByCategory.rows,
      totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
      totalProducts: productsByCategory.count,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateDefaultImage = async (req, res) => {
  try {
    const updateProduct = await Product.update(req.body, {
      where: { id: req.params.productId },
    });
    return res
      .status(201)
      .json({ message: "La imagen principal se actualizo", updateProduct });
  } catch (error) {
    return res.status(500).json(error);
  }
};

function generateCode(elements) {
  const length = elements.count;
  let number = elements.count;

  if (length < 9) {
    number = "000" + (length + 1);
  }
  if (length > 9 && length < 99) {
    number = "00" + (length + 1);
  }
  if (length > 99 && length < 999) {
    number = "0" + (length + 1);
  }
  if (length > 9999) {
    const r = Math.random() * (10000 - 1) + 1;
    number = Math.floor(r);
  }
  const codeRandom = generateRandom(4) + number;
  return codeRandom;
}

function generateRandom(num) {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
      ""
    ),
    result = "";
  if (num > characters.length) return false;
  for (let i = 0; i < num; i++) {
    result += characters.splice(
      Math.floor(Math.random() * characters.length),
      1
    )[0];
  }
  return result;
}
