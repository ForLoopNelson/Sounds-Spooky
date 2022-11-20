const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//Post Routes
// post/:id, post/createPost, post/LikePost/:id, post/deletePost/:id

router.get("/:id", ensureAuth, postsController.getPost)

//Enables user to create post w/cloudinary for media uploads
router.post("/createPost", upload.single("file"), postsController.createPost)

//Lets user like a post In controller uses POST model
router.put("/likePost/:id", postsController.likePost)

//delete a post the user has created
router.delete("/deletePost/:id", postsController.deletePost)

module.exports = router
