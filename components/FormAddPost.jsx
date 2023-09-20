"use client"
import { useState } from "react";
import { usePosts } from "./PostProvider";

export default function FormAddPost() {
 const { onAddPost } = usePosts();
 const [title, setTitle] = useState("");
 const [body, setBody] = useState("");

 const handleSubmit = function (e) {
   e.preventDefault();
   if (!body || !title) return;
   onAddPost({ title, body });
   setTitle("");
   setBody("");
 };

 return (
   <form onSubmit={handleSubmit} className="form">
     <input
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       placeholder="Post title"
       className="input placeholder:text-[#999]"
     />
     <textarea
       value={body}
       onChange={(e) => setBody(e.target.value)}
       placeholder="Post body"
       className="textarea placeholder:text-[#999]"
     />
     <button className="btn btn-small">Add post</button>
   </form>
 );
}
