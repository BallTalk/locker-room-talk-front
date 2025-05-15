// 📁 src/domains/post/entities/Post.ts
export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public author: string,
    public createdAt: Date = new Date(),
    public likes: number = 0
  ) {}

  like() {
    return new Post(
      this.id,
      this.title,
      this.content,
      this.author,
      this.createdAt,
      this.likes + 1
    );
  }
}
