// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);
const {uploadImages} = require(`../middlewares/uploadImage.js`);

// Create a new Router instance and call it "router"
const router = new express.Router()
router.get(`/create`, galaxyCtlr.mknew);  //Render a form for a new galaxy
router.get(`/`, galaxyCtlr.index)         // show all galaxys
router.post(`/`, galaxyCtlr.create, uploadImages, galaxyCtlr.updateImage)       // create galaxy
router.get(`/:id`, galaxyCtlr.show)       // show galaxy
router.put(`/:id`, galaxyCtlr.update)      // update a galaxy
router.delete(`/:id`, galaxyCtlr.remove)  // remove a galaxy
// export "router"
module.exports = router
