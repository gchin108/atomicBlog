import { usePosts } from "./PostProvider";

export default function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts?.length? posts.length: 0} atomic posts found</p>;
}
