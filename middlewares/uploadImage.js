const path = require("path");
const { ServerError } = require("../errors");
const { Image } = require("../models");

/**
 * Uploads all of the images existing in the queue and adds the result to res.locals.images before proceeding to next. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const uploadImages = (req, res, next) => {
	console.log("On to the upload portion");
	if(!res.locals.resourceId) throw new ServerError("A resource Id must be provided");
	if(!("image" in req.files)) return next(); //Nothing to upload
	const resource = req.baseUrl.slice(1);
	const images = req.files.images; //All images are recieved under the name images. using multiple property so expect this to be an array

	return next();
}

module.exports = {uploadImages};