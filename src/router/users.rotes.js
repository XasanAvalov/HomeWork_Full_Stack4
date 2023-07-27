const {Router} = require("express");
const {registr} = require("../controlers/user");
const {change} = require("../controlers/change");
const ischanges = require("../middlewares/ischanges");

const router = Router();

router.post("/create", registr);
router.post("/change", ischanges, change)

module.exports = router;