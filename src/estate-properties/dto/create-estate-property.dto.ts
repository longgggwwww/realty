import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEstatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  ownerIds: string[];

  @IsOptional()
  @IsString({ each: true })
  options?: string[];

  @IsNotEmpty()
  @IsBoolean()
  isFilterItem: boolean;

  @IsNotEmpty()
  @IsString()
  dataType: string;

  @IsOptional()
  @IsString()
  unit?: string;
}
