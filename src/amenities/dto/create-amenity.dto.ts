import { Transform } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateAmenityDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  key: string;

  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(1, 225)
  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  icon?: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  propertyIds: string[];
}
