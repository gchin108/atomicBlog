"use client"
import { useRef } from "react";

import { useKeys } from "@/hooks/useKeys";
import { usePosts } from "./PostProvider";

export default function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
   const inputEl = useRef(null);
  useKeys("/", function(){
        if (document.activeElement === inputEl.current) return; // When element is in focus, do nothing
        inputEl.current.focus();
        setSearchQuery("");
  })
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
      className="input placeholder:text-[#999] placeholder:text-sm dark:text-black"
      ref={inputEl}
    />
  );
}
