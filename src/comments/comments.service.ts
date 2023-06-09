import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private postService: PostsService,
  ) {}

  async create(createCommentDto: CreateCommentDto, postId: number) {
    const post = await this.postService.findOne(postId);

    const comment = { ...createCommentDto, createdAt: new Date(), post: post };
    const res = await this.commentRepository.save(comment);
    return 'This action adds a new comment';
  }

  async findAll(postId: number) {
    // const id = pos
    const post = await this.postService.findOne(postId);
    console.log('post : ', post);
    const allComments = await this.commentRepository.find({
      where: { post: post },
    });
    // return `This action returns all comments`;
    return allComments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
