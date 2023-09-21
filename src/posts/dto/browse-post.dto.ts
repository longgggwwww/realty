import { IsEnum, IsNotEmpty } from 'class-validator';
import { PostStatus } from '../enum/status-post.enum';

export class BrowsePostDto {
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;
}
