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
    destination: 'src/uploads/files',
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

  @Post('image/:postId')
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
  async postImg(@UploadedFile() formData: any) {
    // return this.postsService.postImage(formData);
    console.log(formData.path);
    return formData.path;
  }

  @Get()
  @ApiQuery({ name: 'page' })
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: { page: number | undefined },
  ) {
    console.log('controller - page', page);
    console.log('controller - page.page', page.page);
    if (page === undefined) {
      // console.log('here');
      return this.postsService.findAll(1);
    }
    // console.log('there');
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
