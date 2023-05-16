const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const Category = require("../models/Category")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).populate("category").lean()
      res.render("profile.ejs", { posts: posts, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).populate("category").populate("user").lean()
      res.render("feed.ejs", { posts: posts})
    } catch (err) {
      console.log(err)
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: "desc" })
        .lean()
      res.render("post.ejs", { post: post, user: req.user, comments: comments })
    } catch (err) {
      console.log(err)
    }
  },
  createPost: async (req, res) => {
    try {
       // Check for required fields
    if (!req.body.title || !req.body.caption || !req.file) {
      req.flash("error", "Please fill in all required fields.");
      return res.redirect("/profile");
    }
      

      // Upload audio to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "video", folder: "audio_files/"})

      
    // Generate a new URL for the audio asset with the "auto" parameter
    const audioUrl = cloudinary.url(result.public_id, {
      resource_type: 'video',
      quality: 'auto'
    });
    

     // Find or create category
    const categoryName = req.body.category;
    let category = await Category.findOne({ category: categoryName });
    if (!category) {
      category = await Category.create({ category: categoryName });
    }

 
      await Post.create({
        title: req.body.title,
        audio: audioUrl,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        category: category._id
      })
      console.log("Post has been added!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
 
  likePost: async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).select("likedBy")
    
    if (!post) {
      return res.status(404).send("Post not found")
    }

    const userId = req.user._id
    const isLiked = post.likedBy && post.likedBy.includes(userId)

    if (isLiked) {
      // User has already liked the post, so remove their like
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likedBy: userId },
          $inc: { likes: -1 },
        }
      )
    } else {
      // User has not yet liked the post, so add their like
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { likedBy: userId },
          $inc: { likes: 1 },
        }
      )
    }

    res.redirect(`/post/${req.params.id}`)
  } catch (err) {
    console.log(err)
  }
},




  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id })
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId)
      // Delete post from db
      await Post.remove({ _id: req.params.id })
      console.log("Deleted Post")
      res.redirect("/profile")
    } catch (err) {
      res.redirect("/profile")
    }
  },
}
