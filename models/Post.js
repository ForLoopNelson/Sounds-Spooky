const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  audio: {
  type: String,
  required: true,

},

  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

    shared: {
      type: String,
      default: "private",
      enum: ["public", "private"],
      required: true,
    },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// MongoDB Collection named here - will give lowerecase plural of name
module.exports = mongoose.model("Post", PostSchema)
