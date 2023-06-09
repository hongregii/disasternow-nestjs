import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import Path = require('path');

const storage = {
  storage: diskStorage({
    destination: './static/files',
    filename: (req, file, cb) => {
      const filename: string = 'myfile-' + randomUUID();
      const extension: string = Path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  // async post(@UploadedFile() file): Promise<void> {
  //   console.log(file);
  // }
  async postImg(@UploadedFile() formData: Express.Multer.File) {
    // return this.postsService.postImage(formData);
    console.log(formData);
    if (!formData) {
      return new BadRequestException('이미지 파일이 없습니다.');
    }
    return { status: 201, path: formData.path };
  }

  @Get()
  @ApiQuery({ name: 'page' })
  findAll(@Query() query: { page: number | 'undefined' }) {
    console.log('controller - query', query);
    const page = query.page;
    if (page === 'undefined') {
      console.log('no qp');
      return this.postsService.findAll(1);
    }
    console.log('yes qp page : ', page);
    return this.postsService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
