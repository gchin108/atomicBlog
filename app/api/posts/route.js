import { connectToDB } from "@/utils/database";
import postModel from "@/models/postModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDB();

    const posts = await postModel.find();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, body } = await request.json();
  // console.log(title,body)
  try {
    await connectToDB();
    const newPost = new postModel({ title: title, body: body });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Post", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { _id } = await request.json();
  // console.log(title)
  // console.log(content)
  try {
    await connectToDB();

    // Find the existing note by ID
    const existingPost = await postModel.findById(_id);

    if (!existingPost) {
      return new Response("Note not found", { status: 404 });
    }

    // Update the note with new data
    existingPost.learn = !existingPost.learn;

    await existingPost.save();
    // console.log("changed note: " + existingPost);
    return new Response(JSON.stringify(existingPost), { status: 201 });
  } catch (error) {
    return new Response("Error Updating Note", { status: 500 });
  }
};

//delete, delete by id
export const DELETE = async (request) => {
  const { _id } = await request.json();
  try {
    await connectToDB();
    const noteToDelete = await postModel.findByIdAndRemove(_id);
    // console.log("noteToDelete: " + noteToDelete)
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete promp", { status: 500 });
  }
};
