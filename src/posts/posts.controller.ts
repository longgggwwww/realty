import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { BrowsePostDto } from './dto/browse-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { QueryDto } from './dto/query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // Bài đăng của tôi
  @Get('my-posts')
  findMyPosts(@Request() req) {
    return this.postsService.findMyPosts(req.user.id);
  }

  // Duyệt bài đăng (cho quản trị viên)
  @Patch(':id/browse')
  browsePost(
    @Param('id') id: string,
    @Body() browsePostDto: BrowsePostDto,
  ) {
    return this.postsService.browsePost(id, browsePostDto);
  }

  // Lưu bài đăng
  @Patch(':id/save')
  savePost(
    @Param('id') id: string,
    @Request() req
  ) {
  }

  // Bỏ lưu bài đăng
  @Patch(':id/save')
  unsavePost(
    @Param('id') id: string,
    @Request() req
  ) {
  }

  @Get(':id/related')
  getRelatedPosts(@Param() id: string) {
    return this.postsService.getRelatedPosts(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.postsService.findAll(queryDto);
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
