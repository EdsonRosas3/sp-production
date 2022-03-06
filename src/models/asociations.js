import Role from './Role';
import User from './User';

Role.belongsToMany(User,{through: "user_role"});
User.belongsToMany(Role,{through: "user_role"});

