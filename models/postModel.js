import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({

  title: {
    type: String,
    required: [true, "title is required."],
  },
  body: {
    type: String,
    required: [true, "body is required."],
  },
  learn: {
    type:Boolean,
    default: false,
  }
});
const Post = models.Post || model("Post", PostSchema);

export default Post;
