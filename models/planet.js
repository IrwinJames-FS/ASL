'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Planet.belongsToMany(models.Star, {through: "StarsPlanets", onDelete:"CASCADE"});
      models.Planet.hasMany(models.Image, { 
        foreignKey: `resourceId`,
        constraints: false,
        scope: {
          resource: 'planets'
        },
        as: "Images"
      }); //The collection of images 
    }
  }
  Planet.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Planet',
  });
  return Planet;
};