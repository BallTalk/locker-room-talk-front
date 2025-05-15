import axios from "axios";
import { Post } from "../entities/Post";

export class PostCacheRepository {
  private cache = new Map<string, Post>();

  async getPost(id: string): Promise<Post> {
    if (this.cache.has(id)) return this.cache.get(id)!;
    
    const response = await axios.get(`/posts/${id}`);
    const post = new Post(response.data.id, response.data.title, response.data.content, response.data.author);
    this.cache.set(id, post);
    
    return post;
  }
}
