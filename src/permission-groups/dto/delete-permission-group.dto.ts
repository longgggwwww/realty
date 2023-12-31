import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePermissionGroupDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
