import ListItem from "./ListItem";
import { usePosts } from "./PostProvider";

export default function List() {
  const { posts } = usePosts();
  const toLearn = posts.filter((post) => post.learn === false);

  return (
    <div className="grid grid-cols-4 gap-[32px] list-none">
      {toLearn.map((post) => (
        <ListItem toLearn={post} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}
