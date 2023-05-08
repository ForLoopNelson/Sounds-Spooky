const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
category: {
  type: String,
  default: 'background',
  enum: ['Creature Sounds', 'Ambient', 'Other SFX', 'background'],
  required: true,

  }
})

// MongoDB Collection named here - will give lowerecase plural of name
module.exports = mongoose.model("Category", CategorySchema)
