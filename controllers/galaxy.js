const { Galaxy } = require("../models");
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
    const results = await Galaxy.findAll(); //Implement limit and offset methods\
    //return res.status(200).json(results);
    res.render("galaxies/index");
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
    const result = await Galaxy.findByPk(id);
    if(!result) return next(new NotFoundError(`No galaxy found at index: ${id}`));
    return res.status(200).json(result);
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
    const {id} = await Galaxy.create(req.body);
    console.log("saved", id);
    res.locals.resourceId = id;
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
    const galaxy = await Galaxy.update(req.body, {where:{id}});
    if(!galaxy) return next(new NotFoundError("This galaxy was not found int the database"));
    res.redirect(303, `/galaxies/${id}`);
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
    const galaxy = await Galaxy.findByPk(id);
    await galaxy.destroy();
    return res.redirect(303, `/galaxies/`);
  } catch (e) {
    return next(e);
  }
};

/*
HTML 5 specific routes
*/

const mknew = (req, res) => {
  res.render("galaxies/edit");
}

/**
 * This method will be used to reassign the imageId if necessary
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const updateImage = async (req, res, next) => {
  console.log(res.locals.resourceId);
  console.log("Time to update the image");
  res.redirect(303, `/galaxies/${res.locals.resourceId}`);
}
module.exports = { index, show, create, update, remove, mknew, updateImage }
