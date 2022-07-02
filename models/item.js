'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Estado,{foreignKey:'estado'});
      Item.belongsTo(models.Prioridad, {foreignKey:'prioridad'});
      Item.belongsTo(models.Lista,{foreignKey:'lista'});
      Item.belongsTo(models.Usuario,{foreignKey:'usuario'});
    }
    getFormato(date){
      if(date == null){
        return "";
      }
      var fecha = new Date(date);
      return (fecha.getDate()+1) + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();  
    }
  };
  Item.init({
    titulo: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    fechaResolucion: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    prioridad: DataTypes.INTEGER,
    fechaLimite: DataTypes.DATE,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'item',
    createdAt: 'fechaCreacion',
    updatedAt: false,
  });
  return Item;
};