import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePermissionDto {
  @Transform(({ value }) => value.trim().toUpperCase())
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  code: string;

  @Length(1, 255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  groupId: string;
}
