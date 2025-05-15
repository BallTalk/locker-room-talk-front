import { useEffect } from "react";
import { usePostStore } from "../adapters/state/usePostStore";

const PostListPage = () => {
  const { posts, loadPosts } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
