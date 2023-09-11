import { PostMode } from '@prisma/client';
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
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  wardId: string;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(PostMode)
  @IsNotEmpty()
  mode: PostMode;

  @Min(1e5)
  @Max(1.5e7)
  @IsNumber()
  @IsNotEmpty()
  price: number;

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

  @ValidateNested()
  @Type(() => Address)
  @IsNotEmpty()
  address: Address;

  @Min(0)
  @IsNumber()
  @IsOptional()
  area?: number; // m2

  @Min(0)
  @IsNumber()
  @IsOptional()
  depositCharge?: number; //  Tiền cọc

  @Min(0)
  @IsNumber()
  @IsOptional()
  electricityFee?: number; //  Tiền điện

  @Min(0)
  @IsNumber()
  @IsOptional()
  waterFee?: number; //  Tiền nước
}
