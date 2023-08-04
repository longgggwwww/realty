import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteAmenityDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
