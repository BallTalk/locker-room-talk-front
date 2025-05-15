import axios from 'axios';
import { Post } from '../../domains/post/entities/Post';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('/api/posts');
  return response.data.map((dto: any) => 
    new Post(dto.id, dto.title, dto.content, dto.author, new Date(dto.createdAt))
  );
};
