import {
  IsArray,
  IsJSON,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  saleType: string;

  @IsString()
  price: string;

  @IsString()
  status: string;

  @IsArray()
  @IsMongoId({ each: true })
  utilIds: string[];

  @IsArray()
  @IsMongoId({ each: true })
  propertieIds: string[];

  @IsOptional()
  address: any;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsNotEmpty()
  @IsMongoId()
  estateTypeId: string;
}
