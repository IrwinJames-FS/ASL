'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Galaxy.hasMany(models.Star, {onDelete: "CASCADE", hooks: true});
      models.Galaxy.belongsTo(models.Image, {onDelete: "CASCADE"}); 
    }
  }
  Galaxy.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    ImageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Galaxy',
  });
  return Galaxy;
};