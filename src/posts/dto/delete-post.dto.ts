import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteAttributeDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
