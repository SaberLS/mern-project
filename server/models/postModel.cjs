const {Schema, model} = require("mongoose");

const postSchema = new Schema({
  title: {type: String, required: true},
  category: {
    type: String,
    enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"],
    message: "{Value} is not supported",
    default: "Uncategorized",
  },
  description: {type: String, required: true},
  thumbnail: {type: String, required: true},
  creator: {type: Schema.Types.ObjectId, ref:"User", required: true},
}, {timestamps: true})

module.exports = model("Post", postSchema)
