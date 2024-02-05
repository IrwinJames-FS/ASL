'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    get image() {
      if (!this.Images || !this.Images.length) return {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/256px-No-Image-Placeholder.svg.png", alt: ""};

      return {src: this.Images[0].src, alt: this.Images[0].caption};
    }
    get src(){
      return `/planets/${this.id}`;
    }

    get galaxy() {
      if(!this.Stars || !this.Stars.length || !this.Stars[0].Galaxy) return null;
      return this.Stars[0].Galaxy;
    }
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

    get stars(){
      if(!"Stars" in this) return [];
      return this.Stars.map(S=>S.id);
    }
  }
  Planet.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    hooks: {
      beforeDestroy: async (instance, options) => {
        const images = await instance.getImages();
        await Promise.all(images.map(i=>i.destroy()));
      }
    },
    sequelize,
    modelName: 'Planet',
  });
  return Planet;
};