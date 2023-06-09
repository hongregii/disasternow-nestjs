import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Comment } from 'src/comments/entities/comment.entity';
import { Tag } from 'src/tags/entities/tag.entity';
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
  user: User;

  @Column()
  userName: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  lng: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Tag, (tag) => tag.posts)
  tag: Tag;
}
