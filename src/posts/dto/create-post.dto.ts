import { PostMode } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsJSON,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(PostMode)
  @IsNotEmpty()
  mode: PostMode;

  @IsNumberString()
  @IsNotEmpty()
  price: string;

  @IsUrl()
  @IsOptional()
  thumbnail?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsMongoId()
  @IsNotEmpty()
  propertyId: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  attrIds: string[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  amenityIds?: string[];

  @IsJSON()
  @IsNotEmpty()
  address: string;
}
