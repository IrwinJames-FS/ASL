// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

router.get(`/`, galaxyCtlr.index)         // show all galaxys
router.post(`/`, galaxyCtlr.create)       // create galaxy
router.get(`/:id`, galaxyCtlr.show)       // show galaxy
router.put(`/:id`, galaxyCtlr.index)      // update a galaxy
router.delete(`/:di`, galaxyCtlr.remove)  // remove a galaxy

// export "router"
module.exports = router
