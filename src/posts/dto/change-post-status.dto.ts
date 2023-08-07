import { IsEnum } from 'class-validator';
import { PostStatus } from '../enum/status-post.enum';

export class ChangePostStatusDto {
  @IsEnum(PostStatus)
  status: PostStatus;
}
