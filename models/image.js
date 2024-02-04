'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Image.belongsTo(models.Galaxy, {foreignKey: `resourceId`, constraints: false}); //cannot enforce unique fk as such will be compared agains resource as well
    }
  }
  Image.init({
    caption: DataTypes.TEXT,
    extension: DataTypes.STRING,
    resource: DataTypes.STRING,
    resourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};