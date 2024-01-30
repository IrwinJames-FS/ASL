// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

router.get(`/`, planetCtlr.index)         // show all planets
router.post(`/`, planetCtlr.create)       // create planet
router.get(`/:id`, planetCtlr.show)       // show planet
router.put(`/:id`, planetCtlr.update)      // update a planet
router.delete(`/:id`, planetCtlr.remove)  // remove a planet

// export "router"
module.exports = router
