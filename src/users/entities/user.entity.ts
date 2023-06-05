import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @OneToMany(() => Post, (post) => post.userId)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment[];
}
