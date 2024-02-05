// Load in Express framework
const express = require(`express`)
const {uploadImages} = require(`../middlewares`);
// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);
const imageCtlr = require(`../controllers/images.js`);

// Create a new Router instance and call it "router"
const router = new express.Router()

//HTML5 specific routes
router.get(`/create`, starCtlr.mknew);  //Render a form for a new galaxy
router.get(`/:id/edit`, starCtlr.edit);
router.get(`/:id/delete`, starCtlr.remove)
router.post(`/:id/edit`, starCtlr.update, uploadImages);
router.get(`/images`, imageCtlr.images);

router.get(`/`, starCtlr.index)         // show all stars
router.post(`/`, starCtlr.create, uploadImages)       // create star
router.get(`/:id`, starCtlr.show)       // show star
router.put(`/:id`, starCtlr.update, uploadImages)      // update a star
router.delete(`/:id`, starCtlr.remove)  // remove a star

// export "router"
module.exports = router
