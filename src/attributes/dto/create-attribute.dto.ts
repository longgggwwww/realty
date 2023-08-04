import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { DataType } from '../enum/data-type.enum';

export class CreateAttributeDto {
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

  @Length(1, 16)
  @IsString()
  @IsNotEmpty()
  sys: string;

  @IsUrl()
  @IsOptional()
  icon?: string;

  @IsBoolean()
  @IsOptional()
  filterable?: boolean;

  @IsEnum(DataType)
  @IsNotEmpty()
  dataType: DataType;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  propertyIds: string[];
}
