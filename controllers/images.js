const {Image} = require("../models");
const {ServerError} = require("../errors.js");
const remove = async (req, res) => {
	const {id} = req.params;
	try {
		await Image.destroy({
			where: {id},
			individualHooks: true
		});
		res.status(204).send();
	} catch (e) {
		res.status(500).json({message: "Failed to remove image"});
	}
}

const images = async (req, res, next) => {
	try{
		const resource = req.baseUrl.slice(1);
		console.log(resource);
		const records = await Image.findAll({where:{resource}});
		res.render(`${resource}/images`, {records});
	} catch (e) {
		return next(new ServerError());
	}
}
module.exports = {remove, images};