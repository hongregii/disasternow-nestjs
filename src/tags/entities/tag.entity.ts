import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tagId: number;

  @Column()
  tagName: string;

  @OneToMany(() => Post, (post) => post.tag)
  posts: Post[];

  @Column()
  create_date: string;

  @Column()
  location_id: string;

  @Column()
  location_name: string;

  @Column()
  md101_sn: string;

  @Column()
  msg: string;

  @Column()
  send_platform: string;
}
