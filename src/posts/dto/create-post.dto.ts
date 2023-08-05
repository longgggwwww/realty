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
  @IsNotEmpty()
  images: string[];

  @IsMongoId()
  @IsNotEmpty()
  propertyId: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  arrtIds: string[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  amenityIds: string[];

  @IsJSON()
  @IsNotEmpty()
  address: string[];
}
