const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoUrl = process.env.MONGODB_URI;

console.log("connecting to", mongoUrl);
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    minLength: 3
  },
  likes: Number,
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
