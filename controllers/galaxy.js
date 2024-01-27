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
    const result = await Galaxy.findByPk(id);
    if(!result) return next(new NotFoundError(`No galaxy found at index: ${id}`));
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
    const galaxy = await Galaxy.create(req.body);
    res.redirect(303, `/galaxies/${galaxy.id}`);
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
    const galaxy = await Galaxy.destroy({
      where:{id},
      cascade: true, //Suns and planets should not exist without a galaxy
    });
    return res.redirect(303, `/galaxies/`);
  } catch (e) {
    return next(e);
  }
};

module.exports = { index, show, create, update, remove }
