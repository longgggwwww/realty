import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePropertyDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
