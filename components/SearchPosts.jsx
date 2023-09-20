import { usePosts } from "./PostProvider";

export default function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
      className="input placeholder:text-[#999] placeholder:text-sm "
    />
  );
}
