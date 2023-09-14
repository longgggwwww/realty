import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
