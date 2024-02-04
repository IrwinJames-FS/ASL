const path = require("path");
const { ServerError } = require("../errors");
const { Image } = require("../models");

/**
 * Uploads all of the images existing in the queue and adds the result to res.locals.images before proceeding to next. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const uploadImages = async (req, res, next) => {
	if(!res.locals.resourceId) throw new ServerError("A resource Id must be provided");
	if(!("images" in req.files)) return next(); //Nothing to upload
	const resource = req.baseUrl.slice(1);
	const uploadPath = `${__dirname}/../public/uploads/${resource}/`;
	const images = req.files.images.map((img, i) => {
		return {
			extension: path.extname(img.name),
			resource,
			resourceId: res.locals.resourceId
		}
	});
	try {
		const records = await Image.bulkCreate(images);
		req.files.images.forEach((file, index) => {
			const {id, extension} = records[index];
			file.mv(`${uploadPath}${id}${extension}`)
		});
		res.locals.images = records;
	return next();
	} catch (e) {
		return next(e);
	}
}

module.exports = {uploadImages};