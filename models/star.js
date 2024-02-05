'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    get image() {
      if (!this.Images || !this.Images.length) return {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/256px-No-Image-Placeholder.svg.png", alt: ""};
      return {src: this.Images[0].src, alt: this.Images[0].caption};
    }
    get src(){
      return `/stars/${this.id}`;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      models.Star.belongsTo(models.Galaxy);
      models.Star.belongsToMany(models.Planet, {through: "StarsPlanets", onDelete:"cascade"});
      models.Star.hasMany(models.Image, { 
        foreignKey: `resourceId`,
        constraints: false,
        scope: {
          resource: 'stars'
        },
        as: "Images",
        onDelete: "cascade"
      }); //The collection of images 
    }
  }
  Star.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    GalaxyId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeDestroy: async (instance, options) => {
        const images = await instance.getImages();
        const planets = (await instance.getPlanets({include: ["Stars"]})).filter(p=>p.stars.length == 1);
        //todo delete planets if last star
        await Promise.all([...planets, ...images].map(img=>img.destroy()));
      }
    },
    sequelize,
    modelName: 'Star',
  });
  return Star;
};