
import { usePosts } from "./PostProvider";

export default function List() {
  const { posts } = usePosts();
  return (
    <ul className="grid grid-cols-4 gap-[32px] list-none">
      {posts.map((post, i) => (
        <li
          key={crypto.randomUUID()}
          className="border-[1px] border-solid border-[#ffe8cc] hover:bg-[#fff4e6] py-[16px] px-[20px]">
          <h3 className="capitalize font-bold text-xl mb-[16px] text-[#333]">
            {post.title}
          </h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
