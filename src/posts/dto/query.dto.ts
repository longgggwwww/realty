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

  @IsOptional()
  @IsMongoId()
  propertyId?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  amenityIds: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1.5e6)
  minPrice: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1.5e6)
  maxPrice: number;
}
