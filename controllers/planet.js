const { Planet } = require("../models");
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
    const results = await Planet.findAll(); //Implement limit and offset methods\
    return res.status(200).json(results);
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
    const result = await Planet.findByPk(id);
    if(!result) return next(new NotFoundError(`No planet found at index: ${id}`));
    return res.status(200).json(result);
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
    const planet = await Planet.create(req.body);
    res.redirect(303, `/planets/${planet.id}`);
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
    const planet = await Planet.update(req.body, {where:{id}});
    if(!planet) return next(new NotFoundError("This planet was not found int the database"));
    res.redirect(303, `/planets/${id}`);
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
    await Planet.destroy({
      where:{id},
      cascade: true, //Suns and planets should not exist without a planet
    });
    return res.redirect(303, `/planets/`);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = { index, show, create, update, remove }
