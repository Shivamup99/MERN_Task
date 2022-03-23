const express = require('express')
const auth = require('../middleware/auth')
const {userValidation,validateSchema} = require('../validation/userValidation')
const userControl = require('../controller/userControl')
const router = express.Router()
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("profile")

router.get('/api/data/getUser',auth,userControl.getUser)
router.get('/api/data/getUserID/:_id',auth,userControl.getUserID)


router.post('/api/data/postUser',upload,
userValidation(), validateSchema,  
userControl.postUser)

router.put('/api/data/putUser/:_id',
auth, 
userControl.putUser)

router.post('/api/data/userLogin',userControl.userLogin)

router.put('/api/data/forgotPassword',userControl.forgotPassword)

router.put('/api/data/resetpassword',userControl.resetPasswordLink)

module.exports=router;