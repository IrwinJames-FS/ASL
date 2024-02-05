'use strict';
const { Star } = require("./index.js");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    get image() {
      if (!this.Images || !this.Images.length) return {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/256px-No-Image-Placeholder.svg.png", alt: ""};
      return {src: this.Images[0].src, alt: this.Images[0].caption};
    }
    get src(){
      return `/galaxies/${this.id}`;
    }

    get planets(){
      if(!this.Stars || !this.Stars.length) return [];
      return this.Stars.flatMap(star => star.Planets ? star.Planets:[]);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Galaxy.hasMany(models.Star, {onDelete: "cascade"});
      models.Galaxy.hasMany(models.Image, { 
        foreignKey: `resourceId`,
        constraints: false,
        scope: {
          resource: 'galaxies'
        },
        as: "Images",
        onDelete: "cascade"
      }); //The collection of images 
    }
  }
  Galaxy.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    hooks: {
      beforeDestroy: async (instance, options) => {
        const stars = await instance.getStars();
        const images = await instance.getImages();
        await Promise.all([...stars,...images].map(star=>star.destroy()));
      }
    },
    sequelize,
    modelName: 'Galaxy',
  });
  return Galaxy;
};