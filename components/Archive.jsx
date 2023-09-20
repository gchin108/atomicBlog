"use client"
import { useState } from "react";
import { usePosts } from "./PostProvider";


import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export default function Archive() {
  const { onAddPost } = usePosts();
  const [posts] = useState(() =>
    Array.from({ length: 20 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside className="mb-[40px] opacity-[75%] ">
      <h2 className="mb-[24px] text-[#333] uppercase">Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)} className="mb-[24px] btn-small">
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul className="text-[90%] list-none flex flex-col gap-[5px]">
          {posts.map((post, i) => (
            <li
              key={i}
              className="border-solid border-[1px] border-[#ffe8cc] py-[4px] px-[8px] flex justify-between items-center "
            >
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button
                onClick={() => onAddPost(post)}
                className="py-[4px] px-[8px] text-[14px] btn-small"
              >
                Add as new post
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
