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

      /*
      This table will be unique in the fact that it will have a number of different relationships. 
      - First each celestial body will have a one-to-one relationship with an image within this table.
        - This represents the default or "profile image" to be used
        - This will be handled by each celestialbody have an id to said image
      - Second each celestial body will have a one-to-many relationship with an image within this table
        - This will be a composite relationship utilizing two columns "recordType" and "recordId". 
          - The composite relationship is necessary to ensure we dont have id collisions across multiple tables
      */

      //First up one to one relationships
      models.Image.hasOne(models.Galaxy);
    }
  }
  Image.init({
    extension: DataTypes.STRING,
    resource: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};