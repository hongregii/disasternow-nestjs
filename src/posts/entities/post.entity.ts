import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.posts)
  userId: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  img: string;

  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];
}
