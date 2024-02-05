// Load in Express framework
const express = require(`express`);
const {uploadImages} = require("../middlewares");

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);
const imageCtlr = require(`../controllers/images.js`);

// Create a new Router instance and call it "router"
const router = new express.Router()

//html5 routes
router.get(`/create`, planetCtlr.mknew);
router.get(`/:id/edit`, planetCtlr.edit);
router.get(`/:id/delete`, planetCtlr.remove);
router.post(`/:id/edit`, planetCtlr.update, uploadImages);
router.get(`/images`, imageCtlr.images);

router.get(`/`, planetCtlr.index)         // show all planets
router.post(`/`, planetCtlr.create, uploadImages)       // create planet
router.get(`/:id`, planetCtlr.show)       // show planet
router.put(`/:id`, planetCtlr.update, uploadImages)      // update a planet
router.delete(`/:id`, planetCtlr.remove)  // remove a planet

// export "router"
module.exports = router
