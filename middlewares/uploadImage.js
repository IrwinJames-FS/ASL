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
	if(!res.locals.resourceId) return next(new ServerError("A resource Id must be provided"));
	//handle exising image updates
	console.log(req.body, req.files);
	const {imagesId=[], updatesCaption=[], imagesCaption=[]} = req.body;
	const ids = Array.isArray(imagesId) ? imagesId:[imagesId];
	const uCaptions = Array.isArray(updatesCaption) ? updatesCaption:[updatesCaption]; //This might be longer then the ids but should equal new files + existing
	if(ids.length) {
		//create a series of promises then block until they all complete
		const updates = []; //promises
		for(const i in ids){
			//remove the captions from the array
			const caption = uCaptions[i];
			const id = ids[i];
			updates.push(Image.update({caption}, {where: {id}}));
		}
		try{
			await Promise.all(updates);
		} catch (e) {
			console.log("There was a failure", e);
			//dont stop the other stuff
		}
	}
	const captions = Array.isArray(imagesCaption) ? imagesCaption:[imagesCaption]; //This might be longer then the ids but should equal new files + existing
	const reurl = `${req.baseUrl}/${res.locals.resourceId}`;
	if(!req.files || !("images" in req.files)) return res.redirect(303, reurl);
	const files = Array.isArray(req.files.images) ? req.files.images:[req.files.images];
	const resource = req.baseUrl.slice(1);
	const uploadPath = `${__dirname}/../public/uploads/${resource}/`;
	const images = files.map((img, i) => {
		return {
			extension: path.extname(img.name),
			caption: captions[i], //If I did everything right captions should be parallel to files now
			resource,
			resourceId: res.locals.resourceId
		}
	});
	try {
		const records = await Image.bulkCreate(images);
		files.forEach((file, index) => {
			const {id, extension} = records[index];
			file.mv(`${uploadPath}${id}${extension}`)
		});
		res.redirect(303, reurl);
	} catch (e) {
		return next(e);
	}
}

module.exports = {uploadImages};