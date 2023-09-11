import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ChangePostStatusDto } from './dto/change-post-status.dto';
import { QueryDto } from './dto/query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Bài đăng của tôi
  @HttpCode(HttpStatus.OK)
  @Get('my-posts')
  findMyPosts(@Request() req) {
    return this.postsService.findMyPosts(req.user.id);
  }

  // Duyệt bài đăng (cho quản trị viên)
  @HttpCode(HttpStatus.OK)
  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body() changePostStatusDto: ChangePostStatusDto,
  ) {
    return this.postsService.changePostStatus(id, changePostStatusDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.postsService.findAll(queryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('batch')
  removeBatch(@Body() deletePostDto: DeletePostDto) {
    return this.postsService.removeBatch(deletePostDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
