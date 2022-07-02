'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estado.hasOne(models.Lista, {foreignKey: 'estado'});
      Estado.hasOne(models.Item, {foreignKey:'estado'});
    }
  };
  Estado.init({
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estado',
    tableName: 'estado',
    timestamps: false,
  });
  return Estado;
};