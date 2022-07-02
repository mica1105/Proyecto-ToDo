'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Rol, {foreignKey: 'rol'});
      Usuario.hasMany(models.Lista, {foreignKey:'usuario'});
      Usuario.hasMany(models.Item,{foreignKey:'usuario'});
    }
    getFormato(date){
      var fecha = new Date(date);
      return (fecha.getDate()+1) + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();  
    }
  };
  Usuario.init({
    nombre:{
      type: DataTypes.STRING, 
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING, 
      validate: {isEmail: true},
      allowNull: false
    },
    password: {type: DataTypes.STRING},
    creacion: {type:DataTypes.DATE},
    modificacion: DataTypes.DATE,
    rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    createdAt: 'creacion',
    updatedAt: 'modificacion',
  });
  return Usuario;
};