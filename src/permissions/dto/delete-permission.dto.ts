import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePermissionDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
