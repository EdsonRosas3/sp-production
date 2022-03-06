import Sequelize from 'sequelize';
import './asociations.js';
import dbConnection from './db.connection.js';
import User from './User';
import Product from './Product';
import Role from './Role';
import Category from './Category';
import Image from './Image';
import TypeService from './TypeService';
import Service from './Service';
import ImageService from "./ImageService";

const sequelize = dbConnection;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = Category;
db.Product = Product;
db.User = User;
db.Role = Role;
db.Image = Image;
db.TypeService = TypeService;
db.Service = Service;
db.ImageService = ImageService;

export default db;