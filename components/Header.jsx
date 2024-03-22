"use client"
import { usePosts } from "./PostProvider";
import Results from "./Results";
import SearchPosts from "./SearchPosts";

export default function Header() {
  const { onClearPosts } = usePosts();

  return (
    <header className="mb-[32px] font-bold flex justify-between">
      <h1 className="flex text-[26px] gap-[8px] items-center">
        <span style={{ fontSize: "140%", lineHeight: 1 }}>⚛️</span>The Atomic
        Blog
      </h1>
      <div className="flex gap-[32px] items-center">
        <Results />
        <SearchPosts />
        <button
          onClick={onClearPosts}
          className="text-[14px] btn-small py-[9px] px-[24px]"
        >
          Clear posts
        </button>
      </div>
    </header>
  );
}
