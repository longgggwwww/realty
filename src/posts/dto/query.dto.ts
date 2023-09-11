import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class QueryPaginationDto {
  @IsString()
  cursor: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  take: number = 10; // Default limit is set to 10, adjust as needed
}

export class QueryDto extends PartialType(QueryPaginationDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsMongoId({ each: true })
  @IsOptional()
  propertyIds: string[];

  @IsMongoId({ each: true })
  @IsOptional()
  amenityIds: string[];

  @Type(() => Number)
  @IsInt()
  @Min(1e4)
  @Max(1.5e7)
  @IsOptional()
  minPrice?: number = 1e5;

  @Type(() => Number)
  @IsInt()
  @Min(1e4)
  @Max(1.5e7)
  @IsOptional()
  maxPrice?: number = 1.5e7;

  @IsString()
  @IsOptional()
  provinceId?: string;

  @IsString()
  @IsOptional()
  districtId?: string;

  @IsString()
  @IsOptional()
  wardId?: string;
}
