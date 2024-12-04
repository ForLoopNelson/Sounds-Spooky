const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const Comment = require("../models/comment")
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
    const allPosts = await Post.find().sort({ createdAt: 'desc' }).populate('category').populate('user').lean();
    
    const yourPosts = allPosts.filter(post => post.user._id.toString() === req.user.id);
    const sharedPosts = allPosts.filter(post => post.user._id.toString() !== req.user.id && post.shared === 'public');

    res.render('feed.ejs', { yourPosts: yourPosts, sharedPosts: sharedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
},

  getPost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id })
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

       // If it's a GET request, render the form page
    if (req.method === 'GET') {
      return res.render('index', {
        errorMessages: req.flash('error'),
        title: req.body.title || '',
        caption: req.body.caption || '',
      });
    }
      
      // Check for required fields
    if (!req.body.title || !req.body.caption || !req.file) {
      req.flash("error", "Please fill in all fields.");
      return res.redirect(`/profile`);
    }

          // Check if file selected to upload
    if (!req.file) {
      req.flash('error', 'Please upload a file.');
      return res.redirect('/profile');
      
    }


      // Check file size
    const maxSize = 10 * 1024 * 1024; 
      if (req.file.size > maxSize) {
      req.flash("error", "File size exceeds the limit of 10MB!");
      return res.redirect("/profile");
   }
      

      // Upload audio to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "video", folder: "audio_files/"})

      
    // Generate a new URL for the audio asset with the "auto" parameter
    const audioUrl = cloudinary.url(result.public_id, {
      resource_type: 'video',
      quality: 'auto',
      secure: true
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
        category: category._id,
        shared: req.body.shared
      })
      console.log("Post has been added!")
      req.flash("success", "Audio file uploaded successfully!")
      req.flash("success", [])
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
      let post = await Post.findOne({ _id: req.params.id })

       // Check if the post exists
      if (!post) {
        return res.redirect("/profile");
      }

    
      // Delete audio from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId, {resource_type: "video", folder: "audio_files/"})
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id })
      console.log("Deleted Post")
      res.redirect("/profile")
    } catch (err) {
      res.redirect("/profile")
    }
  },


 
 editPost: async (req, res) => {
 try {
    const { userId, editPost } = req.body;
    const postId = req.params.id;
   
  

    // Find the post by ID
        const post = await Post.findOne({_id:postId});

    // Check if the user has permission to edit this post
    if (post.user.toString() === userId) {
      // Update the post's caption in the database
      post.caption = editPost;
      await post.save();

      // Send a success response
     req.flash("success", "Your caption has been updated successfully!")
     res.redirect(`/post/${req.params.id}`)
    } else {
      // Handle unauthorized access (e.g., show an error message)
      res.status(403).send('You do not have permission to edit this post.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}}