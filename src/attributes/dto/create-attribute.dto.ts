import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsJSON,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { DataType } from '../enum/data-type.enum';

export class CreateAttributeDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(1, 225)
  @IsString()
  @IsNotEmpty()
  key: string;

  @Transform(({ value }) => value.trim())
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
  @IsOptional()
  sys?: string;

  @IsUrl()
  @IsOptional()
  icon?: string;

  @IsBoolean()
  @IsOptional()
  filterable?: boolean;

  @IsEnum(DataType)
  @IsNotEmpty()
  dataType: DataType;

  @IsJSON()
  @IsOptional()
  dataValue?: any;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  propertyIds: string[];
}
