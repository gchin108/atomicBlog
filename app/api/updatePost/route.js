import { connectToDB } from "@/utils/database";
import postModel from "@/models/postModel";

export const PATCH = async (request) => {
  const { title, body, _id } = await request.json();
  // console.log(title)
  // console.log(body)
  try {
    await connectToDB();

    // Find the existing note by ID
    const existingPost = await postModel.findById(_id);

    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    // Update the Post with new data
    existingPost.title = title;
    existingPost.body = body;

    await existingPost.save();
    // console.log("changed Post: " + existingPost);
    return new Response(JSON.stringify(existingPost), { status: 201 });
  } catch (error) {
    return new Response("Error Updating Post", { status: 500 });
  }
};
