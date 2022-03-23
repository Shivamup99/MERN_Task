const express = require('express')
const {categoryValidation,validateSchema} = require("../validation/categoryValidation")
const auth = require("../middleware/auth")
const categoryControl = require("../controller/categoryControl")
const router = express.Router()

router.get("/api/data/getCategory",auth,categoryControl.getCategory)
router.get("/api/data/getCategoryID/:_id",auth,categoryControl.getCategoryID)

router.post("/api/data/postCategory",categoryValidation(),validateSchema,auth,
categoryControl.postCategory)

router.put("/api/data/putCategory/:_id",auth, categoryValidation(),validateSchema,
categoryControl.putCategory)

router.delete("/api/data/deleteCategory/:_id",auth,categoryControl.deleteCategory)

module.exports=router