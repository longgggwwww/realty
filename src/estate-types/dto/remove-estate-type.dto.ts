import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveEstateTypeDto {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  ids: string;
}
