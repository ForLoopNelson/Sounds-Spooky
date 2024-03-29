const Comment = require("../models/comment")

module.exports = {
  createComment: async (req, res) => {
    try {
          // Check for required fields
    if (!req.body.comment) {
      req.flash("error", "Comment cannot be blank.");
      return res.redirect(`/post/${req.params.id}`);
    }

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
      })

      console.log("Comment has been added!")
      res.redirect("/post/" + req.params.id)
    } catch (err) {
      console.log(err)
      
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid })

      console.log("Comment has been deleted!")
      res.redirect("/post/" + req.params.postid)
    } catch (err) {
      console.log(err)
    }
  },
}
