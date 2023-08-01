import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstateUtilDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  estateIds: string[];

  @IsString()
  @IsOptional()
  icon: string;
}
