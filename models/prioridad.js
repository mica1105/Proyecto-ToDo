'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prioridad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prioridad.hasOne(models.Item, {foreignKey:'prioridad'});
    }
  };
  Prioridad.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prioridad',
    tableName: 'prioridad',
    timestamps: false,
  });
  return Prioridad;
};