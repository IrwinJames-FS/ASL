'use strict';
const fs = require("fs/promises");
const path = require("path");
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
      models.Image.belongsTo(models.Star, {foreignKey: `resourceId`, constraints: false}); //cannot enforce unique fk as such will be compared agains resource as well
      models.Image.belongsTo(models.Planet, {foreignKey: `resourceId`, constraints: false}); //cannot enforce unique fk as such will be compared agains resource as well

    }

    
    get src(){
      return `/uploads/${this.resource}/${this.id}${this.extension}`;
    }
  }

  Image.init({
    caption: DataTypes.TEXT,
    extension: DataTypes.STRING,
    resource: DataTypes.STRING,
    resourceId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeDestroy: async (instance, options) => {
        const url = path.join(__dirname, "../public"+instance.src);
        console.log("Deleting file", url);
        try{
           await fs.unlink(url);
        } catch (e){
          console.log("failed to delete file @", instance.src)
          console.log(e);
        }
      }
    },
    sequelize,
    modelName: 'Image',
  });
  return Image;
};