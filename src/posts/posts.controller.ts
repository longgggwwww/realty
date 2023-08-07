import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ChangePostStatusDto } from './dto/change-post-status.dto';
import { TogglePostDto } from './dto/toggle-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Bài đăng của tôi
  @Get('my-posts')
  findMyPosts(@Request() req) {
    return this.postsService.findMyPosts(req.user.id);
  }

  // Duyệt bài đăng (cho quản trị viên)
  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body() changePostStatusDto: ChangePostStatusDto,
  ) {
    return this.postsService.changePostStatus(id, changePostStatusDto);
  }

  // Ẩn, hiện bài đăng
  @Patch(':id/toggle')
  toggle(@Param('id') id: string, @Body() togglePostDto: TogglePostDto) {
    return this.postsService.tooglePost(id, togglePostDto);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('batch')
  removeBatch(@Body() deletePostDto: DeletePostDto) {
    return this.postsService.removeBatch(deletePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
