const { Galaxy, Star, Planet, Image } = require("../models");
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
    const galaxies = await Galaxy.findAll({include: ["Images"]}); //Implement limit and offset methods\
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(galaxies);
    }
    res.render("galaxies/index", {records: galaxies});
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
    const galaxy = await Galaxy.findByPk(id, {include: ["Images", {model: Star, include: ["Images", {model: Planet, include: ["Images"]}]}]});
    if(!galaxy) return next(new NotFoundError(`No galaxy found at index: ${id}`));
    if(req.headers["content-type"] == "application/json"){
      return res.status(200).json(galaxy);
    }
    res.render("galaxies/show", {record:galaxy})
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
    const {id} = await Galaxy.create(req.body); //Only save the Image reference if the Refence exists
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
    const [galaxy] = await Galaxy.update(req.body, {where:{id}});
    if(!galaxy) return next(new NotFoundError("This galaxy was not found int the database"));
    res.locals.resourceId = galaxy;
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
/*https://github.com/sequelize/sequelize/issues/8444 (CASCADE FAILED WITH hasMany or many to many)*/
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
    await Galaxy.destroy({where:{id}, individualHooks: true});
    return res.redirect(303, `/galaxies/`);
  } catch (e) {
    return next(e);
  }
};

/*
HTML 5 specific routes
* HTML 5 specific routes dont are only intended to deliver html.
*/

const mknew = (req, res) => {
  res.render("galaxies/create");
};

/**
 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const edit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const galaxy = await Galaxy.findByPk(id, {include: ["Images"]});
    if(!galaxy) return next(new NotFoundError(`No galaxy found at index: ${id}`));
    res.render("galaxies/edit", {galaxy})
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
};



module.exports = { index, show, create, update, remove, mknew, edit }
