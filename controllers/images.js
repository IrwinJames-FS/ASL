const {Image} = require("../models");
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

module.exports = {remove};