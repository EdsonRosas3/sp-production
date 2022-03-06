import { Model, DataTypes } from 'sequelize';
import sequelize from './db.connection';

class Role extends Model {}
Role.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
    sequelize,
    modelName: "role",
    timestamps: false
});

export default  Role;
