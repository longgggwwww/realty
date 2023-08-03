import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
