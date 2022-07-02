'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lista.belongsTo(models.Usuario,{foreignKey:'usuario'});
      Lista.belongsTo(models.Estado,{foreignKey: 'estado'});
      Lista.belongsTo(models.Categoria, {foreignKey:'categoria'});
      Lista.hasMany(models.Item,{foreignKey:'lista'});
    }
    getFormato(date){
      if(date == null){
        return "";
      }
      var fecha = new Date(date);
      return (fecha.getDate()+1) + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();  
    }
  };
  Lista.init({
    titulo: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    fechaResolucion: DataTypes.DATE,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lista',
    tableName:'lista',
    createdAt: 'fechaCreacion',
    updatedAt: false,
  });
  return Lista;
};