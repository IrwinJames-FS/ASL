const { Planet, Star, Galaxy } = require("../models");
const { ServerError, NotFoundError, ValidationError } = require("../errors");
const { ValidationError: SequelizeValidationError, UniqueConstraintError, DatabaseError } = require("sequelize");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const index = async (req, res, next) => {
  try {
    const planets = await Planet.findAll({include: ["Images"]}); //Implement limit and offset methods\
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(planets);
    }
    res.render("planets/index", {records: planets});
  } catch (e) {
    return next(new ServerError(e.message));
  }
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id, {include: ["Images", {model: Star, include: ["Images", {model: Galaxy, include:["Images"]}]}]});
    if(!planet) return next(new NotFoundError(`No planet found at index: ${id}`));
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(planet);
    }
    res.render("planets/show", {record: planet})
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const create = async (req, res, next) => {
  try {
    const {Stars, ...body} = req.body; //remove Stars from the set
    const planet = await Planet.create(body); //Only save the Image reference if the Refence exists
    if(Stars && Stars.length) await planet.setStars(Stars);
    res.locals.resourceId = planet.id;
    return next(); //Let the middleware take the wheel
  } catch (e) {
    console.log(e);
    switch (e.constructor) {
      case UniqueConstraintError:
        return next(new ValidationError("Duplicate Unique Value", e.errors));
      case DatabaseError:
        return next(new ValidationError("Missing Necessary values", [{message: e.sqlMessage}]));
      default:
        return next(new ServerError("Unsupported Error"));
    }
  }
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const {Stars, ...body} = req.body;
    const planet = await Planet.findByPk(id);
    await planet.update(body);
    await planet.setStars(Stars);

    if(!planet) return next(new NotFoundError("This planet was not found int the database"));
    res.locals.resourceId = id;
    return next();
  } catch (e) {
    console.log(e);
    switch (e.constructor) {
      
      case UniqueConstraintError:
        return next(new ValidationError("Duplicate Unique Value", e.errors));
      default:
        return next(new ServerError("Unsupported Error"));
    }
  }
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const remove =  async (req, res, next) => {
  const { id } = req.params;
  try {
    await Planet.destroy({
      where:{id},
      individualHooks: true
    });
    return res.redirect(303, `/planets/`);
  } catch (e) {
    return next(e);
  }
};

/*
HTML 5 specific routes
* HTML 5 specific routes dont are only intended to deliver html.
*/

const mknew = async (req, res) => {
  const stars = await Star.findAll({attributes:["id", "name"]});
  console.log(stars);
  res.render("planets/create", {stars: stars});
};

/**
 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id, {include: ["Images", {model:Star, attributes: ["id"]}]});
    const stars = await Star.findAll({attributes: ["id", "name"]});
    console.log(stars);
    if(!planet) return next(new NotFoundError(`No planet found at index: ${id}`));
    res.render("planets/edit", {planet, stars})
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
};

module.exports = { index, show, create, update, remove, mknew, edit };
