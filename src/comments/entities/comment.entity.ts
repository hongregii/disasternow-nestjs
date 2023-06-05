import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  postId: Post;

  @ManyToOne(() => User, (user) => user.comments)
  userId: User;

  @Column()
  content: string;
}
