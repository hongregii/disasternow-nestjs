import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOneByUsername(
      createPostDto.userName,
    );

    const post = { ...createPostDto, createdAt: new Date(), user: user };

    await this.postRepository.save(post);
    return 'This action adds a new post';
  }

  // async postImage(formData: FormData) {
  //   return 'This action adds a new post';
  // }

  async findAll(page) {
    const all = await this.postRepository
      .find
      // { relations: ['user'] }
      ();

    return all.slice((page - 1) * 10, page * 10);
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { postId: id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
