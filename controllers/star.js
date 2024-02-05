const { Star, Galaxy, Planet } = require("../models");
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
    const stars = await Star.findAll({include: ["Images"]}); //Implement limit and offset methods\
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(stars);
    }
    res.render("stars/index", {records: stars});
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
    const star = await Star.findByPk(id, {include: ["Images", {model: Galaxy, include: ["Images"]}, {model:Planet, include: ["Images"]}]});
    if(!star) return next(new NotFoundError(`No galaxy found at index: ${id}`));
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(star);
    }
    res.render("stars/show", {record:star})
  } catch (e) {
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
    const {id} = await Star.create(req.body); //Only save the Image reference if the Refence exists
    res.locals.resourceId = id;
    
    return next(); //Let the middleware take the wheel
  } catch (e) {
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
    const [star] = await Star.update(req.body, {where:{id}});
    if(!star) return next(new NotFoundError("This star was not found int the database"));
    res.locals.resourceId = id;
    return next();
  } catch (e) {
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
  console.log(id);
  try {
    await Star.destroy({
      where:{id},
      individualHooks: true
    });
    return res.redirect(303, `/stars/`);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

/*
HTML 5 specific routes
* HTML 5 specific routes dont are only intended to deliver html.
*/

const mknew = async (req, res) => {
  /**
   * In this model we need to provide a list of galaxies for the user to associate with it
   */
  const galaxies = await Galaxy.findAll({attributes: ["id", "name"]});
  console.log(galaxies);
  res.render("stars/create", {galaxies});
};

/**
 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const edit = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const star = await Star.findByPk(id, {include: ["Images"]});
    const galaxies = await Galaxy.findAll({attributes:["id", "name"]});
    console.log(star, galaxies);
    if(!star) return next(new NotFoundError(`No Star found at index: ${id}`));
    res.render("stars/edit", {star, galaxies})
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
};

module.exports = { index, show, create, update, remove, mknew, edit }
