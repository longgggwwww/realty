import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePostDto {
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
