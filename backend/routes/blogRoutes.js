const express = require('express')
const auth = require('../middleware/auth')
const {blogValidation,validateSchema} = require('../validation/blogValidation')
const blogControl = require('../controller/blogControl')
const router = express.Router()
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
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
}).single("image")

router.get('/api/data/getBlog', blogControl.getBlog)
router.get('/api/data/getBlogID/:_id',auth,blogControl.getBlogID)
//router.get('/api/data/bloguser/:_id',blogControl.getBlogUser)

router.post('/api/data/postBlog', upload,  blogValidation(), validateSchema, 
blogControl.postBlog)

router.put('/api/data/putBlog/:_id', upload, auth,
blogValidation(), validateSchema,  
blogControl.putBlog)

router.delete('/api/data/deleteBlog/:_id',auth,blogControl.deleteBlog)


module.exports=router;