const {Router} = require("express");
const contacts = require("./v1/contacts");
const router = Router();
router.use("/v1/contacts/", contacts);
module.exports = router;