import { usePosts } from "./PostProvider";
import FormAddPost from "./FormAddPost";
import Posts from "./Posts";

export default function Main() {
  const { posts, onAddPost } = usePosts();
  return (
    <main className="mb-[40px]">
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}


