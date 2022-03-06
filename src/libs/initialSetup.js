import bcrypt from "bcryptjs";
import db from "../models";
import Category from "../models/Category";
import Role from "../models/Role";
import TypeService from "../models/TypeService";
import User from "../models/User";
import { encryptPassword } from "../utils";

export const createUsers = async () => {
  let lenth = await Role.count();
  if (lenth < 2) {
    let userAdmin = await Role.create(
      {
        name: "admin",
        users: [
          {
            name: "admin",
            last_name: "admin",
            username: "admin",
            email: "admin@admin.com",
            password: await encryptPassword("admin"),
          },
        ],
      },
      {
        include: "users",
      }
    );
    let user = await Role.create(
      {
        name: "user",
        users: [
          {
            name: "user",
            last_name: "user",
            username: "user",
            email: "user@user.com",
            password: await encryptPassword("user"),
          },
        ],
      },
      {
        include: "users",
      }
    );
  }
};

export const createCategories = async () => {
  let lenth = await Category.count();
  if (lenth < 4) {
    let maquinaria = await Category.create({
      name: "Maquinaria",
    });
    let invernaderos = await Category.create({
      name: "Invernaderos",
    });
    let riegos = await Category.create({
      name: "Riegos",
    });
    let laboratorios = await Category.create({
      name: "Laboratorios",
    });
  }
};

export const createTypeServices = async () => {
  let lenth = await TypeService.count();
  if (lenth < 5) {
    let construccion = await TypeService.create({
      name: "Diseño y construcción de invernaderos",
    });
    let instalacion = await TypeService.create({
      name: "Diseño e instalación de sistemas de riego",
    });
    let capacitacion = await TypeService.create({
      name: "Cursos de capacitación",
    });
    let asesoria = await TypeService.create({
      name: "Asesoría técnica en la producción",
    });
    let laboratorio = await TypeService.create({
      name: "Laboratorio agrícola",
    });
  }
};