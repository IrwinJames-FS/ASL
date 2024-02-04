// Load in Express framework
const express = require(`express`);


// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);
const {uploadImages} = require(`../middlewares`);
// Create a new Router instance and call it "router"
const router = new express.Router()
//html 5 specific routes
router.get(`/create`, galaxyCtlr.mknew);  //Render a form for a new galaxy
router.get(`/:id/edit`, galaxyCtlr.edit);
router.get(`/:id/delete`, galaxyCtlr.remove);

router.post(`/:id/edit`, galaxyCtlr.update, uploadImages);
router.get(`/`, galaxyCtlr.index)         // show all galaxys
router.post(`/`, galaxyCtlr.create, uploadImages)       // create galaxy
router.get(`/:id`, galaxyCtlr.show)       // show galaxy
router.put(`/:id`, galaxyCtlr.update, uploadImages)      // update a galaxy
router.delete(`/:id`, galaxyCtlr.remove)  // remove a galaxy
// export "router"
module.exports = router
