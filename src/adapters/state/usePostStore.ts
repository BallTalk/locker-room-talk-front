import { create } from "zustand";
import { fetchPosts } from "../../infrastructures/api/postApi";
import { Post } from "../../domains/post/entities/Post";

interface PostState {
  posts: Post[];
  loadPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loadPosts: async () => {
    const data = await fetchPosts();
    set({ posts: data });
  }
}));