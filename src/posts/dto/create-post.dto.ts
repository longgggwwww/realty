import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enum/status-post.enum';

class Address {
  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  ward: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsOptional()
  lng: number;

  @IsNumber()
  @IsOptional()
  lat: number;

  @IsOptional()
  misc?: any;
}

export class CreatePostDto {
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(1, 255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  propertyId: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  amenityIds?: string[];

  @Min(100000)
  @Max(15000000)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Min(0)
  @Max(1000)
  @IsNumber()
  @IsOptional()
  area?: number;

  @IsUrl()
  @IsOptional()
  thumb?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @ValidateNested()
  @Type(() => Address)
  @IsNotEmpty()
  address: Address;
}
