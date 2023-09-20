"use client"
import { useState } from "react";
import { usePosts } from "./PostProvider";

import { useEffect } from "react";
import TextExpander from "./TextExpander";

export default function Archive() {
  const { onLearn, posts, searchQuery, onDelete } = usePosts();

  const learned = posts.filter(post=>post.learn===true)

  const [showArchive, setShowArchive] = useState(false);


  useEffect(()=>{
    searchQuery&&setShowArchive(true)
     return function () {
      setShowArchive(false);
     };
},[searchQuery])

  return (
    <aside className="mb-[40px] opacity-[75%] ">
      <h2 className="mb-[24px] text-[#333] uppercase">Post archive</h2>
      <button
        onClick={() => setShowArchive((s) => !s)}
        className="mb-[24px] btn-small py-[9px] px-[24px]"
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <div className="text-[90%] list-none flex flex-col gap-[5px]">
          {learned.map((post) => (
            <div
              key={learned._id}
              className="border-solid border-[1px] border-[#ffe8cc] py-[4px] px-[8px] flex gap-20 justify-between items-center hover:bg-[#fff4e6]"
            >
              <div>
                <strong>{post.title}:</strong>{" "}
                <TextExpander>{post.body}</TextExpander>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLearn(post._id)}
                  className="py-[4px] px-[8px] text-[14px] btn-small  "
                >
                  Add as new post
                </button>
                <button
                  className="text-sm hover:text-red-500"
                  onClick={() => onDelete(post._id)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
