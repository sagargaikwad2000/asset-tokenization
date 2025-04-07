const router = require("express").Router();
const recordController = require("./controller/record");


// record routes
router.post("/record/create", recordController.create);
router.get("/record/:id", recordController.getRecord);
router.get("/record/history/:id", recordController.getHistory);




module.exports = router;