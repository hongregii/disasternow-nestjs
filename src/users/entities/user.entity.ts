import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userName: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
